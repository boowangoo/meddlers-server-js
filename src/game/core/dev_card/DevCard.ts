import { DevCardEnum, ResourceEnum } from "../../common/GameTypes";

export class DevCards {
    private devCards: Record<DevCardEnum, number> = {
        [DevCardEnum.KNIGHT]: 14,
        [DevCardEnum.VICTORY_POINT]: 5,
        [DevCardEnum.MONOPOLY]: 2,
        [DevCardEnum.YEAR_OF_PLENTY]: 2,
        [DevCardEnum.ROAD_BUILDING]: 2,
    };

    remaining_dev_cards = (): Readonly<Record<DevCardEnum, number>> => this.devCards;

    pop_dev_card = (type: DevCardEnum): boolean => {
        if (this.devCards[type] === 0)
            return false;
        this.devCards[type]--;
        return true;
    }

    afford_dev_card = (resources: Readonly<Record<ResourceEnum, number>>): boolean => {
        return [ResourceEnum.ROCK, ResourceEnum.SHEEP, ResourceEnum.WHEAT]
            .map(r => resources[r] > 0)
            .reduce((p, r) => p || r, false);
    }
}
