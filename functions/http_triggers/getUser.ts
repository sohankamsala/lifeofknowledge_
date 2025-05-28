import secrets from "@/secrets";

export async function getUser(userId: string) {
  const res = await fetch(
    `${secrets.functionsEndpoint}/api/getUserHandler?userId=${encodeURIComponent(userId)}`,
    {
      method: "GET",
      headers: {
        "x-functions-key": secrets.functionsKey,
      },
    }
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to get user");
  }
  const text = await res.text();
  if (!text) {
    return null;
  }
  
  return JSON.parse(text);
}
