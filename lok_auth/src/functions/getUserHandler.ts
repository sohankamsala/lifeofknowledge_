import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import getUser from "../getUserHandler";

export async function getUserHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const userId = request.query.get("userId");

  if (!userId) {
    return { status: 400, body: "Missing userId" };
  }

  try {
    const user = await getUser(userId);
    return { status: 200, jsonBody: user };
  } catch (err) {
    context.error(err);
    const message = err instanceof Error ? err.message : String(err);
    return { status: 500, body: `Error fetching user: ${message}` };
  }
}

app.http("getUserHandler", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getUserHandler,
});
