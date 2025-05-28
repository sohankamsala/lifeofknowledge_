import majors, { Major } from "./majorList";

export interface Job {
  name: string;
  major: Major | undefined;
  salary: number;
  level: 1 | 2 | 3 | 4 | 5;
}

const jobsList: Job[] = [
  // No College
  {
    name: "Retail Associate",
    major: majors.find(m => m.value === "no_college"),
    salary: 30000,
    level: 1,
  },
  {
    name: "Construction Worker",
    major: majors.find(m => m.value === "no_college"),
    salary: 40000,
    level: 2,
  },
  {
    name: "Electrician",
    major: majors.find(m => m.value === "no_college"),
    salary: 55000,
    level: 3,
  },
  {
    name: "Small Business Owner",
    major: majors.find(m => m.value === "no_college"),
    salary: 70000,
    level: 4,
  },
  {
    name: "Entrepreneur",
    major: majors.find(m => m.value === "no_college"),
    salary: 100000,
    level: 5,
  },

  // Computer Science
  {
    name: "IT Support Specialist",
    major: majors.find(m => m.value === "computer_science"),
    salary: 55000,
    level: 1,
  },
  {
    name: "Front-End Developer",
    major: majors.find(m => m.value === "computer_science"),
    salary: 80000,
    level: 2,
  },
  {
    name: "Software Engineer",
    major: majors.find(m => m.value === "computer_science"),
    salary: 110000,
    level: 3,
  },
  {
    name: "Machine Learning Engineer",
    major: majors.find(m => m.value === "computer_science"),
    salary: 140000,
    level: 4,
  },
  {
    name: "CTO (Chief Technology Officer)",
    major: majors.find(m => m.value === "computer_science"),
    salary: 200000,
    level: 5,
  },

  // Business
  {
    name: "Sales Associate",
    major: majors.find(m => m.value === "business"),
    salary: 40000,
    level: 1,
  },
  {
    name: "Marketing Coordinator",
    major: majors.find(m => m.value === "business"),
    salary: 60000,
    level: 2,
  },
  {
    name: "Financial Analyst",
    major: majors.find(m => m.value === "business"),
    salary: 85000,
    level: 3,
  },
  {
    name: "Operations Manager",
    major: majors.find(m => m.value === "business"),
    salary: 110000,
    level: 4,
  },
  {
    name: "CEO (Chief Executive Officer)",
    major: majors.find(m => m.value === "business"),
    salary: 250000,
    level: 5,
  },

  // Engineering
  {
    name: "Engineering Technician",
    major: majors.find(m => m.value === "engineering"),
    salary: 50000,
    level: 1,
  },
  {
    name: "Mechanical Engineer",
    major: majors.find(m => m.value === "engineering"),
    salary: 85000,
    level: 2,
  },
  {
    name: "Civil Engineer",
    major: majors.find(m => m.value === "engineering"),
    salary: 90000,
    level: 3,
  },
  {
    name: "Aerospace Engineer",
    major: majors.find(m => m.value === "engineering"),
    salary: 120000,
    level: 4,
  },
  {
    name: "Engineering Director",
    major: majors.find(m => m.value === "engineering"),
    salary: 180000,
    level: 5,
  },

  // Psychology
  {
    name: "Mental Health Technician",
    major: majors.find(m => m.value === "psychology"),
    salary: 35000,
    level: 1,
  },
  {
    name: "Case Manager",
    major: majors.find(m => m.value === "psychology"),
    salary: 50000,
    level: 2,
  },
  {
    name: "School Counselor",
    major: majors.find(m => m.value === "psychology"),
    salary: 70000,
    level: 3,
  },
  {
    name: "Clinical Psychologist",
    major: majors.find(m => m.value === "psychology"),
    salary: 100000,
    level: 4,
  },
  {
    name: "Neuropsychologist",
    major: majors.find(m => m.value === "psychology"),
    salary: 130000,
    level: 5,
  },

  // Biology
  {
    name: "Lab Assistant",
    major: majors.find(m => m.value === "biology"),
    salary: 40000,
    level: 1,
  },
  {
    name: "Research Technician",
    major: majors.find(m => m.value === "biology"),
    salary: 60000,
    level: 2,
  },
  {
    name: "Biologist",
    major: majors.find(m => m.value === "biology"),
    salary: 80000,
    level: 3,
  },
  {
    name: "Biomedical Scientist",
    major: majors.find(m => m.value === "biology"),
    salary: 110000,
    level: 4,
  },
  {
    name: "Biotech CEO",
    major: majors.find(m => m.value === "biology"),
    salary: 250000,
    level: 5,
  },

  // Economics
  {
    name: "Bank Teller",
    major: majors.find(m => m.value === "economics"),
    salary: 35000,
    level: 1,
  },
  {
    name: "Market Research Analyst",
    major: majors.find(m => m.value === "economics"),
    salary: 70000,
    level: 2,
  },
  {
    name: "Economist",
    major: majors.find(m => m.value === "economics"),
    salary: 95000,
    level: 3,
  },
  {
    name: "Investment Banker",
    major: majors.find(m => m.value === "economics"),
    salary: 140000,
    level: 4,
  },
  {
    name: "Federal Reserve Chair",
    major: majors.find(m => m.value === "economics"),
    salary: 300000,
    level: 5,
  },

  // English Literature
  {
    name: "Bookstore Clerk",
    major: majors.find(m => m.value === "english"),
    salary: 32000,
    level: 1,
  },
  {
    name: "Freelance Writer",
    major: majors.find(m => m.value === "english"),
    salary: 45000,
    level: 2,
  },
  {
    name: "Editor",
    major: majors.find(m => m.value === "english"),
    salary: 70000,
    level: 3,
  },
  {
    name: "Publishing Manager",
    major: majors.find(m => m.value === "english"),
    salary: 95000,
    level: 4,
  },
  {
    name: "Best-Selling Author",
    major: majors.find(m => m.value === "english"),
    salary: 200000,
    level: 5,
  },
];

export default jobsList;

