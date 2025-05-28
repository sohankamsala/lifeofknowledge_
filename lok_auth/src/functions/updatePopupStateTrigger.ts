import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import updatePopupState from "../updatePopupState";
import { TableClient } from "@azure/data-tables";

const tableName = process.env.TABLE_NAME!;
const tableServiceURL = process.env.TABLE_SERVICE_URL!;
const partitionKey = process.env.PARTITION_KEY!;
const tableClient = new TableClient(tableServiceURL, tableName);

interface UpdatePopupStateBody {
  userId: string;
  popupState: any;
}

export async function updatePopupStateHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const body = await request.json() as UpdatePopupStateBody;
  const { userId, popupState } = body;

  try {
    const user = await tableClient.getEntity(partitionKey, userId);
    await updatePopupState(user, popupState);
    return { status: 200, body: "Popup state updated" };
  } catch (err) {
    context.error(err);
    const message = err instanceof Error ? err.message : String(err);
    return { status: 500, body: `Error updating popup state: ${message}` };
  }
}

app.http("updatePopupStateHandler", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: updatePopupStateHandler,
});
