//createUser.ts

import { TableClient } from "@azure/data-tables";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const tableName = process.env.TABLE_NAME
const tableServiceURL = process.env.TABLE_SERVICE_URL
const partitionKey = process.env.PARTITION_KEY

const tableClient = new TableClient(tableServiceURL, tableName)

export default async function createUser(
  userId: string,
  password: string,
  gameState: any,
  popupState: any
) {
  try {
    const entity = {
      partitionKey,
      rowKey: userId,
      password,
      gameState: JSON.stringify(gameState),
      popupState: JSON.stringify(popupState),
    };

    await tableClient.createEntity(entity);
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
