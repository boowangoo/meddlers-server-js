import { GameCore } from "../../../core/GameCore";
import { GameState } from "../../GameState";
import { TurnStart } from "./TurnStart";
import { Robber } from "./Robber";
import { Build } from "./Build";

type DevCardAction = (build: string) => boolean;

export class DevCard extends GameState {
    private player_sz: number;
    private player_id: number;

    private play_dev_card: DevCardAction = (action: string) => {
        switch (action) {
            case "knight":
                super.newState = new Robber(super.core, this.player_sz, this.player_id);
                break;
            case "road_building":
                super.newState = new Build(super.core, this.player_sz, this.player_id);
                break;
            case "victory_point":
                super.newState = new TurnStart(super.core, this.player_sz, this.player_id);
                break;
            case "monopoly":
                super.newState = new TurnStart(super.core, this.player_sz, this.player_id);
                break;
            case "year_of_plenty":
                super.newState = new TurnStart(super.core, this.player_sz, this.player_id);
                break;
            default:
                super.newState = new TurnStart(super.core, this.player_sz, this.player_id);
                break;
        }
        return true;
    }
    
    constructor(core: GameCore, player_sz: number, player_id: number) {
        super(core);
        super.name = "setup";
        super.newState = this;
        super.actions = {
            "knight": () => this.play_dev_card("knight"),
            "victory_point": () => this.play_dev_card("victory_point"),
            "monopoly": () => this.play_dev_card("monopoly"),
            "year_of_plenty": () => this.play_dev_card("year_of_plenty"),
            "road_building": () => this.play_dev_card("road_building"),
            "cancel": () => this.play_dev_card("cancel"),
        };
        
        this.player_sz = player_sz;
        this.player_id = player_id;
    }
}
                    