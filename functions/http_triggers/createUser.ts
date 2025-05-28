import secrets from "@/secrets";

export async function createUser(
  userId: string,
  password: string,
  gameState: any,
  popupState: any
) {
  const res = await fetch(`${secrets.functionsEndpoint}/api/createUserHandler`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, password, gameState, popupState }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create user: ${errorText}`);
  }

  return await res.text(); // or just: return "User created";
}
