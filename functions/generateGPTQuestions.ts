const { AzureOpenAI } = require("openai");
import secrets from "@/secrets";

let currentDeploymentIndex = 0;

const endpoint = secrets.deployments[0].endpoint;
const apiKey = secrets.deployments[0].apiKey;
const apiVersion = secrets.deployments[0].apiVersion;
const deployment = secrets.deployments[0].deployment;

let isFetching = false; 
let ongoingPromise: Promise<any> | null = null; 

function cycleEndpoints() {
  if (currentDeploymentIndex == secrets.deployments.length - 1) {
    currentDeploymentIndex = 0;
  } else {
    currentDeploymentIndex += 1;
  }

  const endpoint = secrets.deployments[currentDeploymentIndex].endpoint;
  const apiKey = secrets.deployments[currentDeploymentIndex].apiKey;
  const apiVersion = secrets.deployments[currentDeploymentIndex].apiVersion;
  const deployment = secrets.deployments[currentDeploymentIndex].deployment;
}

function getMaxTokens(amount: number): number {
  const baseTokens = 150;
  const tokensPerQuestion = 40;

  return Math.min(baseTokens + amount * tokensPerQuestion, 4000);
}

function trimUntilBrace(str: string) {
  let index = str.length - 1;

  while (index >= 0 && str[index] !== "{") {
    index--;
  }

  return str.slice(0, index);
}

function removeLastOccurrence(str: string, charToRemove: string) {
  let lastIndex = str.lastIndexOf(charToRemove);
  if (lastIndex !== -1) {
    str = str.slice(0, lastIndex) + str.slice(lastIndex + 1);
  }
  return str;
}

async function apiCall(
  amount: number,
  subjects: string,
  difficulty: string,
  specifications: string
) {
  if (isFetching && ongoingPromise) {
    console.log("API call already in progress. Waiting...");
    return await ongoingPromise;
  }

  isFetching = true;

  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true });

  let rawContent = "";

  ongoingPromise = (async () => {
    cycleEndpoints();

    try {
      console.log("Sending request")

      const result = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You're an educational bot that generates practice questions for students. All questions are multiple choice. Respond with a valid JSON array of JavaScript objects of this type:
              interface Question {
                  options: string[];
                  text: string;
                  id: number;
                  correctAnswer: string;
              }

              Make sure the order of the correct answer varies for every question... it can't be A every time, it must be random.

              Ensure the output is valid JSON, free from any special characters, line breaks, or escape sequences.

              Ignore extra specifications if it is empty.

              If the subjects or difficulty doesn't make sense, return this: "invalid/unparsable json", and provide the reason why it didn't make sense

              Restrict any innapropriate or explicit content.
              
              `,
          },
          {
            role: "user",
            content: `${
              amount + 1
            } questions regarding "${subjects}" of difficulty "${difficulty}", and with this extra specification(which could be empty, if it is empty ignore it): "${specifications}"`,
          },
        ],
        model: "gpt-4",
        max_tokens: getMaxTokens(amount),
        temperature: 0.9,
      });

      if (!result.choices || result.choices.length === 0) {
        throw new Error("No response received from OpenAI.");
      }

      rawContent = result.choices[0].message.content.trim();

      let cleanedRawContent = trimUntilBrace(rawContent);

      cleanedRawContent = removeLastOccurrence(cleanedRawContent, ",");

      cleanedRawContent = cleanedRawContent + "]";

      try {
        const questions = JSON.parse(cleanedRawContent);
        console.log("Parsed the response successfully.");
        console.log("Raw content: " + rawContent);
        console.log("Cleaned raw content: " + cleanedRawContent);

        return questions;
      } catch (err) {
        console.log("Error parsing response:", err);
        console.log("Raw content: " + rawContent);
        console.log("Cleaned raw content: " + cleanedRawContent);
        if (rawContent.includes("invalid/unparsable json")) {
          return false;
        }
      }
    } catch (err) {
      console.log("The sample encountered an error:", err);
      throw err;
    } finally {
      isFetching = false;
      ongoingPromise = null;
    }
  })();

  return await ongoingPromise;
}

async function generateGPTQuestions(
  amount: number,
  subjects: string,
  difficulty: string,
  specifications: string
) {
  try {
    return await apiCall(amount, subjects, difficulty, specifications);
  } catch (err) {
    console.log("Error in generating questions:", err);
    isFetching = false;
    ongoingPromise = null;
    console.log("Trying again");
    return await apiCall(amount, subjects, difficulty, specifications);
  }
}

export default generateGPTQuestions;
