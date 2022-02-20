import { GameCore } from "../../../core/GameCore";
import { GameState, Action } from "../../GameState";
import { TurnStart } from "./TurnStart";

type BuiltAction = (build: string) => boolean;

export class Build extends GameState {
    private player_sz: number;
    private player_id: number;

    private built: BuiltAction = (build: string) => {
        switch(build) {
            case "road":
                super.core.setup();
                break;
            case "town":
                super.core.setup();
                break;
            case "city":
                super.core.setup();
                break;
            default:
                break;
        }
        super.newState = new TurnStart(super.core, this.player_sz, this.player_id);
        return true;
    }

    constructor(core: GameCore, player_sz: number, player_id: number) {
        super(core);
        super.name = "setup";
        super.newState = this;
        super.actions = {
            "built_road": () => this.built("road"),
            "built_town": () => this.built("town"),
            "built_city": () => this.built("city"),
            "cancel": () => this.built("cancel"),
        };

        this.player_sz = player_sz;
        this.player_id = player_id;
    }
}
