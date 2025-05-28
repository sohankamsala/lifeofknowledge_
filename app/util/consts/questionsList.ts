
export interface Question {
  options: string[];
  text: string;
  id: number;
  correctAnswer: string;
}

export interface QuestionPopupState {
  isOpen: boolean;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswer: string[];
  pass: boolean;
  subject: string
  amount: number
  loading: boolean
}

const dummyQuestions: Question[] = [
  {
    options: ["Paris", "London", "Berlin", "Madrid"],
    text: "What is the capital of France?",
    id: 1,
    correctAnswer: "Paris",
  },
  {
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    text: "Which planet is known as the Red Planet?",
    id: 2,
    correctAnswer: "Mars",
  },
  {
    options: ["Blue Whale", "African Elephant", "Giraffe", "Hippopotamus"],
    text: "What is the largest mammal in the world?",
    id: 3,
    correctAnswer: "Blue Whale",
  },
  {
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Jane Austen",
      "Mark Twain",
    ],
    text: "Who wrote 'Romeo and Juliet'?",
    id: 4,
    correctAnswer: "William Shakespeare",
  },
  {
    options: ["Au", "Ag", "Fe", "Cu"],
    text: "What is the chemical symbol for gold?",
    id: 5,
    correctAnswer: "Au",
  },
  {
    options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    text: "Which gas do plants absorb from the atmosphere?",
    id: 6,
    correctAnswer: "Carbon Dioxide",
  },
  {
    options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi Apparatus"],
    text: "What is the powerhouse of the cell?",
    id: 7,
    correctAnswer: "Mitochondria",
  },
  {
    options: ["1912", "1905", "1920", "1915"],
    text: "In which year did the Titanic sink?",
    id: 8,
    correctAnswer: "1912",
  },
  {
    options: ["2", "1", "3", "0"],
    text: "What is the smallest prime number?",
    id: 9,
    correctAnswer: "2",
  },
  {
    options: ["Hydrogen", "Helium", "Lithium", "Carbon"],
    text: "Which element has the atomic number 1?",
    id: 10,
    correctAnswer: "Hydrogen",
  },
];

export default dummyQuestions;
