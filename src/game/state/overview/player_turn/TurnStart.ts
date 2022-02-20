import { GameCore } from "../../../core/GameCore";
import { GameState, Action } from "../../GameState";
import { GameOver } from "../GameOver";
import { PlayerTurn } from "../PlayerTurn";
import { Build } from "./Build";
import { DevCard } from "./DevCard";
import { Offer } from "./Offer";

export class TurnStart extends GameState {
    private player_sz: number;
    private player_id: number;

    private build: Action = () => {
        super.core.setup();
        super.newState = new Build(super.core, this.player_sz, this.player_id);
        return true;
    }

    private play_dev_card: Action = () => {
        super.core.setup();
        super.newState = new DevCard(super.core, this.player_sz, this.player_id);
        return true;
    }

    private offer: Action = () => {
        super.core.setup();
        super.newState = new Offer(super.core, this.player_sz, this.player_id);
        return true;
    }

    private next_turn: Action = () => {
        super.newState = new PlayerTurn(
            super.core,
            this.player_sz,
            (this.player_id + 1) % this.player_sz
        );
        return true;
    }

    private end_game: Action = () => {
        super.newState = new GameOver(super.core);
        return true;
    }

    constructor(core: GameCore, player_sz: number, player_id: number) {
        super(core);
        super.name = "setup";
        super.newState = this;
        super.actions = {
            "build": this.build,
            "play_dev_card": this.play_dev_card,
            "offer": this.offer,
            "next_turn": this.next_turn,
            "end_game": this.end_game,
        };

        this.player_sz = player_sz;
        this.player_id = player_id;
    }
}
