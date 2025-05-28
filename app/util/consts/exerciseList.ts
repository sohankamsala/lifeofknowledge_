export interface Exercise {
    name: string,
    successMessage: string, //ex: you had a great chest workout on bench press
    injuryMessage: string //ex: you dropped the bar on your face
}

export const exerciseList: Exercise[] = [
    {
        name: "Bench Press",
        successMessage: "You had a great chest workout on the bench press.",
        injuryMessage: "You dropped the bar on your chest. Ouch!"
    },
    {
        name: "Squats",
        successMessage: "Your legs are feeling stronger after a solid squat session.",
        injuryMessage: "You lost balance and fell backwards during a squat."
    },
    {
        name: "Deadlifts",
        successMessage: "Your back and legs feel powerful after deadlifting.",
        injuryMessage: "You strained your lower back trying to lift too much weight."
    },
    {
        name: "Pull-ups",
        successMessage: "Your back and arms are pumped after crushing some pull-ups.",
        injuryMessage: "You lost your grip and fell from the pull-up bar."
    },
    {
        name: "Treadmill",
        successMessage: "You had an invigorating cardio session on the treadmill.",
        injuryMessage: "You tripped and face-planted on the moving treadmill."
    },
    {
        name: "Bicep Curls",
        successMessage: "Your biceps are bulging after a great curl session.",
        injuryMessage: "You pulled a muscle trying to curl too much weight."
    },
    {
        name: "Leg Press",
        successMessage: "Your quads are burning after pushing hard on the leg press.",
        injuryMessage: "You locked your knees and strained a ligament on the leg press."
    },
    {
        name: "Shoulder Press",
        successMessage: "Your shoulders feel broader after some solid overhead presses.",
        injuryMessage: "You tweaked your rotator cuff during a shoulder press."
    },
    {
        name: "Rowing Machine",
        successMessage: "You got a full-body workout with an intense rowing session.",
        injuryMessage: "You overextended and strained your back on the rowing machine."
    },
    {
        name: "Box Jumps",
        successMessage: "Your explosive power is improving after some high box jumps.",
        injuryMessage: "You missed the box and scraped your shins badly."
    }
];
