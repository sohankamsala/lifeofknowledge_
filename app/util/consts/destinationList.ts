export interface Destination {
    name: string;
    badTimeMessage: string;
    goodTimeMessage: string; 
    price: number;
}

export const destinationList: Destination[] = [
    {
        name: "New Jersey",
        badTimeMessage: "You were caught in a traffic jam that lasted forever.",
        goodTimeMessage: "You had a great time exploring the boardwalk and enjoying local pizza.",
        price: 100
    },
    {
        name: "Mexico",
        badTimeMessage: "You accidentally ordered the spiciest dish and regretted it!",
        goodTimeMessage: "You enjoyed relaxing on the beautiful beaches of Cancun.",
        price: 600
    },
    {
        name: "Thailand",
        badTimeMessage: "You were chased by a group of monkeys trying to steal your snacks.",
        goodTimeMessage: "You had a fantastic time exploring ancient temples and enjoying street food.",
        price: 1200
    },
    {
        name: "Italy",
        badTimeMessage: "You got lost in Venice and ended up on a gondola ride with no way out.",
        goodTimeMessage: "You savored delicious pasta while overlooking the Colosseum.",
        price: 1500
    },
    {
        name: "Australia",
        badTimeMessage: "A kangaroo stole your backpack while you were distracted!",
        goodTimeMessage: "You had an amazing time surfing at Bondi Beach.",
        price: 2000
    },
    {
        name: "Greece",
        badTimeMessage: "A sudden storm ruined your sunset view on athens.",
        goodTimeMessage: "You enjoyed sunbathing on pristine beaches and exploring ancient ruins.",
        price: 1800
    },
    {
        name: "France",
        badTimeMessage: "You got stuck in a crowded elevator at the Eiffel Tower.",
        goodTimeMessage: "You enjoyed a romantic picnic by the Seine River.",
        price: 900
    },
    {
        name: "Spain",
        badTimeMessage: "You missed your flight after getting lost in Barcelona!",
        goodTimeMessage: "You danced the night away at a flamenco show.",
        price: 800
    },
    {
        name: "Japan",
        badTimeMessage: "You got caught in a rainstorm without an umbrella.",
        goodTimeMessage: "You enjoyed delicious sushi and visited beautiful temples.",
        price: 1300
    },
    {
        name: "Dubai, U.A.E.",
        badTimeMessage: "Your camel ride turned into a bumpy adventure!",
        goodTimeMessage: "You marveled at the stunning views from the Burj Khalifa.",
        price: 1500
    },
    {
        name: "Bali, Indonesia",
        badTimeMessage: "A sudden downpour ruined your beach day.",
        goodTimeMessage: "You had an unforgettable time snorkeling in crystal-clear waters.",
        price: 1200
    },
    {
        name: "South Africa",
        badTimeMessage: "A lion got too close for comfort during your safari!",
        goodTimeMessage: "You enjoyed breathtaking views from Table Mountain.",
        price: 1600
    },
    {
        name: "Iceland",
        badTimeMessage: "The Northern Lights were nowhere to be seen during your visit.",
        goodTimeMessage: "You soaked in the Blue Lagoon's warm waters under the stars.",
        price: 1400
    },
    {
      name:"Hawaii, USA",
      badTimeMessage:"Your beach day was interrupted by unexpected rain showers.",
      goodTimeMessage:"You had an unforgettable time snorkeling in crystal-clear waters.",
      price : 800,
   },
   {
      name:"Machu Picchu, Peru",
      badTimeMessage:"Altitude sickness made your hike challenging!",
      goodTimeMessage:"The breathtaking views from the ancient ruins made it all worth it!",
      price : 1200,
   },
   {
      name:"Maldives",
      badTimeMessage:"Your overwater bungalow was double-booked!",
      goodTimeMessage:"You relaxed on pristine beaches with crystal clear waters.",
      price : 2500,
   },
   {
      name:"Singapore",
      badTimeMessage:"The humidity made your sightseeing exhausting!",
      goodTimeMessage:"You enjoyed stunning views from the towers.",
      price : 1300,
   },
   {
      name:"Hong Kong",
      badTimeMessage:"The ferry ride was canceled due to weather conditions.",
      goodTimeMessage:"You indulged in delicious dim sum while enjoying city views.",
      price : 1100,
   },
   {
      name:"New York City, USA",
      badTimeMessage:"You got lost in Times Square and missed your show!",
      goodTimeMessage:"You experienced the vibrant energy of Broadway shows and iconic landmarks.",
      price : 1200,
   }
];
