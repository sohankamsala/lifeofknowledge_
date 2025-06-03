---

# 🧠 Life of Knowledge

[![Watch the demo](https://img.youtube.com/vi/bfIxICPtXes/0.jpg)](https://youtube.com/shorts/bfIxICPtXes?feature=share)

**Life of Knowledge** is a virtual life simulator game built with **React Native** and **Expo Router**, powered by **Azure Functions** and **Azure Storage**. It offers interactive gameplay that quizzes users with AI-generated questions and tracks their progress over time.

## ✨ Features

- 📱 Built with **React Native** and **Expo Router**
- ☁️ **Azure Functions backend** for handling logic and data
- 🧠 Dynamic question generation with **Azure OpenAI**
- 🧩 Progress tracking and interactive life simulation
- 🌐 Data persistence using **Azure Blob/Table Storage**
- 📊 Limitless AI-generated quiz content via Azure OpenAI

---

## 📂 Example Environment Setup

Create a `.env` file in functions directory(ex: lok_auth/):

```env
AZURE_OPENAI_API_KEY=your-api-key
AZURE_STORAGE_ACCOUNT_NAME=your-storage-name
AZURE_STORAGE_ACCOUNT_KEY=your-storage-key
FUNCTION_BASE_URL=https://your-function-app.azurewebsites.net

Create an `app/secrets.ts` file:

```ts
export const AZURE_OPENAI_API_KEY = '';
export const AZURE_STORAGE_ACCOUNT_NAME = '';
export const AZURE_STORAGE_ACCOUNT_KEY = '';
export const FUNCTION_BASE_URL = '';
```

---

## 🚀 Deployment Instructions

### 🔧 1. Clone the Repo

```bash
git clone https://github.com/sohankamsala/lifeofknowledge_.git
cd lifeofknowledge_
```

### 📱 2. Run the React Native App (with Expo)

Make sure you have [Expo CLI](https://docs.expo.dev/get-started/installation/) installed:

```bash
npm install -g expo-cli
```

Then install dependencies and start the app:

```bash
npm install
npx expo start
```

### ⚙️ 3. Deploy Azure Functions

Ensure you have the [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) and [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local) installed.

```bash
cd azure-functions
npm install
func azure login
func azure functionapp publish <YourFunctionAppName>
```

> Replace `<YourFunctionAppName>` with your actual Azure Function App name.

---

## 🧠 How AI Questions Work

Questions in **Life of Knowledge** are generated on demand using **Azure OpenAI**, allowing for an *infinite* number of personalized and evolving challenges tailored to your gameplay. This makes each life simulation unique, intelligent, and engaging.

---

## 📸 Demo

Click to watch the demo video:
[![Demo Video](https://img.youtube.com/vi/bfIxICPtXes/0.jpg)](https://youtube.com/shorts/bfIxICPtXes?feature=share)

---

## 🛠️ Tech Stack

* **Frontend**: React Native + Expo Router
* **Backend**: Azure Functions
* **AI Integration**: Azure OpenAI
* **Storage**: Azure Blob/Table Storage

---
