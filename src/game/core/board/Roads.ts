import { NodeId, Road, SettlementNode } from "../../common/GameTypes";

export class Roads {
    private roads: Map<[NodeId, NodeId], Road>;

    set_road = (sett1: SettlementNode, sett2: SettlementNode): Road | undefined => {
        const ROAD_BUILDING = new Road(sett1, sett2);
        const ids: [NodeId, NodeId] = [ROAD_BUILDING.node1.id, ROAD_BUILDING.node2.id];

        if (!this.roads.has(ids)) {
            this.roads.set(ids, ROAD_BUILDING);
            return ROAD_BUILDING;
        }

        return undefined;
    }

    constructor() {
        this.roads = new Map();
    }
}