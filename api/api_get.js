// example fetch
// 자신의 컴퓨터 ip주소 넣기
const myLocalIp = "172.21.80.163";

const fetchTest = async () => {
  const result = await fetch(`http://${myLocalIp}:8080/test`, {
    method: "GET"
  })
    .then((res) => res.json())
    .catch((error) => console.log("error is --->" + error));
  return result;
};

const api_get = { fetchTest };

export default api_get;
