import clientPromise from "../../lib/db";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("listings");
    console.log("Connected to MongoDB.");

    const data = await db.collection("Residences").find({}).toArray();
    // console.log("Data retrieved:", data);
    console.log("Data received.");

    const response = new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (e) {
    console.error("API error:", e.message);

    return Response.json({ error: e.message });
  }
}
