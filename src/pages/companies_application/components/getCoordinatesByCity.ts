import axios from "axios";

export async function getCoordinatesByCity(
  city: string
): Promise<{ lat: number; lng: number } | null> {
  const API_KEY = import.meta.env.VITE_OPEN_CAGE_DATA_TOKEN;
  const BASE_URL = import.meta.env.VITE_OPEN_CAGE_DATA_BASE_URL;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        key: API_KEY,
      },
    });

    const results = response.data.results;

    if (results.length > 0) {
      const { lat, lng } = results[0].geometry;
      return { lat, lng };
    } else {
      console.warn("City not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}
