export async function handlePlacesId(placesId) {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API;
  try {
    // Construct the URL for the Google Places API
    const url = `https://places.googleapis.com/v1/${placesId}?fields=location&key=${apiKey}`;

    // Fetch data from the API
    const response = await fetch(url, { cache: "no-store" });

    // Parse JSON data from the response
    const data = await response.json();

    // Ensure the data has the expected structure
    if (data && data.location) {
      const { latitude, longitude } = data.location;

      // Log latitude and longitude
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);

      // Return latitude and longitude as an object
      return { lat: latitude, lon: longitude };
    } else {
      throw new Error("Invalid data structure received from API");
    }
  } catch (error) {
    console.error("Error fetching lon+lat:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}
