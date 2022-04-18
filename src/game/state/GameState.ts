import { GameCore } from "../core/GameCore"

export class GameState {
    name: string;
    core: GameCore;
    protected nextState: GameState;
    actions: Record<string, (...args: any[]) => boolean>;

    constructor(core: GameCore) {
        this.name = "";
        this.core = core;
        this.nextState = this;
        this.actions = {};
    }

    next_state = (): GameState => this.nextState;
}
