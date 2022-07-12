// In this file we will have a class, a blueprint for creating objects. It encapsulates data for the object.

// Note how we will import Review to define the reviews property.
import { Review } from "./interfaces";

export default class MainProperty {
    src: string
    title: string
    reviews: Review[] // reviews will be an array of type Review
    // Now the constructor, also defining the types on the arguments:
    constructor(src: string, title: string, reviews: Review[]) {
        this.src = src
        this.title = title
        this.reviews = reviews
    }
}