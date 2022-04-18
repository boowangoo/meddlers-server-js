import { Board } from "./board/Board";
import { deep_copy, rand_i } from "../common/Utils";
import { DevCardEnum, IOffer, NodeId, PlayerId, ResourceEnum, Road, SessionId, SettlementEnum, SettlementNode, TileNode, TileNumber } from "../common/GameTypes";
import { Player } from "./player/Player";
import { DevCards } from "./dev_card/DevCard";

const PLAYER_LIMIT = 4;

export class GameCore {
    private board: Board;
    private devCards: DevCards;

    private activeSessions: Map<SessionId, PlayerId | undefined> = new Map();
    private activePlayers: Map<PlayerId, Player> = new Map();
    private currSession: SessionId | undefined = undefined;

    private private_responses:  Record<SessionId, string[]> = {};
    private public_responses: string[] = [];

    constructor() {
        this.board = new Board();
    }

    set_curr_session = (id?: SessionId): void => {
        if (id)
            this.currSession = id;
    }

    get_curr_session = (): SessionId | undefined => this.currSession;

    curr_player_id = (): PlayerId | undefined => {
        if (this.currSession)
            return this.activeSessions.get(this.currSession);
        return undefined;
    }

    curr_player = (): Player | undefined => {
        const pId = this.curr_player_id();
        if (pId === undefined)
            return undefined;
        return this.activePlayers.get(pId);
    }

    setup = (): boolean => {
        this.board = new Board();
        return true;
    }

    // offer = (offer: IOffer<ResourceEnum>): boolean => {

    // }

    buy_dev_card = (type: DevCardEnum): boolean => {
        const p = this.curr_player();
        if (p === undefined)
            return false;
        if (this.devCards.afford_dev_card(p.all_resources()) &&
            this.devCards.pop_dev_card(type)) {
            
            p.give_dev_card(type);
        }
        return false;
    }



    available_dev_cards = (): void => {
        const p = this.curr_player();
        if (p === undefined)
            return;
        let resp = p.all_dev_cards();
        this.push_response(`available_dev_cards:${JSON.stringify(resp)}`, this.currSession);
    }

    build_road = (id1: NodeId, id2: NodeId): boolean => {
        const p = this.curr_player();
        if (p === undefined ||
                p.resource_count(ResourceEnum.CLAY) < 1 ||
                p.resource_count(ResourceEnum.WOOD) < 1)
            return false;

        const rd = this.board.set_road(id1, id2);
        if (rd === undefined)
            return false;
        
        p.take_resource(ResourceEnum.CLAY, 1);
        p.take_resource(ResourceEnum.WOOD, 1);
        p.add_road(rd);
        return true;
    }

    build_town = (id: NodeId): boolean => {
        const p = this.curr_player();
        if (p === undefined ||
                p.resource_count(ResourceEnum.CLAY) < 1 ||
                p.resource_count(ResourceEnum.WOOD) < 1 ||
                p.resource_count(ResourceEnum.WHEAT) < 1 ||
                p.resource_count(ResourceEnum.SHEEP) < 1)
            return false;

        const sett = this.board.settlements.add_settlement(SettlementEnum.TOWN, id);
        if (p === undefined || sett === undefined)
            return false;
        
        p.take_resource(ResourceEnum.CLAY, 1);
        p.take_resource(ResourceEnum.WOOD, 1);
        p.take_resource(ResourceEnum.WHEAT, 1);
        p.take_resource(ResourceEnum.SHEEP, 1);
        p.add_settlement(SettlementEnum.TOWN, sett);
        return true;
    }

    build_city = (id: NodeId): boolean => {
        const p = this.curr_player();
        if (p === undefined ||
                p.resource_count(ResourceEnum.WHEAT) < 2 ||
                p.resource_count(ResourceEnum.ROCK) < 3)
            return false;

        const sett = this.board.settlements.add_settlement(SettlementEnum.CITY, id);
        if (p === undefined || sett === undefined)
            return false;

        p.take_resource(ResourceEnum.WHEAT, 2);
        p.take_resource(ResourceEnum.ROCK, 3);
        p.add_settlement(SettlementEnum.CITY, sett);
        return true;
    };

    dice_roll = (): TileNumber => {
        const roll = <TileNumber>(rand_i(6) + rand_i(6) + 2);
        if (roll === 7)
            return roll;
        
        // key: all settlements adjacent to rolled tiles,
        // value: whether they are town/city & adj tile resource type
        const rolledSettlements: Map<NodeId, [SettlementEnum, ResourceEnum]> = new Map(
            this.board.tiles.token_assignment(roll)
            .map((t): [SettlementNode[], ResourceEnum] => [this.board.adj_settlements_all(t.id), t.type])
            .flatMap((t) =>
                t[0].map((s): [NodeId, [SettlementEnum, ResourceEnum]] => [s.id, [s.type, t[1]]]))
            .filter(t => t[1][0] !== SettlementEnum.EMPTY)
        );
        // see if each player owns a rolledSettlement and give resources accordingly
        for (const player of this.activePlayers.values()) {
            for (const sett of player.all_settlements()) {
                const sr = rolledSettlements.get(sett.id);
                if (sr === undefined)
                    continue;
                player.give_resource(sr[1], sr[0] === SettlementEnum.TOWN ? 1 : 2);
            }
        }

        return roll;
    }

    login = (): boolean => {
        if (!this.currSession || this.activeSessions.size === PLAYER_LIMIT)
            return false;
        this.activeSessions.set(this.currSession, undefined);
        this.push_response(`login:${this.currSession}`);
        return true;
    }

    logout = (): boolean => {
        if (!this.currSession || !this.activeSessions.delete(this.currSession))
            return false;
        this.push_response(`logout:${this.currSession}`);
        return true;
    }

    prepare_players = (): void => {
        const pCnt = this.activeSessions.size;
        const playerIds = Array.from({length: pCnt}, (_, i) => <PlayerId>i);
        for (const sId of this.activeSessions.keys()) {
            // assign player ids
            const pId = playerIds.splice(pCnt, 1)[0];
            this.activeSessions.set(sId, pId);
            // create player
            this.activePlayers.set(pId, new Player(pId));
            this.push_response(`player_id:${pId}`, sId);
        }
        this.push_response(`player_count:${pCnt}`);
    }

    players_count = (): number => this.activePlayers.size;

    game_full = (): boolean => this.activeSessions.size === PLAYER_LIMIT;

    private push_response = (msg: string, id?: SessionId) => {
        ((id === undefined) ? this.public_responses : this.private_responses[id]).push(msg);
    }

    pop_private_responses = (): Record<SessionId, string[]> => {
        const ret = deep_copy(this.private_responses);
        this.private_responses = {};
        return ret;
    }

    pop_public_responses = (): string[] => {
        const ret = deep_copy(this.public_responses);
        this.public_responses = [];
        return ret;
    }

}
