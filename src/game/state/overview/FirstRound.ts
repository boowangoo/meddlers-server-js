import { PlayerId } from "../../common/GameTypes";
import { GameCore } from "../../core/GameCore";
import { GameState } from "../GameState";
import { FirstRoundTown } from "./first_round/FirstRoundTown";
import { PlayerTurn } from "./PlayerTurn";

export class FirstRound extends FirstRoundTown {
    constructor(core: GameCore) {
        core.prepare_players();
        super(core, 0, 0);
    }
}
