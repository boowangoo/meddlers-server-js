"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = exports.SettlementDir = exports.TileDir = void 0;
const GameTypes_1 = require("../common/GameTypes");
const Utils_1 = require("./Utils");
var TileDir;
(function (TileDir) {
    TileDir[TileDir["TOP"] = 0] = "TOP";
    TileDir[TileDir["LTOP"] = 1] = "LTOP";
    TileDir[TileDir["RTOP"] = 2] = "RTOP";
    TileDir[TileDir["LBOT"] = 3] = "LBOT";
    TileDir[TileDir["RBOT"] = 4] = "RBOT";
    TileDir[TileDir["BOT"] = 5] = "BOT";
})(TileDir = exports.TileDir || (exports.TileDir = {}));
var SettlementDir;
(function (SettlementDir) {
    SettlementDir[SettlementDir["LTOP"] = 0] = "LTOP";
    SettlementDir[SettlementDir["RTOP"] = 1] = "RTOP";
    SettlementDir[SettlementDir["LEFT"] = 2] = "LEFT";
    SettlementDir[SettlementDir["RIGHT"] = 3] = "RIGHT";
    SettlementDir[SettlementDir["LBOT"] = 4] = "LBOT";
    SettlementDir[SettlementDir["RBOT"] = 5] = "RBOT";
})(SettlementDir = exports.SettlementDir || (exports.SettlementDir = {}));
class Board {
    constructor() {
        this.settlementIds = [
            0x02, 0x03,
            0x0C, 0x0D, 0x0F, 0x10,
            0x16, 0x17, 0x19, 0x1A, 0x1C, 0x1D,
            0x21, 0x23, 0x24, 0x26, 0x27, 0x29,
            0x2D, 0x2E, 0x30, 0x31, 0x33, 0x34,
            0x38, 0x3A, 0x3B, 0x3D, 0x3E, 0x40,
            0x44, 0x45, 0x47, 0x48, 0x4A, 0x4B,
            0x4F, 0x51, 0x52, 0x54, 0x55, 0x57,
            0x5B, 0x5C, 0x5E, 0x5F, 0x61, 0x62,
            0x68, 0x69, 0x6B, 0x6C,
            0x75, 0x76,
        ];
        this.tileIds = [
            0x0E,
            0x18, 0x1B,
            0x22, 0x25, 0x28,
            0x2F, 0x32,
            0x39, 0x3C, 0x3F,
            0x46, 0x49,
            0x50, 0x53, 0x56,
            0x5D, 0x60,
            0x6A,
        ];
        this.cornerTileIds = [
            0x0E, 0x22, 0x28, 0x50, 0x56, 0x6A,
        ];
        this.ports = {
            0x0C: GameTypes_1.ResourceEnum.Wheat, 0x0D: GameTypes_1.ResourceEnum.Wheat,
            0x0F: GameTypes_1.ResourceEnum.Rock, 0x10: GameTypes_1.ResourceEnum.Rock,
            0x16: GameTypes_1.ResourceEnum.None, 0x1D: GameTypes_1.ResourceEnum.Sheep,
            0x21: GameTypes_1.ResourceEnum.None, 0x29: GameTypes_1.ResourceEnum.Sheep,
            0x38: GameTypes_1.ResourceEnum.Wood, 0x40: GameTypes_1.ResourceEnum.None,
            0x44: GameTypes_1.ResourceEnum.Wood, 0x4B: GameTypes_1.ResourceEnum.None,
            0x5C: GameTypes_1.ResourceEnum.Clay, 0x61: GameTypes_1.ResourceEnum.None,
            0x68: GameTypes_1.ResourceEnum.Clay, 0x6C: GameTypes_1.ResourceEnum.None,
            0x75: GameTypes_1.ResourceEnum.None, 0x76: GameTypes_1.ResourceEnum.None,
        };
        this.rand_resource_tile = (resources) => {
            if (resources.length === 0)
                return GameTypes_1.ResourceEnum.None;
            const i = (0, Utils_1.rand_i)(resources.length);
            const randId = resources[i];
            resources.splice(i, 1);
            return randId;
        };
        this._cwPivotOrder = [
            { id: 0x50, dir: TileDir.TOP },
            { id: 0x22, dir: TileDir.RTOP },
            { id: 0x0E, dir: TileDir.RBOT },
            { id: 0x28, dir: TileDir.BOT },
            { id: 0x56, dir: TileDir.LBOT },
            { id: 0x6A, dir: TileDir.LTOP },
        ];
        this._ccwPivotOrder = [
            { id: 0x50, dir: TileDir.TOP },
            { id: 0x6A, dir: TileDir.LTOP },
            { id: 0x22, dir: TileDir.RTOP },
            { id: 0x0E, dir: TileDir.RBOT },
            { id: 0x28, dir: TileDir.BOT },
            { id: 0x56, dir: TileDir.LBOT },
        ];
        this.assign_number_tokens = () => {
            // assign tokens clockwise (false = CCW)
            const cw = Math.random() < 0.5;
            const order = cw ? this._cwPivotOrder : this._ccwPivotOrder;
            const dirOrder = order.map(o => o.dir);
            // starting corner tile id & tile placement direction
            const startId = order[(0, Utils_1.rand_i)(order.length)].id;
            // number tokens in assignment order
            const remainingNumTokens = [
                2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11
            ];
            if (remainingNumTokens.length + 1 !== Object.keys(this.tiles).length)
                return;
            let currTile = this.tiles[startId];
            let orderIdx = order.findIndex(o => startId === o.id);
            const assignedTiles = new Set([currTile.id]);
            while (remainingNumTokens.length > 0) {
                // put number tokens on non-desert tiles
                if (currTile.type !== GameTypes_1.ResourceEnum.None)
                    currTile.rollNum = remainingNumTokens.shift();
                const currDir = dirOrder[orderIdx];
                const nextTile = this.tile_adj(currTile, currDir);
                if (nextTile && !assignedTiles.has(nextTile.id)) {
                    assignedTiles.add(nextTile.id);
                    currTile = nextTile;
                    continue;
                }
                // change assignment direction
                // because of empty tile or already assigned tile
                orderIdx = (orderIdx + 1) % order.length;
            }
        };
        this.tile_adj = (node, dir) => {
            let moveId = node.id;
            switch (dir) {
                case TileDir.TOP:
                    moveId -= 0x17;
                    break;
                case TileDir.LTOP:
                    moveId -= 0x0D;
                    break;
                case TileDir.RTOP:
                    moveId -= 0x0A;
                    break;
                case TileDir.LBOT:
                    moveId += 0x0A;
                    break;
                case TileDir.RBOT:
                    moveId += 0x0D;
                    break;
                case TileDir.BOT:
                    moveId += 0x17;
                    break;
            }
            return this.tiles[moveId];
        };
        this.tile_adj_all = (node) => {
            return Object.keys(TileDir)
                .map((_, dir) => this.tile_adj(node, dir))
                .filter(adjNode => (adjNode !== undefined));
        };
        this.settlement_adj = (node, dir) => {
            let moveId = node.id;
            switch (dir) {
                case SettlementDir.LTOP:
                    moveId -= 0x0C;
                    break;
                case SettlementDir.RTOP:
                    moveId -= 0x0B;
                    break;
                case SettlementDir.LEFT:
                    moveId -= 0x01;
                    break;
                case SettlementDir.RIGHT:
                    moveId += 0x01;
                    break;
                case SettlementDir.LBOT:
                    moveId += 0x0B;
                    break;
                case SettlementDir.RBOT:
                    moveId += 0x0C;
                    break;
            }
            return this.settlements[moveId];
        };
        this.settlement_adj_all = (node) => {
            return Object.keys(SettlementDir)
                .map((_, dir) => this.settlement_adj(node, dir))
                .filter(adjNode => (adjNode !== undefined));
        };
        const remainingTileResources = [
            GameTypes_1.ResourceEnum.None,
            GameTypes_1.ResourceEnum.Wood, GameTypes_1.ResourceEnum.Wood, GameTypes_1.ResourceEnum.Wood, GameTypes_1.ResourceEnum.Wood,
            GameTypes_1.ResourceEnum.Clay, GameTypes_1.ResourceEnum.Clay, GameTypes_1.ResourceEnum.Clay,
            GameTypes_1.ResourceEnum.Sheep, GameTypes_1.ResourceEnum.Sheep, GameTypes_1.ResourceEnum.Sheep, GameTypes_1.ResourceEnum.Sheep,
            GameTypes_1.ResourceEnum.Wheat, GameTypes_1.ResourceEnum.Wheat, GameTypes_1.ResourceEnum.Wheat, GameTypes_1.ResourceEnum.Wheat,
            GameTypes_1.ResourceEnum.Rock, GameTypes_1.ResourceEnum.Rock, GameTypes_1.ResourceEnum.Rock,
        ];
        // initialize settlement slots
        this.settlements = this.settlementIds
            .map((id) => ({ [id]: { id, type: GameTypes_1.SettlementEnum.Empty } }))
            .reduce((last, curr) => (Object.assign(Object.assign({}, last), curr)), {});
        // initialize tile slots
        this.tiles = this.tileIds
            .map((id) => ({ [id]: {
                id,
                type: this.rand_resource_tile(remainingTileResources),
                rollNum: 0
            } }))
            .reduce((last, curr) => (Object.assign(Object.assign({}, last), curr)), {});
        // assign roll numbers on tiles
        this.assign_number_tokens();
    }
}
exports.Board = Board;
