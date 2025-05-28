

import { generateRandomName } from "@/app/util/generateNames";

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export interface Relationship {
  name: string[];
  bond: number;
  type: "sibling" | "mother" | "father" | "friend" | "love-interest" | "daughter" | "son";
  gender: "male" | "female";
}

export interface FamilyMessage {
  id: number;
  text: string;
  year: number;
  popup: boolean;
}

export interface FamilyState {
  relationships: Relationship[];
  messages: FamilyMessage[];
}

export function generateInitialFamily(): FamilyState {
  const relationships: Relationship[] = [];
  const messages: FamilyMessage[] = [];
  let messageId = 2; 

  // Generate a family last name
  const familyLastName = generateRandomName()[1];

  const mother: Relationship = {
    name: [generateRandomName("female")[0], familyLastName],
    bond: getRandomInt(50, 100),
    type: "mother",
    gender: "female"
  };
  
  const father: Relationship = {
    name: [generateRandomName("male")[0], familyLastName],
    bond: getRandomInt(50, 100),
    type: "father",
    gender: "male"
  };
  
  relationships.push(mother, father);
  
  messages.push({
    id: messageId++,
    text: `Your mother is ${mother.name[0]} ${mother.name[1]}`,
    year: 0,
    popup: false,
  });
  
  messages.push({
    id: messageId++,
    text: `Your father is ${father.name[0]} ${father.name[1]}`,
    year: 0,
    popup: false,
  });

  const numSiblings = Math.floor(Math.random() * 4);
  
  for (let i = 0; i < numSiblings; i++) {
    const siblingGender = Math.random() < 0.5 ? "male" : "female";
    const sibling: Relationship = {
      name: [generateRandomName(siblingGender)[0], familyLastName],
      bond: getRandomInt(30, 100),
      type: "sibling",
      gender: siblingGender
    };
    
    relationships.push(sibling);
    
    messages.push({
      id: messageId++,
      text: `You have a ${siblingGender === "male" ? "brother" : "sister"} named ${sibling.name[0]} ${sibling.name[1]}`,
      year: 0,
      popup: false,
    });
  }

  if (numSiblings == 0) {
    messages.push({
      id: messageId++,
      text: "You are an only child",
      year: 0,
      popup: false,
    });
  }

  return { relationships, messages };
}
