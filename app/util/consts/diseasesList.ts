export interface Disease {
  name: string;
  level: 1 | 2 | 3 | 4; 
  cureMessage: string;
  contractedMessage: string;
}

export const diseasesList: Disease[] = [
  { 
    name: "Flu", 
    level: 1, 
    cureMessage: "You got cured of the flu!", 
    contractedMessage: "You caught the flu! Stay warm and take care." 
  },
  { 
    name: "Common Cold", 
    level: 1, 
    cureMessage: "You got cured of the common cold!", 
    contractedMessage: "You have a common cold. It’s time to rest and recover." 
  },
  { 
    name: "Food Poisoning", 
    level: 1, 
    cureMessage: "You recovered from food poisoning!", 
    contractedMessage: "You got food poisoning! Avoid eating suspicious foods next time." 
  },
  { 
    name: "Seasonal Allergies", 
    level: 1, 
    cureMessage: "Your seasonal allergies have subsided!", 
    contractedMessage: "Seasonal allergies are acting up. Keep tissues handy!" 
  },

  // Level 2: 
  { 
    name: "Bronchitis", 
    level: 2, 
    cureMessage: "You recovered from bronchitis!", 
    contractedMessage: "You developed bronchitis. Take it easy and see a doctor if needed." 
  },
  { 
    name: "Strep Throat", 
    level: 2, 
    cureMessage: "You got cured of strep throat!", 
    contractedMessage: "You have strep throat. Get plenty of rest and follow your treatment." 
  },
  { 
    name: "Urinary Tract Infection (UTI)", 
    level: 2, 
    cureMessage: "You recovered from a UTI!", 
    contractedMessage: "You got a UTI. Drink lots of water and follow your prescription." 
  },
  { 
    name: "Gastroenteritis", 
    level: 2, 
    cureMessage: "You recovered from gastroenteritis!", 
    contractedMessage: "You’re dealing with gastroenteritis. Stick to bland meals for a while." 
  },

  // Level 3: 
  { 
    name: "Diabetes", 
    level: 3, 
    cureMessage: "You’ve successfully managed your diabetes!", 
    contractedMessage: "You’ve been diagnosed with diabetes. Stay committed to your health management." 
  },
  { 
    name: "Hypertension", 
    level: 3, 
    cureMessage: "Your blood pressure is back to normal!", 
    contractedMessage: "You have hypertension. Monitor your health and reduce stress." 
  },
  { 
    name: "Asthma", 
    level: 3, 
    cureMessage: "Your asthma symptoms are under control!", 
    contractedMessage: "You’re experiencing asthma. Keep your inhaler handy." 
  },
  { 
    name: "Epilepsy", 
    level: 3, 
    cureMessage: "Your epilepsy is well-managed!", 
    contractedMessage: "You have epilepsy. Work closely with your healthcare provider." 
  },
  { 
    name: "Arthritis", 
    level: 3, 
    cureMessage: "Your arthritis pain has eased up!", 
    contractedMessage: "You’ve developed arthritis. Stay active and manage your symptoms." 
  },

  // Level 4: 
  { 
    name: "Cancer", 
    level: 4, 
    cureMessage: "You are in remission from cancer!", 
    contractedMessage: "You’ve been diagnosed with cancer. Seek immediate medical attention." 
  },
  { 
    name: "Amyotrophic Lateral Sclerosis (ALS)", 
    level: 4, 
    cureMessage: "Your ALS progression has slowed significantly!", 
    contractedMessage: "You’ve been diagnosed with ALS. Stay strong and seek support." 
  },
  { 
    name: "Fatal Stroke", 
    level: 4, 
    cureMessage: "You survived and recovered from a stroke!", 
    contractedMessage: "You’ve experienced a stroke. Seek immediate care." 
  },
  { 
    name: "Heart Failure", 
    level: 4, 
    cureMessage: "Your heart failure is under control!", 
    contractedMessage: "You’ve been diagnosed with heart failure. Follow medical advice closely." 
  },
  { 
    name: "Advanced Alzheimer’s Disease", 
    level: 4, 
    cureMessage: "Your Alzheimer’s symptoms have improved!", 
    contractedMessage: "You’ve been diagnosed with advanced Alzheimer’s disease. Focus on supportive care." 
  },
];
