// The utils file contains all the functions that help render our app

// First we get and save some elements as variables
const reviewTotalDisplay = document.querySelector('#reviews')
const returningUserDisplay = document.querySelector('#returning-user')
const userNameDisplay = document.querySelector('#user')

// Then we import the enums and the interface we need:
import { LoyaltyUser, Permissions } from './enums'
import { Review }  from './interfaces'

// Let's create a function that will show the a string with the number of reviews, name of reviewer and in case it is a GOLD_USER, display a star emoji:
export function showReviewTotal(value: number, reviewer: string, isLoyalty: LoyaltyUser) {
    const iconDisplay = LoyaltyUser.GOLD_USER ? "⭐" : ""
    reviewTotalDisplay.innerHTML = value.toString() + ' review' + makeMultiple(value) + ' | last reviewed by ' + reviewer + ' ' + iconDisplay   
}

// Let's build the function to make the review plural in case there are more than 1 or 0 reviews:
export function makeMultiple(value: number) : string {
    if (value > 1 || value == 0) {
        return 's'
    } else return ''
}

// Let's create a function that will show the word "back" in case the user is returning to the app:
export function populateUser(isReturning : boolean, userName: string ) {
    if (isReturning){
        returningUserDisplay.innerHTML = 'back'
    }
    userNameDisplay.innerHTML = userName
}

// The next function will help display the property cards with its content. Note the parameters: a value (boolean or Permissions value from enum), an element which will be an HTMLDivElement (a card in our case) and the price, type number.
export function showDetails(value: boolean | Permissions, element : HTMLDivElement, price: number) {
    if (value) {
        const priceDisplay = document.createElement('div')
        priceDisplay.innerHTML = price.toString() + '/night'
        element.appendChild(priceDisplay)
    }
}

// This last function will display 2 sorted reviews. Note how the reviews passed must be of type Review[]. Note that it also returns an array of type Review (: Review[])
export function getTopTwoReviews(reviews : Review[]) : Review[]  {
    const sortedReviews = reviews.sort((a, b) => b.stars - a.stars)
    return sortedReviews.slice(0,2)
   }