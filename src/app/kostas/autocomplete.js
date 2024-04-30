
import axios from 'axios';

export async function autocomplete(inputText) {
  const apiKey = 'AIzaSyC2lO3GSk-qj4gJTcFsmXP23d7oJqopuNA';
  const url = 'https://places.googleapis.com/v1/places:autocomplete';

  const requestBody = {
    input: inputText,
    locationBias: {
      circle: {
        center: {
          latitude: 37.7749,
          longitude: -122.4194
        },
        radius: 5000.0
      }
    }
  };

  try {
    const response = await axios.post(`${url}?key=${apiKey}`, requestBody);
    return response.data;
  } catch (error) {
    console.error('Error fetching autocomplete predictions:', error);
    throw error;
  }
}
