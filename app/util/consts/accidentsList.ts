
export interface Accident {
    name: string,
    level: 1 | 2
}

const accidents: Accident[] = [
    { name: "Texting While Driving", level: 1 },
    { name: "Drunk Driving", level: 1 },
    { name: "Cliff Jumping Without Checking Depth", level: 1 },
    { name: "Attempting Stunts on a Motorcycle", level: 1 },
    { name: "Playing with Fire", level: 1 },
    { name: "Jumping Off a Roof", level: 1 },
    { name: "Climbing Without Proper Gear", level: 1 },
    { name: "Drinking and Swimming", level: 1 },
    { name: "Running With Scissors", level: 1 },
    { name: "Riding a Bike Without a Helmet", level: 1 },
    { name: "Ignoring Traffic Signals", level: 1 },
    { name: "Trying to Break into a Building", level: 2 },
    { name: "Attempting to Fight a Wild Animal", level: 2 },
    { name: "Skipping Safety Gear While DIYing", level: 1 },
    { name: "Trying to Catch a Falling Object", level: 1 },
    { name: "Playing Daredevil in Traffic", level: 2 },
    { name: "Taking a Selfie at the Edge of a Cliff", level: 2 },
    { name: "Overloading a Vehicle", level: 1 },
    { name: "Engaging in Street Racing", level: 2 },
    { name: "Ignoring Weather Warnings", level: 1 }
  ];
  