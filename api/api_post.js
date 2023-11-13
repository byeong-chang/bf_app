// example fetch
// 자신의 컴퓨터 ip주소 넣기
const myLocalIp = "";

const signTest = async (data) => {
  const result = await fetch(`http://${myLocalIp}:8080/sign_up`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
    // body: JSON.stringify({
    //   hobby: "1",
    //   locationCategory: "종로구",
    //   disabledCategory: "지체장애",
    //   username: "local",
    //   email: "abc@abc.com",
    //   userId: "root",
    //   passwd: "qwer1234",
    //   disabledValidate: 0
    //   //   token: "13-1"
    //   //   token: "67df9c94-bc15-4852-a6d6-0800764beb0c"
    // })
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((error) => console.log("error is --->" + error));

  return result;
};

const api_post = {
  signTest
};

export default api_post;
// delete from user where id>=1;
