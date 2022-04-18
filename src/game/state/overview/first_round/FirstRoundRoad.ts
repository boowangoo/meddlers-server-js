import { NodeId, PlayerId } from "../../../common/GameTypes";
import { GameCore } from "../../../core/GameCore";
import { GameState } from "../../GameState";
import { PlayerTurn } from "../PlayerTurn";
import { FirstRoundTown } from "./FirstRoundTown";

export class FirstRoundRoad extends GameState {
    private player_sz: number;
    private player_id: PlayerId;
    private phase: 0 | 1 = 0;

    private build = (nodeId1: NodeId, nodeId2: NodeId): boolean => {
        if (!this.core.build_road(nodeId1, nodeId2))
            return false;

        if (this.phase === 1 && this.player_id === 0) {
            this.nextState = new PlayerTurn(this.core, this.player_id);
            return true;
        }
        
        let nextId = this.player_id;
        if (this.phase === 0 && this.player_id + 1 === this.player_sz) {
            this.phase = 1;
        } else if (this.phase === 0) {
            nextId = (this.player_id + 1) % this.player_sz as PlayerId;
        } else {
            nextId = (this.player_id -1) % this.player_sz as PlayerId;
        }

        this.nextState = new FirstRoundTown(this.core, nextId, this.phase);
        return true;
    }

    constructor(core: GameCore, player_id: PlayerId, phase: 0 | 1) {
        super(core);
        this.name = "first_round_road";
        this.nextState = this;
        this.actions = {
            "build": this.build,
        };

        this.player_sz = core.players_count();
        this.player_id = player_id;
        this.phase = phase;
        console.log("FirstRoundRoad:", this);
    }
}
