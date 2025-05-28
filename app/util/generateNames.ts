

const firstNames = [
  { name: "Olivia", gender: "female" }, { name: "Noah", gender: "male" },
  { name: "Emma", gender: "female" }, { name: "Liam", gender: "male" },
  { name: "Ava", gender: "female" }, { name: "Elijah", gender: "male" },
  { name: "Sophia", gender: "female" }, { name: "Aiden", gender: "male" },
  { name: "Mia", gender: "female" }, { name: "Ethan", gender: "male" },
  { name: "Nova", gender: "female" }, { name: "Aria", gender: "female" },
  { name: "Zayden", gender: "male" }, { name: "Isla", gender: "female" },
  { name: "Kai", gender: "male" }, { name: "Eliana", gender: "female" },
  { name: "Maverick", gender: "male" }, { name: "Aurora", gender: "female" },
  { name: "Ezra", gender: "male" }, { name: "Harper", gender: "female" },
  { name: "Soren", gender: "male" }, { name: "Jaxon", gender: "male" },
  { name: "Amara", gender: "female" }, { name: "Leilani", gender: "female" },
  { name: "Kairo", gender: "male" }, { name: "Jackson", gender: "male" },
  { name: "Lily", gender: "female" }, { name: "Lucas", gender: "male" },
  { name: "Charlotte", gender: "female" }, { name: "Benjamin", gender: "male" },
  { name: "Grace", gender: "female" }, { name: "James", gender: "male" },
  { name: "Scarlett", gender: "female" }, { name: "Gabriel", gender: "male" },
  { name: "Luna", gender: "female" }, { name: "Levi", gender: "male" },
  { name: "Madison", gender: "female" }, { name: "William", gender: "male" },
  { name: "Chloe", gender: "female" }, { name: "Samuel", gender: "male" },
  { name: "Zara", gender: "female" }, { name: "Landon", gender: "male" },
  { name: "Stella", gender: "female" }, { name: "Henry", gender: "male" },
  { name: "Violet", gender: "female" }, { name: "Addison", gender: "female" },
  { name: "Zane", gender: "male" }
];

const lastNames = [
  "Anderson", "Bennett", "Carter", "Davis", "Ellis", "Fletcher", "Garcia", "Harper", "Ingram", "Johnson",
  "Kim", "Lopez", "Morgan", "Nguyen", "O'Connor", "Patel", "Quinn", "Ramirez", "Sanders", "Torres",
  "Underwood", "Valdez", "Walker", "Young", "Zhang", "Baker", "Wright", "Hernandez", "Mitchell", "Roberts",
  "Phillips", "Evans", "Richards", "Ward", "Jenkins", "Morris", "Parker", "Collins", "Simmons", "Murphy",
  "Bryant", "Hughes", "Adams", "Gonzalez", "Kelley", "Scott", "Diaz", "Fisher", "Long", "Ross"
];

export function generateRandomName(gender?: "male" | "female") {
  let randomFirstName;
  if (gender) {
      const filteredNames = firstNames.filter(name => name.gender === gender);
      randomFirstName = filteredNames[Math.floor(Math.random() * filteredNames.length)].name;
  } else {
      randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)].name;
  }
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return [randomFirstName, randomLastName];
}
