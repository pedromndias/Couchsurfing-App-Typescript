// In this file we have the interfaces, an abstract type that tells the compiler which property names a given object can have.
// Note that we have to import enums and types to be used on the interfaces:
import { LoyaltyUser } from "./enums"
import { Price, Country } from "./types"

// Note how the Review object must have a property "name" of type string, a "stars" property of type number, a "loyaltyUser" that will be one of the constants in the enum LoyaltyUser, and a property "date" of type string
export interface Review {
    name: string;
    stars: number;
    loyaltyUser: LoyaltyUser;
    date: string;
}

export interface Property {
    image: string;
    title: string;
    price: Price; // price can only be one of the valus defined in Price
    location: {
        firstLine: string;
        city: string;
        code: number | string; // Note the union type, where the code can be either a number or a string.
        country: Country // country can only be one of the valus defined in Country
    }
    contact: [ number, string ] // Note that the contact must have a number and a string
    isAvailable: boolean
}