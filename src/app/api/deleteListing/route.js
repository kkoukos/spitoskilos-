import clientPromise from "../../lib/db";

export async function POST(req) {
  try {
    const { listing_id } = await req.json();

    console.log(listing_id);

    const client = await clientPromise;
    const db = client.db("listings");
    console.log("Connected to MongoDB.");

    // Find the listing to ensure it exists before attempting to delete
    const listing = await db
      .collection("Residences")
      .findOne({ _id: listing_id });

    if (!listing) {
      console.log("Listing doesn't exist.");

      return res.json({
        success: false,
        message: "Listing doesn't exist",
      });
    }

    // Delete the listing from the 'Residences' collection
    const result = await db
      .collection("Residences")
      .deleteOne({ _id: listing_id });

    console.log(`Listing with ID: ${listing_id} deleted successfully.`);

    return Response.json({
      success: true,
      message: "Favorite removed",
    });
  } catch (e) {
    console.error("API error:", e.message);

    return Response.json({ error: e.message });
  }
}
