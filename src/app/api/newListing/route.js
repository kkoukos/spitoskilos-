import clientPromise from "../../lib/db";
import { cookies } from "next/headers";

const crypto = require("crypto");

export async function POST(req) {
  try {
    const { formData } = await req.json();
    const cookieStore = cookies();
    const session = cookieStore.get("session");

    const sessionjson = JSON.parse(session.value);

    console.log(sessionjson._id);

    console.log(formData);

    const client = await clientPromise;
    const db = client.db("listings");
    console.log("Connected to MongoDB.");

    const collection = db.collection("Residences");

    const listingId = crypto.randomBytes(16).toString("hex");

    // Create the listing document with the specified format
    const listingDocument = {
      _id: listingId,
      user_id: sessionjson._id,
      type: formData.availableFor.toLowerCase(), // Assuming 'Buy' or 'Rent'
      propertyMainCategory: formData.category.toLowerCase(), // Assuming 'House' etc.
      propertyCategory: formData.subcategory,
      price: formData.price * 1000,
      surface: formData.surface,
      numberOfBedrooms: formData.bedrooms,
      availability: formData.availability,
      dateOfUpload: new Date().toISOString().split("T")[0], // Current date
      numberOfBathrooms: formData.bathrooms.toString(),
      floor: formData.floor.toString(),
      dateOfConstruction: formData.year.toString(),
      area: formData.area,
      description: formData.description,
      pictures: ["https://m2.spitogatos.gr/283010860_1600x1200.jpg?v=20130730"], // Assuming you will add picture URLs later
      latitude: formData.lat,
      longitude: formData.lon,
    };

    const result = await collection.insertOne(listingDocument);

    return Response.json({ success: true });
  } catch (e) {
    console.error("API error:", e.message);

    return Response.json({ error: e.message });
  }
}
