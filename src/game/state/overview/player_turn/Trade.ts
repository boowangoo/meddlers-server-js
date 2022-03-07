import { CounterOffer } from "./trade/CounterOffer"

export interface IOfferArgs {
   offer: ATuple<IResourceCollection, IResourceCollection>;
}

export class Trade extends CounterOffer {}
