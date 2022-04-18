import { IOffer, NodeId, PlayerId } from "../../../common/GameTypes";
import { GameCore } from "../../../core/GameCore";
import { GameState } from "../../GameState";
import { GameOver } from "../GameOver";
import { PlayerTurn, PlayerTurnGameState } from "../PlayerTurn";
import { Build } from "./Build";
import { DevCard } from "./DevCard";
import { Offer } from "./trade/Offer";

export class TurnStart extends PlayerTurnGameState {
    private build = (build: string, id1: NodeId, id2?: NodeId): boolean => {
        // build settlement, take resources from player
        let retResult = false;
        if (build === "road" && id2)
            retResult =this.core.build_road(id1, id2);
        else if (build === "town")
            retResult = this.core.build_town(id1);
        else if (build === "city")
            retResult = this.core.build_city(id1);
        if (!retResult)
            return false;

        this.nextState = new Build(this.core, this.player_id);
        return true;
    }

    private play_dev_card = (): boolean => {
        // send available development cards to player
        this.core.available_dev_cards();
        this.nextState = new DevCard(this.core, this.player_id);
        return true;
    }

    private buy_dev_card = (offer: IOffer): boolean => {
        this.core.buy_dev_card();
    }

    private port = (offer: IOffer): boolean => {

    }

    private offer = (offer: IOffer): boolean => {
        this.core.setup();
        this.nextState = new Offer(this.core, this.player_id);
        return true;
    }

    private next_turn = (): boolean => {
        this.nextState = new PlayerTurn(
            this.core,
            <PlayerId>((this.player_id + 1) % this.player_sz)
        );
        return true;
    }

    private end_game = (): boolean => {
        if (!this.core.win())
            return false;
        this.nextState = new GameOver(this.core);
        return true;
    }

    constructor(core: GameCore, player_id: PlayerId) {
        super(core, player_id);
        this.name = "setup";
        this.nextState = this;
        this.actions = {
            "build": this.build,
            "play_dev_card": this.play_dev_card,
            "offer": this.offer,
            "next_turn": this.next_turn,
            "end_game": this.end_game,
        };
        console.log("TurnStart:", this);
    }
}
