import { GameCore } from "../../../core/GameCore";
import { GameState } from "../../GameState";
import { TurnStart } from "./TurnStart";
import { Robber } from "./Robber";
import { Build } from "./Build";
import { DevCardEnum, PlayerId } from "../../../common/GameTypes";
import { PlayerTurnGameState } from "../PlayerTurn";

export class DevCard extends PlayerTurnGameState {
    private play_dev_card = (devCard: DevCardEnum): boolean => {
        switch (devCard) {
            case DevCardEnum.KNIGHT:
                this.nextState = new Robber(this.core, this.player_id);
                break;
            case DevCardEnum.ROAD_BUILDING:
                this.nextState = new Build(this.core, this.player_id);
                break;
            // case DevCardEnum.VICTORY_POINT:
            //     this.nextState = new TurnStart(this.core, this.player_id);
            //     break;
            case DevCardEnum.MONOPOLY:
                this.nextState = new TurnStart(this.core, this.player_id);
                break;
            case DevCardEnum.YEAR_OF_PLENTY:
                this.nextState = new TurnStart(this.core, this.player_id);
                break;
            default:
                this.nextState = new TurnStart(this.core, this.player_id);
                break;
        }
        return true;
    }
    
    cancel = (): boolean => {
        this.nextState = new TurnStart(this.core, this.player_id);
        return true;
    }
    
    constructor(core: GameCore, player_id: PlayerId) {
        super(core, player_id);
        this.name = "setup";
        this.nextState = this;
        this.actions = {
            "knight": () => this.play_dev_card(DevCardEnum.KNIGHT),
            // "victory_point": () => this.play_dev_card(DevCardEnum.VICTORY_POINT),
            "monopoly": () => this.play_dev_card(DevCardEnum.MONOPOLY),
            "year_of_plenty": () => this.play_dev_card(DevCardEnum.YEAR_OF_PLENTY),
            "road_building": () => this.play_dev_card(DevCardEnum.ROAD_BUILDING),
            "cancel": () => this.cancel(),
        };
        console.log("DevCard:", this);
    }
}
                    