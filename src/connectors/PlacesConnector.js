import axios from "axios";

export async function PlacesConnector(inputText) {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API;

  const url = "https://places.googleapis.com/v1/places:autocomplete";

  const requestBody = {
    input: inputText,
    locationBias: {
      circle: {
        center: {
          latitude: 37.98381,
          longitude: 23.727539,
        },
        radius: 5000.0,
      },
    },
  };

  try {
    const response = await axios.post(`${url}?key=${apiKey}`, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error fetching autocomplete predictions:", error);
    throw error;
  }
}
