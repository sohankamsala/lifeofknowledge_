//updatePopupState.ts

import { TableClient, TableEntity } from "@azure/data-tables";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const tableName = process.env.TABLE_NAME
const tableServiceURL = process.env.TABLE_SERVICE_URL
const partitionKey = process.env.PARTITION_KEY

const tableClient = new TableClient(tableServiceURL, tableName)

export default async function updatePopupState(
  user: TableEntity<any>,
  newPopupState: any
) {
  try {
    user.popupState = JSON.stringify(newPopupState);
    await tableClient.updateEntity(user, "Merge");
    console.log("Popup state updated successfully");
  } catch (error) {
    console.error("Error updating popup state:", error);
    throw error;
  }
}
