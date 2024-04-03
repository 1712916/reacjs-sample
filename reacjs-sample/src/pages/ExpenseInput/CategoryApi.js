import axios from "axios";
import { API_URL, getResponseData, getToken } from "../../api/ApiUtils.js";

export function callGetCategoryList(onSuccess, onError, onDone) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  axios
    .get(`${API_URL}/categories`, { headers })
    .then((res) => {
      var [data, message, status] = getResponseData(res.data);
      if (status === 200) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      onError(err.data);
    })
    .finally(onDone);
}

export function callAddCategory(category, onSuccess, onError, onDone) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  axios
    .post(
      `${API_URL}/categories`,
      {
        name: category.name,
        type: 0,
      },
      { headers }
    )
    .then((res) => {
      var [data, message, status] = getResponseData(res.data);
      if (status === 200) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      onError(err.data);
    })
    .finally(onDone);
}

export function callDeleteCategory(category, onSuccess, onError, onDone) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  axios
    .delete(`${API_URL}/categories/${category.id}`, { headers })
    .then((res) => {
      var [data, message, status] = getResponseData(res.data);
      if (status === 200) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      onError(err.data);
    })
    .finally(onDone);
}
