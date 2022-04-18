import { off } from "process";
import { SettlementNode, TileNode, SettlementEnum, ResourceEnum, NodeId, TileNumber, Road } from "../common/GameTypes";
import { rand_i } from "../common/Utils";
import { Roads } from "./board/Roads";
import { Settlements } from "./board/Settlements";
import { Tiles } from "./board/Tiles";

export class Board {
    // settlements
    settlements: Settlements;
    // roads
    roads: Roads;
    // tiles
    tiles: Tiles;

    set_road = (id1: NodeId, id2: NodeId): Road | undefined => {
        // check nodeId validity by finding associated settlement nodes
        const sett1 = this.settlements.get(id1);
        const sett2 = this.settlements.get(id2);

        if (sett1 && sett2 && (sett1.type !== SettlementEnum.EMPTY || sett2?.type !== SettlementEnum.EMPTY))
            return this.roads.set_road(sett1, sett2);
        return undefined;
    }

    adj_settlements_all = (tileId: NodeId): SettlementNode[] => {
        if (this.tiles.get(tileId) === undefined)
            return [];

        const adjacentOffsets = [
            -0x0C,-0x0B,
        -0x01,          +0x01,
            +0x0B,+0x0C
        ]
        return <SettlementNode[]>adjacentOffsets
            .map(offset => this.settlements.get(tileId + offset))
            .filter(node => node !== undefined);
    }

    constructor() {
        // initialize settlement slots
        this.settlements = new Settlements();

        // initialize tile slots
        this.tiles = new Tiles();

        // initialize roads
        this.roads = new Roads();
    }


}
