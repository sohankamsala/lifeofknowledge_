import secrets from "../../secrets";

export async function updateGameState(user: { rowKey: string }, gameState: any) {
  const userId = user.rowKey;  // Extract userId from user object

  const res = await fetch(`${secrets.functionsEndpoint}/api/updateGameStateHandler`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, gameState }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update game state: ${errorText}`);
  }

  return res.text();
}