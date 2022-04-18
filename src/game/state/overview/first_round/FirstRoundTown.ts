import { NodeId, PlayerId } from "../../../common/GameTypes";
import { GameCore } from "../../../core/GameCore";
import { GameState } from "../../GameState";
import { FirstRoundRoad } from "./FirstRoundRoad";

export class FirstRoundTown extends GameState {
    private player_sz: number;
    private player_id: PlayerId;
    private phase: 0 | 1 = 0;

    private build = (nodeId: NodeId): boolean => {
        if (!this.core.build_town(nodeId))
            return false;
        this.nextState = new FirstRoundRoad(
            this.core,
            this.player_id,
            this.phase);
        return true;
    }

    constructor(core: GameCore, player_id: PlayerId, phase: 0 | 1) {
        super(core);
        this.name = "first_round_town";
        this.nextState = this;
        this.actions = {
            "build": this.build,
        };

        this.player_sz = core.players_count();
        this.player_id = player_id;
        this.phase = phase;
        console.log("FirstRoundTown:", this);
    }
}
