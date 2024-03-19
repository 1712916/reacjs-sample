import axios from "axios";
import { API_URL } from "../../api/ApiUtils";
import async from "async";
import { delay } from "../../utils/delay";

export async function callLogin(account, password, onSuccess, onError) {
  // Handle login logic here
  const headers = {
    "Content-Type": "application/json",
  };

  return axios
    .post(
      `${API_URL}/login`,
      {
        account: account,
        password: password,
      },
      { headers },
    )
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        onSuccess();
      } else {
        onError(`Login failed: ${response.data.message}`);
      }
    })
    .catch((error) => {
      console.log(error);
      onError(`Login failed: ${error.message}`);
    });
}

//create call register function
export async function callRegister(
  account,
  password,
  email,
  onSuccess,
  onError,
) {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios
    .post(
      `${API_URL}/register`,
      {
        account: account,
        password: password,
        email: email,
      },
      { headers },
    )
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        onSuccess();
      } else {
        onError(`Register failed: ${response.data.message}`);
      }
    })
    .catch((error) => {
      console.log(error);
      onError(`Register failed: ${error.message}`);
    });
}
