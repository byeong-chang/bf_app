import myLocalIp from "./api_ip";

const tokenLogin = async (token) => {
  const result = await fetch(`http://${myLocalIp}:8080/Acess/${token}`, {
    method: "GET"
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log("error is --->" + error);
    });
  return result;
};

const recruitmentAll = async () => {
  const result = await fetch(`http://${myLocalIp}:8080/showAllRecruitment`, {
    method: "GET"
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log("error is --->" + error);
    });
  return result;
}

const api_get = { 
  tokenLogin,
  recruitmentAll
};

export default api_get;
