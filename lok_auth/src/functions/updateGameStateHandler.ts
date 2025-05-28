import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import updateGameState from "../updateGameState";
import { TableClient } from "@azure/data-tables";

const tableName = process.env.TABLE_NAME!;
const tableServiceURL = process.env.TABLE_SERVICE_URL!;
const partitionKey = process.env.PARTITION_KEY!;
const tableClient = new TableClient(tableServiceURL, tableName);

interface UpdateGameStateBody {
  userId: string;
  gameState: any;
}

export async function updateGameStateHandler(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const body = (await request.json()) as UpdateGameStateBody;
  const { userId, gameState } = body;

  try {
    const user = await tableClient.getEntity(partitionKey, userId);
    await updateGameState(user, gameState);
    return { status: 200, body: "Game state updated" };
  } catch (err) {
    context.error(err);
    const message = err instanceof Error ? err.message : String(err);
    return { status: 500, body: `Error updating game state: ${message}` };
  }
}

app.http("updateGameStateHandler", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: updateGameStateHandler,
});
