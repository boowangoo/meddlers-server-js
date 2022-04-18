"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoadNodes = exports.TileNode = exports.SettlementNode = exports.SettlementEnum = exports.ResourceEnum = void 0;
var ResourceEnum;
(function (ResourceEnum) {
    ResourceEnum[ResourceEnum["None"] = 0] = "None";
    ResourceEnum[ResourceEnum["Clay"] = 1] = "Clay";
    ResourceEnum[ResourceEnum["Rock"] = 2] = "Rock";
    ResourceEnum[ResourceEnum["Sheep"] = 3] = "Sheep";
    ResourceEnum[ResourceEnum["Wheat"] = 4] = "Wheat";
    ResourceEnum[ResourceEnum["Wood"] = 5] = "Wood";
})(ResourceEnum = exports.ResourceEnum || (exports.ResourceEnum = {}));
var SettlementEnum;
(function (SettlementEnum) {
    SettlementEnum[SettlementEnum["Empty"] = 0] = "Empty";
    SettlementEnum[SettlementEnum["Town"] = 1] = "Town";
    SettlementEnum[SettlementEnum["City"] = 2] = "City";
})(SettlementEnum = exports.SettlementEnum || (exports.SettlementEnum = {}));
;
class SettlementNode {
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
}
exports.SettlementNode = SettlementNode;
class TileNode {
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.rollNum = 0;
    }
}
exports.TileNode = TileNode;
class RoadNodes {
    constructor(node1, node2) {
        if (node2.id < node1.id) {
            this.node1 = node2;
            this.node2 = node1;
        }
        else {
            this.node1 = node1;
            this.node2 = node2;
        }
    }
}
exports.RoadNodes = RoadNodes;
