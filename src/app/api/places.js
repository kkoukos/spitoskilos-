// v1
import { handlePlacesId } from "../../connectors/handlePlacesId";

// pages/api/search.js

export default async function GET() {
  const { placeId, price, squareMeters } = req.body;

  try {
    // Get latitude and longitude from placeId
    const { lat, lon } = await handlePlacesId(placeId);
    console.log(lat);
    var response = `/results?lat=${lat}&lon=${lon}`;

    if (price != null) {
      response += `&price=${price}`;
    }
    if (squareMeters != null) {
      response += `&price=${squareMeters}`;
    }
    // Redirect user to another page with lat and lon as query parameters
    res.writeHead(302, {
      Location: response,
    });
    res.end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
