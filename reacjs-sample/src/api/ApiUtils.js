import { get } from "axios";

export const API_URL = "http://localhost:8080/api";

var AUTH_TOKEN = "";

export function setToken(token) {
  AUTH_TOKEN = token;
}

export function getToken() {
  return AUTH_TOKEN;
}

export function getResponseData(httpResponse) {
  return [
    httpResponse["data"],
    httpResponse["message"],
    httpResponse["status"],
  ];
}
