import { NodeId, ResourceEnum, SettlementEnum, SettlementNode } from "../../common/GameTypes";

export enum SettlementDir {
    LTOP = 0,   RTOP,
    LEFT,       RIGHT,
    LBOT,       RBOT,
}

export class Settlements {
    private settlements: Map<NodeId, SettlementNode>;
    readonly settlementIds: NodeId[] = [
                          0x02,0x03,
                 0x0C,0x0D,        0x0F,0x10,
        0x16,0x17,        0x19,0x1A,        0x1C,0x1D,
    0x21,        0x23,0x24,        0x26,0x27,        0x29,
        0x2D,0x2E,        0x30,0x31,        0x33,0x34,
    0x38,        0x3A,0x3B,        0x3D,0x3E,        0x40,
        0x44,0x45,        0x47,0x48,        0x4A,0x4B,
    0x4F,        0x51,0x52,        0x54,0x55,        0x57,
        0x5B,0x5C,        0x5E,0x5F,        0x61,0x62,
                 0x68,0x69,        0x6B,0x6C,
                          0x75,0x76,
    ];

    private readonly ports: Record<NodeId, ResourceEnum> = {
        0x0C: ResourceEnum.WHEAT, 0x0D: ResourceEnum.WHEAT,
        0x0F: ResourceEnum.ROCK, 0x10: ResourceEnum.ROCK,
        0x16: ResourceEnum.NONE, 0x1D: ResourceEnum.SHEEP,
        0x21: ResourceEnum.NONE, 0x29: ResourceEnum.SHEEP,
        0x38: ResourceEnum.WOOD, 0x40: ResourceEnum.NONE,
        0x44: ResourceEnum.WOOD, 0x4B: ResourceEnum.NONE,
        0x5C: ResourceEnum.CLAY, 0x61: ResourceEnum.NONE,
        0x68: ResourceEnum.CLAY, 0x6C: ResourceEnum.NONE,
        0x75: ResourceEnum.NONE, 0x76: ResourceEnum.NONE,
    };

    get = (id: NodeId): SettlementNode | undefined => this.settlements.get(id);

    add_settlement = (type: SettlementEnum, id: NodeId): SettlementNode | undefined => {
        const sett = this.settlements.get(id);
        if (sett === undefined)
            return undefined;

        if (type === SettlementEnum.TOWN && sett.type === SettlementEnum.EMPTY)
            sett.type = SettlementEnum.TOWN;
        else if (type == SettlementEnum.CITY && sett.type === SettlementEnum.TOWN)
            sett.type = SettlementEnum.CITY;
        else
            return undefined;

        return sett;
    }

    settlement_adj = (node: SettlementNode, dir: SettlementDir): SettlementNode | undefined => {
        let moveId: NodeId = node.id;
        switch (dir) {
            case SettlementDir.LTOP:
                moveId -= 0x0C
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
        return this.settlements.get(moveId);
    }

    settlement_adj_all = (node: SettlementNode): SettlementNode[] => {
        const ret: SettlementNode[] = Object.keys(SettlementDir)
            .map((_, dir: SettlementDir) => this.settlement_adj(node, dir))
            .filter((adjNode): adjNode is SettlementNode => !!adjNode);
        return ret;
    }

    constructor() {
        this.settlements = new Map(this.settlementIds.map(
            id => [id, new SettlementNode(id, SettlementEnum.EMPTY)]
        ));
    }
}