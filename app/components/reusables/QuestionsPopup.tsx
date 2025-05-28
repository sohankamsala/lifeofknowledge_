import React, { useEffect, useState, useCallback, memo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addAnsweredQuestion } from "../../redux/slices/data";
import {
  setQuestionPopupOpen,
  setQuestionPopupPass,
} from "../../redux/slices/popups";
import { RootState } from "../../redux/store";
import dummyQuestions, { Question } from "../../util/consts/questionsList";
import { colorPalette } from "../../util/consts/colorPalette";

// this is too big
// should remember to split this
// split this into normal vs world scramble seperated components

function QuestionsPopup() {
  const data = useSelector((state: RootState) => state.data);
  const popups = useSelector((state: RootState) => state.popups);

  const dispatch = useDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showScore, setShowScore] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [scrambledWord, setScrambledWord] = useState<string | null>(null);
  const [userScrambledAnswer, setUserScrambledAnswer] = useState("");
  const [isWordScramble, setIsWordScramble] = useState(false);

  const { questions = dummyQuestions, loading } = popups.questionsPopup;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (popups.questionsPopup.isOpen) {
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setShowScore(false);
      setShowCorrectAnswers(false);
      setScrambledWord(null);
      setUserScrambledAnswer("");
      setIsWordScramble(false);
    }
  }, [popups.questionsPopup.isOpen]);

  useEffect(() => {
    if (currentQuestion) {
      const shouldScramble = Math.random() < 0.2;
      if (
        shouldScramble &&
        currentQuestion.correctAnswer.split(" ").length === 1
        && isNaN(currentQuestion.correctAnswer)
      ) {
        setIsWordScramble(true);
        setScrambledWord(scrambleWord(currentQuestion.correctAnswer));
      } else {
        setIsWordScramble(false);
        setScrambledWord(null);
      }
    }
  }, [currentQuestion]);

  if (!popups.questionsPopup.isOpen) return null;

  function scrambleWord(word: string) {
    const letters = word.split("");

    const numberOfLetters = letters.length;

    // fisher-yates algorithm from  geeks for geeks
    for (let i = numberOfLetters - 1; i > 0; i--) {
      // random num between 0 and i
      const j = Math.floor(Math.random() * (i + 1));

      // swap i and j
      const temp = letters[i];
      letters[i] = letters[j];
      letters[j] = temp;
    }

    // go bakc to string
    const scrambledWord = letters.join("");

    return scrambledWord;
  }

  const handleAnswer = (selectedAnswer?: string) => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  
    const normalizedCorrect = correctAnswer.toLowerCase().trim().replace(/\s+/g, ' '); // Normalize correct answer
    let normalizedUser = "";
  
    let userAnswer = "";
    if (isWordScramble && scrambledWord) {
      userAnswer = userScrambledAnswer;
      normalizedUser = userScrambledAnswer.toLowerCase().trim().replace(/\s+/g, ' '); // Normalize user input
    } else if (selectedAnswer) {
      userAnswer = selectedAnswer;
      normalizedUser = selectedAnswer.toLowerCase().trim().replace(/\s+/g, ' '); // Normalize user input
    }
  
    const isCorrect = normalizedUser === normalizedCorrect; // Compare normalized answers
  
    setUserAnswers((prevAnswers) => [...prevAnswers, userAnswer]); // Add the new answer to the list of previous answers
  
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserScrambledAnswer("");
    } else {
      setShowScore(true);
      const score = calculateScore();
      const scorePercentage = (score / questions.length) * 100;
      const pass = scorePercentage > 70;
      dispatch(setQuestionPopupPass(pass));
    }
  };
  
  

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      const correct = questions[index].correctAnswer.toLowerCase().trim();
      const userAnswer = answer.toLowerCase().trim();
      return score + (userAnswer === correct ? 1 : 0);
    }, 0);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.loadingText}>
            Fetching questions, please wait...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (showCorrectAnswers && questions?.length) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.card}>
            <Text style={styles.questionText}>Incorrect Answers</Text>
            {questions.map((question: Question, index: number) => {
              if (userAnswers[index] !== question.correctAnswer) {
                return (
                  <View key={index} style={styles.answerItem}>
                    <Text style={styles.questionText}>{question.text}</Text>
                    <Text style={styles.incorrectAnswerText}>
                      Your answer: {userAnswers[index]}
                    </Text>
                    <Text style={styles.answerText}>
                      Correct answer: {question.correctAnswer}
                    </Text>
                  </View>
                );
              }
              return null;
            })}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => dispatch(setQuestionPopupOpen(false))}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (showScore) {
    const score = calculateScore();
    const allCorrect = score === questions.length;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.questionText}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>
            Your Score: {score} out of {questions.length}
          </Text>
          {!allCorrect && (
            <TouchableOpacity
              style={styles.viewAnswersButton}
              onPress={() => setShowCorrectAnswers(true)}
            >
              <Text style={styles.viewAnswersText}>View Correct Answers</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => dispatch(setQuestionPopupOpen(false))}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  try {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          {isWordScramble && scrambledWord ? (
            <>
              <Text style={styles.optionText}>
                Unscramble(case sensitive): {scrambledWord}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Your Answer"
                value={userScrambledAnswer}
                onChangeText={setUserScrambledAnswer}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => handleAnswer()}
              >
                <Text style={styles.submitText}>Submit Answer</Text>
              </TouchableOpacity>
            </>
          ) : (
            currentQuestion.options.map((option: string, index: number) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))
          )}
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
        </View>
      </SafeAreaView>
    );
  } catch (error) {
    console.error("Error in QuestionsPopup:", error);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text>An error occurred. Please try again.</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
    borderRadius: 20,
    overflow: "visible",
  },
  scrollView: {
    width: "100%",
    maxHeight: 500,
    borderRadius: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
    alignSelf: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#4CAF50",
    marginTop: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: colorPalette.secondaryColor,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  optionText: {
    textAlign: "center",
    fontSize: 16,
  },
  submitText: {
    textAlign: "center",
    fontSize: 16,
    color: "white"
  },
  progressText: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  viewAnswersButton: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
  },
  viewAnswersText: {
    color: "white",
    fontWeight: "bold",
  },
  answerItem: {
    marginBottom: 30,
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 10,
  },
  answerText: {
    fontSize: 16,
    marginTop: 5,
  },
  incorrectAnswerText: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: "white",
  },
});

export default QuestionsPopup;
