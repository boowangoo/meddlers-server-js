export enum ResourceEnum {
    None = 0, Clay, Rock, Sheep, Wheat, Wood,
}

export enum SettlementEnum {
    Empty = 0, Town, City,
};

// 

export type NodeId = number;

export interface IBoardNode {
    id: NodeId;
}
export interface ISettlementNode extends IBoardNode{
    type: SettlementEnum;
}
export interface ITileNode extends IBoardNode{
    type: ResourceEnum;
}

export class RoadNodes {
    node1: ISettlementNode;
    node2: ISettlementNode;
    constructor(node1: ISettlementNode, node2: ISettlementNode) {
        if (node2.id < node1.id) {
            this.node1 = node2;
            this.node2 = node1;
        } else {
            this.node1 = node1;
            this.node2 = node2;
        }
    }
}
