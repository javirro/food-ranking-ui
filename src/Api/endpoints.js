export const baseURL = process.env.REACT_APP_API_KEY ? "https://food-ranking-api.azurewebsites.net/api/" : "http://localhost:7071/api/";
export const endpoints = {
  auth: baseURL + "auth",
  add: baseURL + "add-item",
  delete: baseURL + "delete-item",
  get: baseURL + "get-all-items",
  update: baseURL + "update-item"
}