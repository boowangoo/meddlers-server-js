"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCore = void 0;
const Utils_1 = require("./Utils");
class GameCore {
    constructor() {
        this.setup = () => {
        };
        this.dice_roll = () => {
            return (0, Utils_1.rand_i)(6) + 1;
        };
    }
}
exports.GameCore = GameCore;
