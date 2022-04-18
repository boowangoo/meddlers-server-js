import { DevCardEnum, NodeId, PlayerId, ResourceEnum, Road, SettlementEnum, SettlementNode } from "../../common/GameTypes";

 export class Player {
    readonly id;
    private resources: Record<ResourceEnum, number> = {
        [ResourceEnum.NONE]: 0,
        [ResourceEnum.CLAY]: 0,
        [ResourceEnum.ROCK]: 0,
        [ResourceEnum.SHEEP]: 0,
        [ResourceEnum.WHEAT]: 0,
        [ResourceEnum.WOOD]: 0,
    };
    private devCards: Record<DevCardEnum, number> = {
        [DevCardEnum.KNIGHT]: 0,
        [DevCardEnum.VICTORY_POINT]: 0,
        [DevCardEnum.MONOPOLY]: 0,
        [DevCardEnum.YEAR_OF_PLENTY]: 0,
        [DevCardEnum.ROAD_BUILDING]: 0,
    };
    private victoryPts: number = 0;
    private settlements: Record<SettlementEnum, SettlementNode[]> = {
        [SettlementEnum.EMPTY]: [],
        [SettlementEnum.TOWN]: [],
        [SettlementEnum.CITY]: [],
    }
    private roads: Set<Road> = new Set();

    towns = (): SettlementNode[] => this.settlements[SettlementEnum.TOWN];
    cities = (): SettlementNode[] => this.settlements[SettlementEnum.CITY];
    all_settlements = (): SettlementNode[] => this.towns().concat(this.cities());

    add_settlement = (type: SettlementEnum, settlement: SettlementNode): void => {
        if (type !== SettlementEnum.EMPTY)
            this.settlements[type].push(settlement);
    }

    add_road = (road: Road): void => {
        this.roads.add(road);
    }

    resource_count = (resource: ResourceEnum): number => this.resources[resource];
    dev_card_count = (devCard: DevCardEnum): number => this.devCards[devCard];
    all_resources = (): Readonly<Record<ResourceEnum, number>> => this.resources;
    all_dev_cards = (): Readonly<Record<DevCardEnum, number>> => this.devCards;

    real_victory_pts = (): number => this.victoryPts + this.devCards[DevCardEnum.VICTORY_POINT];

    give_resource = (resource: ResourceEnum, count: number): boolean => {
        if (resource === ResourceEnum.NONE)
            return false;
        this.resources[resource] += count;
        return true;
    }
    give_dev_card = (devCard: DevCardEnum): void => {
        this.devCards[devCard]++;
    }
    take_resource = (resource: ResourceEnum, count: number): boolean =>
        this.give_resource(resource, -count);
    take_dev_card = (devCard: DevCardEnum): void => {
        this.devCards[devCard]--;
    }

    constructor (id: PlayerId) {
        this.id = id;
    }
 }
