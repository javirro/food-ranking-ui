export const baseURL = process.env.REACT_APP_API_KEY ? "https://food-ranking-api.azurewebsites.net/api/" : "http://localhost:7071/api/";
export const endpoints = {
  auth: baseURL + "auth",
  add: baseURL + "add-item",
  delete: baseURL + "delete-item",
  get: baseURL + "get-all-items",
  update: baseURL + "update-item",
  examples: baseURL + "examples",
  ubication: baseURL + "get-ubications",
};


// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
export const GEOCODING_BASE_URl = "http://api.openweathermap.org/geo/1.0/direct?";