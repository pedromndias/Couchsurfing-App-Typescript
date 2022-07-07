// This simple app will render a few cards with properties for Couchsurfing. It also displays a main property on top and a button to show the last reviews.

// First let's import all the code we need from the dependencies created:
import { showReviewTotal, populateUser, showDetails, getTopTwoReviews} from './utils'
import { Permissions , LoyaltyUser } from './enums'
import { Review, Property } from "./interfaces"
import MainProperty from './classes' 


// Now we get the page elements and save them in variables:
const propertyContainer = document.querySelector(".properties")
const reviewContainer = document.querySelector(".reviews")
const container = document.querySelector(".container")
const button = document.querySelector("button")
const footer = document.querySelector(".footer")

// Let's create a variable for if the user is logged in or not. Note how we specify the type boolean:
let isLoggedIn: boolean

// Next, we have the reviews array. It's an array of type "Review" (imported above from the interfaces file)
const reviews: Review[] = [
    {
        name: 'Sheila',
        stars: 5,
        loyaltyUser: LoyaltyUser.GOLD_USER,
        date: '01-04-2021'
    },
    {
        name: 'Andrzej',
        stars: 3,
        loyaltyUser: LoyaltyUser.BRONZE_USER,
        date: '28-03-2021'
    },
    {
        name: 'Omar',
        stars: 4,
        loyaltyUser: LoyaltyUser.SILVER_USER,
        date: '27-03-2021',
    },
]

// Let's create and object for the user:
const you = {
    firstName: 'Bobby',
    lastName: 'Brown',
    permissions: Permissions.ADMIN,
    isReturning: true,
    age: 35,
    stayedAt: ['florida-home', 'oman-flat', 'tokyo-bungalow']
}

// Next, we will create the array of our properties. Note that it is an array of type Property, respecting all its requirements:
const properties : Property[] = [
    {
        image: 'images/colombia-property.jpg',
        title: 'Colombian Shack',
        price: 45,
        location: {
            firstLine: 'shack 37',
            city: 'Bogota',
            code: 45632,
            country: 'Colombia'
        },
        contact: [+112343823978921, 'marywinkle@gmail.com'],
        isAvailable: true  
    },
    {
        image: 'images/poland-property.jpg',
        title: 'Polish Cottage',
        price: 30,
        location: {
            firstLine: 'no 23',
            city: 'Gdansk',
            code: 343903,
            country: 'Poland'
        },
        contact: [+1298239028490830, 'garydavis@hotmail.com'],
        isAvailable: false 
    },
    {
        image: 'images/london-property.jpg',
        title: 'London Flat',
        price: 25,
        location: {
            firstLine: 'flat 15',
            city: 'London',
            code: 'SW4 5XW',
            country: 'United Kingdom',
        },
        contact: [+34829374892553, 'andyluger@aol.com'],
        isAvailable: true
    },
    {
        image: 'images/malaysian-hotel.jpeg',
        title: 'Malia Hotel',
        price: 35,
        location: {
            firstLine: 'Room 4',
            city: 'Malia',
            code: 45334,
            country: 'Malaysia'
        },
        contact: [ +60349822083, 'lee34@gmail.com'],
        isAvailable: false
    }
]

// We will call the function to show the reviews:
showReviewTotal(reviews.length, reviews[0].name, reviews[0].loyaltyUser)

// And we will also call the function to show the user's name:
populateUser(you.isReturning, you.firstName)

// The next part is to create the logic to add the cards to the page, using a for loop with createElement, classList, setAttribute, appendChild, etc and also calling the showDetails function:
for (let i = 0; i < properties.length; i++) {
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = properties[i].title
    const image = document.createElement('img')
    image.setAttribute('src', properties[i].image)
    card.appendChild(image)
    showDetails(you.permissions, card, properties[i].price)
    propertyContainer.appendChild(card)
}

// Let's create the logic for when we press the button and show the top two reviews:
let count = 0
// Note how the function does not return a value (: void)
function addReviews(array : Review[]) : void {
    if (!count ) {
        count++
        const topTwo = getTopTwoReviews(array)
        for (let i = 0; i < topTwo.length; i++) {
            const card = document.createElement('div')
            card.classList.add('review-card')
            card.innerHTML = topTwo[i].stars + ' stars from ' + topTwo[i].name
            reviewContainer.appendChild(card)
        }
        container.removeChild(button) 
    }
}

// We then create the event listener on the button:
button.addEventListener('click', () => addReviews(reviews))

// Next, let's add the location, time and temperature to the footer. Note how the array currentLocation must contain exactly string, string, number:
let currentLocation : [string, string, number] = ['Barcelona', '11.03', 25]
footer.innerHTML = currentLocation[0] + ' ' + currentLocation[1] + ' ' + currentLocation[2] + '°'

// Finally, we will use the class MainProperty to add our main property to the top of the page:
let yourMainProperty = new MainProperty(
    'images/italian-property.jpg', 
    'Italian House',
    [{
        name: 'Olive',
        stars: 5,
        loyaltyUser: LoyaltyUser.GOLD_USER,
        date: '12-04-2021'
    }] )

const mainImageContainer = document.querySelector('.main-image')
const image = document.createElement('img')
image.setAttribute('src', yourMainProperty.src)
mainImageContainer.appendChild(image)