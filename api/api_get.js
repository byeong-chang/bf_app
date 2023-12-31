import myLocalIp from "./api_ip";

const tokenLogin = async (token) => {
  const result = await fetch(`http://${myLocalIp}:8080/Acess/${token}`, {
    method: "GET"
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("tokenLogin error is --->" + error);
    });
  return result;
};

const getLocationReview = async (locationID) => {
  const result = await fetch(
    `http://${myLocalIp}:8080/LocationReview/${locationID}`,
    {
      method: "GET"
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("getLocationReview error is --->" + error);
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
};
const recruitmentDetail = async (recruitmentId) => {
  const result = await fetch(
    `http://${myLocalIp}:8080/showDetailRecruitment/${recruitmentId}`,
    {
      method: "GET"
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("recruitmentDetail error is --->" + error);
    });
  return result;
};

const showAllLikeLocation = async (toekn) => {
  const result = await fetch(
    `http://${myLocalIp}:8080/showAllLikeLocation/${toekn}`,
    {
      method: "GET"
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("showAllLikeLocation error is --->" + error);
    });
  return result;
};

const getLocation = async (locationId) => {
  const result = await fetch(
    `http://${myLocalIp}:8080/LocationDetail/${locationId}`,
    {
      method: "GET"
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("getLocation error is --->" + error);
    });
  return result;
};

const api_get = {
  tokenLogin,
  getLocationReview,
  recruitmentAll,
  showAllLikeLocation,
  recruitmentDetail,
  getLocation
};

export default api_get;
