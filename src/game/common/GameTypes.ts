export enum ResourceEnum {
    NONE = 0, CLAY, ROCK, SHEEP, WHEAT, WOOD,
}

export enum SettlementEnum {
    EMPTY = 0, TOWN, CITY,
};

export enum DevCardEnum {
    KNIGHT = 0,
    VICTORY_POINT,
    MONOPOLY,
    YEAR_OF_PLENTY,
    ROAD_BUILDING,
}

export type TileNumber = 0 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type PlayerId = 0 | 1 | 2 | 3;

export type NodeId = number;
export type SettlementNodeId = NodeId;
export type TileNodeId = NodeId;
export type RoadId = [SettlementNodeId, SettlementNodeId];

export type SessionId = string;

export interface IBoardNode {
    id: NodeId;
}
export class SettlementNode implements IBoardNode{
    id: NodeId;
    type: SettlementEnum;

    constructor(id: NodeId, type: SettlementEnum) {
        this.id = id;
        this.type = type;
    }
}

export class TileNode implements IBoardNode {
    id: NodeId;
    type: ResourceEnum;
    rollNum: TileNumber;

    constructor(id: NodeId, type: ResourceEnum) {
        this.id = id;
        this.type = type;
        this.rollNum = 0;
    }
}

export class Road {
    node1: SettlementNode;
    node2: SettlementNode;
    id = (): [NodeId, NodeId] => [this.node1.id, this.node2.id];

    constructor(node1: SettlementNode, node2: SettlementNode) {
        if (node2.id < node1.id) {
            this.node1 = node2;
            this.node2 = node1;
        } else {
            this.node1 = node1;
            this.node2 = node2;
        }
    }
}

export interface IOffer<T> {
    playerA: PlayerId;
    playerB?: PlayerId;
    give: ResourceEnum[];
    take: T[];
}
