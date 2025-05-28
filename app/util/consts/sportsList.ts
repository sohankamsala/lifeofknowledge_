export interface Sport {
    name: string;
    badOutcome: string;
    goodOutcome: string;
    price: number;
}

export const sportsList: Sport[] = [
    {
        name: "Basketball",
        badOutcome: "You missed all your free throws and tripped over your own feet.",
        goodOutcome: "You impressed the coach with your shooting and got selected!",
        price: 50
    },
    {
        name: "Soccer",
        badOutcome: "You accidentally scored an own goal and got winded after five minutes.",
        goodOutcome: "You made the team after scoring a stunning goal!",
        price: 40
    },
    {
        name: "Tennis",
        badOutcome: "You kept double-faulting and couldn't return a single serve.",
        goodOutcome: "You aced your serves and showed great footwork!",
        price: 60
    },
    {
        name: "Baseball",
        badOutcome: "You struck out every time and missed an easy catch.",
        goodOutcome: "You hit a home run and made an amazing diving catch!",
        price: 45
    },
    {
        name: "Football",
        badOutcome: "You fumbled the ball multiple times and got tackled hard.",
        goodOutcome: "You made a game-winning touchdown during scrimmage!",
        price: 70
    },
    {
        name: "Hockey",
        badOutcome: "You kept slipping on the ice and missed an open net shot.",
        goodOutcome: "You showed great skating and scored a breakaway goal!",
        price: 80
    },
    {
        name: "Track & Field",
        badOutcome: "You tripped over the hurdle and finished last in your race.",
        goodOutcome: "You set a new personal record in the sprint!",
        price: 30
    },
    {
        name: "Swimming",
        badOutcome: "You swallowed water and couldn't finish your race.",
        goodOutcome: "You beat everyone in your heat and got noticed by the coach!",
        price: 55
    },
    {
        name: "MMA",
        badOutcome: "You got knocked down in seconds and couldn't land a punch.",
        goodOutcome: "You won your sparring match with a perfect takedown!",
        price: 90
    },
    {
        name: "Gymnastics",
        badOutcome: "You lost balance and fell off the beam multiple times.",
        goodOutcome: "You nailed your routine and impressed the judges!",
        price: 75
    }
];
