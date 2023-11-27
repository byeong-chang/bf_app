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
const upload = async (data) => {
  const recruitmentDTO = await fetch(`http://${myLocalIp}:8080/writeRecruitment`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .catch((error) => console.log("---> error : " + error));
  return recruitmentDTO;
}
const api_post = {
  login,
  signUp,
  upload
};

export default api_post;
