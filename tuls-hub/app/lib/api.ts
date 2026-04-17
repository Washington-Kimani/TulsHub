export const API_BASE = process.env.NEXT_PUBLIC_FLASK_URL || "http://localhost:5000/api/v1/tools";

interface DataType {
    image?: string
    csv?: string
    document?: string
    url?: string
}

export async function postData(endpoint: string, data: DataType) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
}
