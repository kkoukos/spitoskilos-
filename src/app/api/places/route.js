// v1
import { error } from "console";
import { handlePlacesId } from "../../../connectors/handlePlacesId";
import axios from "axios";

// pages/api/search.js

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API;

  try {
    const placeId = "places/ChIJYVzn2RqQoRQRqrPuCt8Vsjg";
    const url = "https://places.googleapis.com/v1/" + placeId;
    const response = await axios.post(`${url}?fields=location&key=${apiKey}`);

    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  }

  return Response.json("api is working");
}
