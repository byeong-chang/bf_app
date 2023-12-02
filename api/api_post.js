import myLocalIp from "./api_ip";

const login = async (data) => {
  const userDTO = await fetch(`http://${myLocalIp}:8080/Login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => console.log("---> login error : " + error));
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
    .then((res) => {
      return res.json();
    })
    .catch((error) => console.log("---> signUp error : " + error));
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
    .then((res) => {
      return res.json();
    })
    .catch((error) => console.log("recommendLocation error ----> : " + error));
  return location;
};
const upload = async (data) => {
  const recruitmentDTO = await fetch(
    `http://${myLocalIp}:8080/writeRecruitment`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => console.log("--->upload error : " + error));
  return recruitmentDTO;
};
const uploadChat = async (data) => {
  const recruitmentDTO = await fetch(`http://${myLocalIp}:8080/writeChatting`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .catch((error) => console.log("--->uploadChat error : " + error));
  return recruitmentDTO;
};

const writeReview = async (data) => {
  const reviewRes = await fetch(`http://${myLocalIp}:8080/writeReview`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => console.log("---> writeReviewerror : " + error));
  return reviewRes;
};

const likeLocation = async (data) => {
  const likeRes = await fetch(`http://${myLocalIp}:8080/SaveLikeLocation`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => console.log("--->likeLocation error : " + error));
  return likeRes;
};

const searchLocation = async (data) => {
  const likeRes = await fetch(`http://${myLocalIp}:8080/LocationSearch`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => console.log("--->searchLocation error : " + error));
  return likeRes;
};
const matching = async (data) => {
  const recruitmentDTO = await fetch(`http://${myLocalIp}:8080/saveMatchingResult`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => console.log("--->matching error : " + error));
  return recruitmentDTO;
};

const api_post = {
  login,
  signUp,
  recommendLocation,
  upload,
  uploadChat,
  writeReview,
  likeLocation,
  searchLocation,
  matching
};

export default api_post;
