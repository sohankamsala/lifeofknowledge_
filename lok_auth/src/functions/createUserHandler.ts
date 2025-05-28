import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import createUser from "../createUserHandler";

interface CreateUserRequestBody {
  userId: string;
  password: string;
  gameState: any;
  popupState: any;
}

export async function createUserHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const body = await request.json() as CreateUserRequestBody;
  const { userId, password, gameState, popupState } = body;

  try {
    await createUser(userId, password, gameState, popupState);
    return { status: 201, body: "User created" };
  } catch (err) {
    context.error(err);
    const message = err instanceof Error ? err.message : String(err);
    return { status: 500, body: `Error creating user: ${message}` };
  }
}

app.http("createUserHandler", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: createUserHandler,
});
