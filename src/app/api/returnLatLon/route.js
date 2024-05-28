export async function POST(req) {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API;
  //   const { placesId } = await req.json();

  try {
    const { placesId } = await req.json();
    // Construct the URL for the Google Places API
    const url = `https://places.googleapis.com/v1/${placesId}?fields=location&key=${apiKey}`;

    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br",
      DNT: "1",
      "Sec-GPC": "1",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
    };

    const options = {
      method: "GET", // Specify the HTTP method
      headers: headers,
      cache: "no-store", // Prevent caching
    };
    // Fetch data from the API
    const response = await fetch(url, options);

    // Parse JSON data from the response
    const data = await response.json();

    // Ensure the data has the expected structure
    if (data && data.location) {
      const { latitude, longitude } = data.location;

      // Log latitude and longitude
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);

      // Return latitude and longitude as an object

      return Response.json({ lat: latitude, lon: longitude });
    } else {
      console.log(response);
      console.log(url);

      throw new Error("Invalid data structure received from API");
    }
  } catch (error) {
    console.error("Error fetching lon+lat:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}
