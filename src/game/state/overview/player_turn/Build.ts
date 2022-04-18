import { PlayerId } from "../../../common/GameTypes";
import { GameCore } from "../../../core/GameCore";
import { PlayerTurnGameState } from "../PlayerTurn";
import { TurnStart } from "./TurnStart";

export class Build extends PlayerTurnGameState {
    private built = (build: string): boolean => {
        switch(build) {
            case "road":
                this.core.setup();
                break;
            case "town":
                this.core.setup();
                break;
            case "city":
                this.core.setup();
                break;
            default:
                break;
        }
        this.nextState = new TurnStart(this.core, this.player_id);
        return true;
    }

    constructor(core: GameCore, player_id: PlayerId) {
        super(core, player_id);
        this.name = "setup";
        this.nextState = this;
        this.actions = {
            "built_road": () => this.built("road"),
            "built_town": () => this.built("town"),
            "built_city": () => this.built("city"),
            "cancel": () => this.built("cancel"),
        };
        console.log("Build:", this);
    }
}
