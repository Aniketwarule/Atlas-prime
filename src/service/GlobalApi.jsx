import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';
const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

// Required headers for the new Places API
const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-FieldMask': 'places.displayName,places.photos,places.id',
    'X-Goog-Api-Key': API_KEY
  }
};

export const GetPlaceDetails = async (query) => {
  try {
    const response = await axios.post(BASE_URL, {
      textQuery: query,
      languageCode: 'en'
    }, config);
    
    return response.data;
  } catch (error) {
    console.error('API Error:', {
      status: error.response?.status,
      message: error.message,
      data: error.response?.data
    });
    throw error;
  }
};

// Updated photo URL format
export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{PHOTO_NAME}/media?key=${API_KEY}&maxHeightPx=400`;