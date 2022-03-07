import { GameCore } from "../core/GameCore"

export interface IActionArgs {} 
export type Action = (args?: IActionArgs) => boolean;

export interface IGameState {
    name: string;
    actions: Record<string, Action>;
}

export class GameState implements IGameState {
    name: string;
    protected core: GameCore;
    protected newState: IGameState;
    actions: Record<string, Action>;

    constructor(core: GameCore) {
        this.name = "";
        this.core = core;
        this.newState = this;
        this.actions = {};
    }
}
