//updategameState.ts

import { TableClient, TableEntity } from "@azure/data-tables";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const tableName = process.env.TABLE_NAME
const tableServiceURL = process.env.TABLE_SERVICE_URL
const partitionKey = process.env.PARTITION_KEY

const tableClient = new TableClient(tableServiceURL, tableName)

export default async function updateGameState(
  user: TableEntity<any>,
  newGameState: any
) {
  try {
    user.gameState = JSON.stringify(newGameState);
    await tableClient.updateEntity(user, "Merge");
    console.log("Game state updated successfully");
  } catch (error) {
    console.error("Error updating game state:", error);
    throw error;
  }
}
