import { PlayerId } from "../../common/GameTypes";
import { GameCore } from "../../core/GameCore";
import { GameState } from "../GameState";
import { DiceRoll } from "./player_turn/DiceRoll"

export class PlayerTurnGameState extends GameState {
    protected player_sz: number;
    protected player_id: PlayerId;

    constructor(core: GameCore, player_id: PlayerId) {
        super(core);
        this.player_sz = core.players_count();
        this.player_id = player_id;
    }
}

export class PlayerTurn extends DiceRoll {}
