//getUser.ts

import { TableClient } from "@azure/data-tables";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const tableName = process.env.TABLE_NAME
const tableServiceURL = process.env.TABLE_SERVICE_URL
const partitionKey = process.env.PARTITION_KEY

const tableClient = new TableClient(tableServiceURL, tableName)

export default async function getUser(userId: string) {
  try {
    const entity = await tableClient.getEntity(partitionKey, userId);
    return entity;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
