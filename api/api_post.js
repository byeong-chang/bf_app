import myLocalIp from "./api_ip";

const login = async (data) => {
  const userDTO = await fetch(`http://${myLocalIp}:8080/Login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((res) => console.log("----login--->", res))
    .catch((error) => console.log("---> error : " + error));
  return userDTO;
};

const signUp = async (data) => {
  const userDTO = await fetch(`http://${myLocalIp}:8080/sign_up`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .catch((error) => console.log("---> error : " + error));
  return userDTO;
};

const recommendLocation = async (data) => {
  const location = await fetch(`http://${myLocalIp}:8080/Location`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .catch((error) => console.log("---> error : " + error));
  return location;
};

const api_post = {
  login,
  signUp,
  recommendLocation
};

export default api_post;
