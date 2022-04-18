import { NodeId, ResourceEnum, TileNode, TileNumber } from "../../common/GameTypes";
import { rand_i } from "../../common/Utils";

export enum TileDir {
         TOP = 0,
LTOP,             RTOP,

LBOT,             RBOT,
         BOT,
}

export class Tiles {
    private tiles: Map<NodeId, TileNode>;
    private tokenAssignment: Record<TileNumber, TileNode[]>;
    readonly tileIds: NodeId[] = [

                            0x0E,
                   0x18,             0x1B,
          0x22,             0x25,             0x28,
                   0x2F,             0x32,
          0x39,             0x3C,             0x3F,
                   0x46,             0x49,
          0x50,             0x53,             0x56,
                   0x5D,             0x60,
                            0x6A,
    ];
    private readonly cornerTileIds = [
        0x0E, 0x22, 0x28, 0x50, 0x56, 0x6A,
    ]

    private rollTiles: Map<number, TileNode[]>;
    roll_tiles = (roll: number): TileNode[] => this.rollTiles.get(roll) ?? [];

    private rand_resource_tile = (resources: ResourceEnum[]): ResourceEnum => {
        if (resources.length === 0) return ResourceEnum.NONE;
        const i = rand_i(resources.length);
        const randId = resources[i];
        resources.splice(i, 1);
        return randId;
    }

    private _cwPivotOrder: {id: NodeId, dir: TileDir}[] = [
        { id: 0x50, dir: TileDir.TOP },
        { id: 0x22, dir: TileDir.RTOP },
        { id: 0x0E, dir: TileDir.RBOT },
        { id: 0x28, dir: TileDir.BOT },
        { id: 0x56, dir: TileDir.LBOT },
        { id: 0x6A, dir: TileDir.LTOP },
    ];

    private _ccwPivotOrder: {id: NodeId, dir: TileDir}[] = [
        { id: 0x50, dir: TileDir.TOP },
        { id: 0x6A, dir: TileDir.LTOP },
        { id: 0x22, dir: TileDir.RTOP },
        { id: 0x0E, dir: TileDir.RBOT },
        { id: 0x28, dir: TileDir.BOT },
        { id: 0x56, dir: TileDir.LBOT },
    ];

    private assign_number_tokens = (): void => {
        // assign tokens clockwise (false = CCW)
        const cw: boolean = Math.random() < 0.5;
        const order: {id: NodeId, dir: TileDir}[] = cw ? this._cwPivotOrder : this._ccwPivotOrder;
        const dirOrder: TileDir[] = order.map(o => o.dir);

        // starting corner tile id & tile placement direction
        const startId: NodeId = order[rand_i(order.length)].id;
        if (!this.tiles.has(startId))
            return;
        
        // number tokens in assignment order
        const remainingNumTokens: TileNumber[] = [
            2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11
        ];

        if (remainingNumTokens.length + 1 !== Object.keys(this.tiles).length)
            return;

        let currTile: TileNode = this.get(startId)!;
        let orderIdx: number = order.findIndex(o => startId === o.id);
        const assignedTiles: Set<NodeId> = new Set([currTile.id]);

        while (remainingNumTokens.length > 0) {
            // put number tokens on non-desert tiles
            if (currTile.type !== ResourceEnum.NONE) {
                const n = remainingNumTokens.shift()!;
                this.tokenAssignment[n].push(currTile);
            }

            const currDir: TileDir = dirOrder[orderIdx];
            const nextTile: TileNode | undefined = this.adj_tile(currTile, currDir);

            if (nextTile && !assignedTiles.has(nextTile.id)) {
                assignedTiles.add(nextTile.id);
                currTile = nextTile;
                continue;
            }
            // change assignment direction
            // because of empty tile or already assigned tile
            orderIdx = (orderIdx + 1) % order.length;
        }
    }

    get = (id: NodeId): TileNode | undefined => this.tiles.get(id);

    token_assignment = (n: TileNumber): TileNode[] => this.tokenAssignment[n];

    adj_tile = (node: TileNode, dir: TileDir): TileNode | undefined => {
        let moveId: NodeId = node.id;
        switch (dir) {
            case TileDir.TOP:
                moveId -= 0x17;
                break;
            case TileDir.LTOP:
                moveId -= 0x0D
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
        return this.get(moveId);
    }

    adj_tile_all = (node: TileNode): TileNode[] => {
        return Object.keys(TileDir)
            .map((_, dir: TileDir) => this.adj_tile(node, dir))
            .filter((adjNode): adjNode is TileNode => !!adjNode);
    }

    constructor() {
        const remainingTileResources: ResourceEnum[] = [
            ResourceEnum.NONE,
            ResourceEnum.WOOD, ResourceEnum.WOOD, ResourceEnum.WOOD, ResourceEnum.WOOD,
            ResourceEnum.CLAY, ResourceEnum.CLAY, ResourceEnum.CLAY,
            ResourceEnum.SHEEP, ResourceEnum.SHEEP, ResourceEnum.SHEEP, ResourceEnum.SHEEP,
            ResourceEnum.WHEAT, ResourceEnum.WHEAT, ResourceEnum.WHEAT, ResourceEnum.WHEAT,
            ResourceEnum.ROCK, ResourceEnum.ROCK, ResourceEnum.ROCK,
        ];
        this.tiles = new Map(this.tileIds.map(
            id => [id, new TileNode(id, this.rand_resource_tile(remainingTileResources))]
        ));
        // assign roll numbers on tiles
        this.rollTiles = new Map();
        this.tokenAssignment = {
            [0]: [], [2]: [], [3]: [], [4]: [], [5]: [], [6]: [],
            [7]: [], [8]: [], [9]: [], [10]: [], [11]: [], [12]: [],
        };
    }
}
