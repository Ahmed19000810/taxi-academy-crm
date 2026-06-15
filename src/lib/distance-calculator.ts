export async function calculateDistance(fromAddress: string, toAddress: string) {
  try {
    const response = await fetch("/api/distance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromAddress, toAddress })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to calculate distance");
    }
    return await response.json();
  } catch (error) {
    console.error("Distance calculation error:", error);
    throw error;
  }
}