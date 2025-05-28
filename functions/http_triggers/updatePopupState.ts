import secrets from "../../secrets";

export async function updatePopupState(user: { rowKey: string }, popupState: any) {
  const userId = user.rowKey;  // Extract userId from user object

  console.log("updatePopupState");
  console.log(userId);
  console.log(JSON.stringify(popupState));

  const res = await fetch(`${secrets.functionsEndpoint}/api/updatePopupStateHandler`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, popupState }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update popup state: ${errorText}`);
  }

  return res.text();
}
