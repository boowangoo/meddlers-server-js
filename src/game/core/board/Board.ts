import { lstat } from "fs";
import { IBoardNode, ISettlementNode, ITileNode, SettlementNode, SettlementEnum, ResourceEnum } from "../../common/GameTypes";

export class Board {
    private settlements: Record<number, ISettlementNode>;
    private tiles: Record<number, ITileNode>;
    private ports: Record<number, ResourceEnum>;

    constructor() {
        // init settlement nodes
        this.settlements = [
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
        ].map(
            (id) => ({ [id]: {id, type: SettlementEnum.Empty }})
        ).reduce(
            (last, curr) => ({ ...last, ...curr }), {}
        );
        // init ports 
        this.ports = {
            0x0C: ResourceEnum.Wheat, 0x0D: ResourceEnum.Wheat,
            0x0F: ResourceEnum.Rock, 0x10: ResourceEnum.Rock,
            0x16: ResourceEnum.None, 0x1D: ResourceEnum.Sheep,
            0x21: ResourceEnum.None, 0x29: ResourceEnum.Sheep,
            0x38: ResourceEnum.Wood, 0x40: ResourceEnum.None,
            0x44: ResourceEnum.Wood, 0x4B: ResourceEnum.None,
            0x5C: ResourceEnum.Clay, 0x61: ResourceEnum.None,
            0x68: ResourceEnum.Clay, 0x6C: ResourceEnum.None,
            0x75: ResourceEnum.None, 0x76: ResourceEnum.None,
        };

        // init tile nodes
        const remainTiles: Record<ResourceEnum, number> = {
            [ResourceEnum.Sheep]: 4,
            [ResourceEnum.Wheat]: 4,
            [ResourceEnum.Wood]: 4,
            [ResourceEnum.Rock]: 3,
            [ResourceEnum.Clay]: 3,
            [ResourceEnum.None]: 1,
        }
        const gen_tile_node: (id) => ITileNode = () => {

        }
        this.tiles = [

                                0x0E,
                       0x18,             0x1B,
              0x22,             0x25,             0x28,
                       0x2F,             0x32,
              0x39,             0x3C,             0x3F,
                       0x46,             0x49,
              0x50,             0x53,             0x56,
                       0x5D,             0x60,
                                0x6A,
        ].map(
            (id) => ({ [id]: {id, type: ITileNode.N }})
        ).reduce(
            (last, curr) => ({ ...last, ...curr }), {}
        );
    }


}