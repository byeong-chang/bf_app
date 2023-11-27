import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, Alert } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import api_post from "../api/api_post";

export default function SingUp({ navigation, route }) {
  const [hobby, setHobby] = useState(null);
  const [locationCategory, setLocationCategory] = useState(null);
  const [disabledCategory, setDisabledCategory] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [passwd, setPasswd] = useState(null);
  const [disabledValidate, setDisabledValidate] = useState(null);
  const token = route.params ? route.params.token : "no token";

  const [checkPw, setCheckPw] = useState("no");

  const disableData = [
    { key: "1", value: "지체장애" },
    { key: "2", value: "뇌병변장애" },
    { key: "3", value: "시각장애" },
    { key: "4", value: "청각장애" },
    { key: "5", value: "언어장애" },
    { key: "6", value: "안면장애" },
    { key: "7", value: "내부기관의 장애" },
    { key: "8", value: "발달장애" },
    { key: "9", value: "정신장애" }
  ];

  const hobbyData = [
    { key: "1", value: "영화/연극/공연" },
    { key: "2", value: "전시/기념관" },
    { key: "3", value: "체육/운동" },
    { key: "4", value: "레저" },
    { key: "5", value: "관광" },
    { key: "6", value: "산책" },
    { key: "7", value: "명승지" }
  ];
  const loactionData = [
    { key: "1", value: "종로구" },
    { key: "2", value: "파주시" },
    { key: "3", value: "안양시 동안구" },
    { key: "4", value: "신안군" },
    { key: "5", value: "고양시 덕양구" },
    { key: "6", value: "영주시" },
    { key: "7", value: "과천시" },
    { key: "8", value: "충주시" },
    { key: "9", value: "관악구" },
    { key: "10", value: "가평군" },
    { key: "11", value: "서대문구" },
    { key: "12", value: "중구" },
    { key: "13", value: "구로구" },
    { key: "14", value: "고양시 일산서구" },
    { key: "15", value: "여수시" },
    { key: "16", value: "시흥시" },
    { key: "17", value: "하남시" },
    { key: "18", value: "창원시 마산회원구" },
    { key: "19", value: "창원시 마산합포구" },
    { key: "20", value: "화성시" },
    { key: "21", value: "안성시" },
    { key: "22", value: "포항시 북구" },
    { key: "23", value: "경주시" },
    { key: "24", value: "성북구" },
    { key: "25", value: "여주시" },
    { key: "26", value: "영광군" },
    { key: "27", value: "태백시" },
    { key: "28", value: "포천시" },
    { key: "29", value: "양산시" },
    { key: "30", value: "광진구" },
    { key: "31", value: "마포구" },
    { key: "32", value: "안산시 단원구" },
    { key: "33", value: "강북구" },
    { key: "34", value: "성동구" },
    { key: "35", value: "광주시" },
    { key: "36", value: "해남군" },
    { key: "37", value: "서구" },
    { key: "38", value: "동구" },
    { key: "39", value: "무안군" },
    { key: "40", value: "고성군" },
    { key: "41", value: "영등포구" },
    { key: "42", value: "포항시 남구" },
    { key: "43", value: "양주시" },
    { key: "44", value: "용인시 기흥구" },
    { key: "45", value: "제주시" },
    { key: "46", value: "청주시 흥덕구" },
    { key: "47", value: "진도군" },
    { key: "48", value: "원주시" },
    { key: "49", value: "기장군" },
    { key: "50", value: "홍천군" },
    { key: "51", value: "익산시" },
    { key: "52", value: "청주시 상당구" },
    { key: "53", value: "남구" },
    { key: "54", value: "함평군" },
    { key: "55", value: "연제구" },
    { key: "56", value: "청주시 청원구" },
    { key: "57", value: "양평군" },
    { key: "58", value: "서귀포시" },
    { key: "59", value: "진안군" },
    { key: "60", value: "거제시" },
    { key: "61", value: "완도군" },
    { key: "62", value: "칠곡군" },
    { key: "63", value: "담양군" },
    { key: "64", value: "옥천군" },
    { key: "65", value: "창녕군" },
    { key: "66", value: "사천시" },
    { key: "67", value: "광산구" },
    { key: "68", value: "성남시 분당구" },
    { key: "69", value: "음성군" },
    { key: "70", value: "동해시" },
    { key: "71", value: "강남구" },
    { key: "72", value: "부산진구" },
    { key: "73", value: "김해시" },
    { key: "74", value: "달서구" },
    { key: "75", value: "합천군" },
    { key: "76", value: "고령군" },
    { key: "77", value: "강서구" },
    { key: "78", value: "문경시" },
    { key: "79", value: "창원시 성산구" },
    { key: "80", value: "무주군" },
    { key: "81", value: "청도군" },
    { key: "82", value: "연수구" },
    { key: "83", value: "김포시" },
    { key: "84", value: "강릉시" },
    { key: "85", value: "목포시" },
    { key: "86", value: "화천군" },
    { key: "87", value: "울주군" },
    { key: "88", value: "영암군" },
    { key: "89", value: "안동시" },
    { key: "90", value: "구리시" },
    { key: "91", value: "서천군" },
    { key: "92", value: "산청군" },
    { key: "93", value: "태안군" },
    { key: "94", value: "창원시 의창구" },
    { key: "95", value: "양양군" },
    { key: "96", value: "계양구" },
    { key: "97", value: "안산시 상록구" },
    { key: "98", value: "북구" },
    { key: "99", value: "평창군" },
    { key: "100", value: "영도구" },
    { key: "101", value: "사하구" },
    { key: "102", value: "의령군" },
    { key: "103", value: "고흥군" },
    { key: "104", value: "옹진군" },
    { key: "105", value: "대덕구" },
    { key: "106", value: "경산시" },
    { key: "107", value: "논산시" },
    { key: "108", value: "영덕군" },
    { key: "109", value: "서초구" },
    { key: "110", value: "강동구" },
    { key: "111", value: "예천군" },
    { key: "112", value: "수성구" },
    { key: "113", value: "제천시" },
    { key: "114", value: "고창군" },
    { key: "115", value: "전주시 완산구" },
    { key: "116", value: "춘천시" },
    { key: "117", value: "정선군" },
    { key: "118", value: "횡성군" },
    { key: "119", value: "삼척시" },
    { key: "120", value: "영월군" },
    { key: "121", value: "강진군" },
    { key: "122", value: "순창군" },
    { key: "123", value: "강화군" },
    { key: "124", value: "순천시" },
    { key: "125", value: "성남시 수정구" },
    { key: "126", value: "청송군" },
    { key: "127", value: "의왕시" },
    { key: "128", value: "수영구" },
    { key: "129", value: "유성구" },
    { key: "130", value: "수원시 영통구" },
    { key: "131", value: "전주시 덕진구" },
    { key: "132", value: "천안시 서북구" },
    { key: "133", value: "해운대구" },
    { key: "134", value: "수원시 권선구" },
    { key: "135", value: "용산구" },
    { key: "136", value: "인제군" },
    { key: "137", value: "거창군" },
    { key: "138", value: "울진군" },
    { key: "139", value: "남해군" },
    { key: "140", value: "홍성군" },
    { key: "141", value: "동대문구" },
    { key: "142", value: "이천시" },
    { key: "143", value: "부안군" },
    { key: "144", value: "상주시" },
    { key: "145", value: "수원시 장안구" },
    { key: "146", value: "오산시" },
    { key: "147", value: "수원시 팔달구" },
    { key: "148", value: "의정부시" },
    { key: "149", value: "평택시" },
    { key: "150", value: "고양시 일산동구" },
    { key: "151", value: "동두천시" },
    { key: "152", value: "부천시" },
    { key: "153", value: "창원시 진해구" },
    { key: "154", value: "진주시" },
    { key: "155", value: "함안군" },
    { key: "156", value: "구미시" },
    { key: "157", value: "군위군" },
    { key: "158", value: "통영시" },
    { key: "159", value: "의성군" },
    { key: "160", value: "달성군" },
    { key: "161", value: "철원군" },
    { key: "162", value: "노원구" },
    { key: "163", value: "나주시" },
    { key: "164", value: "양천구" },
    { key: "165", value: "계룡시" },
    { key: "166", value: "공주시" },
    { key: "167", value: "예산군" },
    { key: "168", value: "용인시 수지구" },
    { key: "169", value: "연천군" },
    { key: "170", value: "남양주시" },
    { key: "171", value: "세종특별자치시" },
    { key: "172", value: "아산시" },
    { key: "173", value: "완주군" },
    { key: "174", value: "하동군" },
    { key: "175", value: "청양군" },
    { key: "176", value: "동작구" },
    { key: "177", value: "군산시" },
    { key: "178", value: "서산시" },
    { key: "179", value: "곡성군" },
    { key: "180", value: "속초시" },
    { key: "181", value: "용인시 처인구" },
    { key: "182", value: "영천시" },
    { key: "183", value: "천안시 동남구" },
    { key: "184", value: "진천군" },
    { key: "185", value: "성남시 중원구" },
    { key: "186", value: "금정구" },
    { key: "187", value: "남동구" },
    { key: "188", value: "미추홀구" },
    { key: "189", value: "청주시 서원구" },
    { key: "190", value: "광양시" },
    { key: "191", value: "보령시" },
    { key: "192", value: "밀양시" },
    { key: "193", value: "은평구" },
    { key: "194", value: "금산군" },
    { key: "195", value: "영동군" },
    { key: "196", value: "중랑구" },
    { key: "197", value: "장흥군" },
    { key: "198", value: "금천구" },
    { key: "199", value: "안양시 만안구" },
    { key: "200", value: "울릉군" },
    { key: "201", value: "송파구" },
    { key: "202", value: "광명시" },
    { key: "203", value: "당진시" },
    { key: "204", value: "양구군" },
    { key: "205", value: "괴산군" },
    { key: "206", value: "남원시" },
    { key: "207", value: "부여군" },
    { key: "208", value: "구례군" },
    { key: "209", value: "보은군" },
    { key: "210", value: "단양군" },
    { key: "211", value: "정읍시" },
    { key: "212", value: "영양군" },
    { key: "213", value: "도봉구" },
    { key: "214", value: "김천시" },
    { key: "215", value: "봉화군" },
    { key: "216", value: "장성군" },
    { key: "217", value: "함양군" },
    { key: "218", value: "군포시" },
    { key: "219", value: "화순군" },
    { key: "220", value: "동래구" },
    { key: "221", value: "김제시" },
    { key: "222", value: "보성군" },
    { key: "223", value: "증평군" },
    { key: "224", value: "임실군" },
    { key: "225", value: "성주군" },
    { key: "226", value: "부평구" },
    { key: "227", value: "장수군" },
    { key: "228", value: "사상구" }
  ];

  "1", "종로구";

  const handleSignUp = async () => {
    if (
      token &&
      hobby &&
      locationCategory &&
      disabledCategory &&
      username &&
      email &&
      userId &&
      passwd &&
      checkPw
    ) {
      const data = {
        hobby,
        locationCategory,
        disabledCategory,
        username,
        email,
        userId,
        passwd,
        disabledValidate,
        token
      };
      // console.log("---> data : " + JSON.stringify(data));
      const res = await api_post.signUp(data);
      console.log(res);
      navigation.pop();
      return;
    }
    alert("회원정보를 모두 입력하세요");
  };
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {/* token */}
      <Text style={{ padding: 5 }}>{token}</Text>

      {/* id */}
      <TextInput
        placeholder="아이디를 입력해주세요"
        placeholderTextColor={"black"}
        maxLength={20}
        style={styles.textInput}
        onChangeText={setUserId}
      />
      <Text>{userId ? "아이디 : " + userId : "no id"}</Text>

      {/* pw */}
      <TextInput
        placeholder="비밀번호를 입력해주세요"
        placeholderTextColor={"black"}
        maxLength={20}
        style={styles.textInput}
        onChangeText={setPasswd}
        secureTextEntry={true}
      />
      <Text>{passwd ? "비밀번호 : " + passwd : "no passwd"}</Text>

      {/* check pwd */}
      <TextInput
        placeholder="비밀번호를 한번더 입력해주세요"
        placeholderTextColor={"black"}
        maxLength={20}
        style={styles.textInput}
        onChangeText={setCheckPw}
        secureTextEntry={true}
      />
      <Text style={passwd === checkPw ? { color: "blue" } : { color: "red" }}>
        {passwd === checkPw
          ? "비밀번호가 일치합니다"
          : "비밀번호를 다시 확인하세요"}
      </Text>

      {/* email */}
      <TextInput
        placeholder="이메일을 입력해주세요"
        placeholderTextColor={"black"}
        maxLength={20}
        style={styles.textInput}
        onChangeText={setEmail}
      />
      <Text>{email ? "이메일 : " + email : "no email"}</Text>

      {/* username */}
      <TextInput
        placeholder="닉네임을 입력해주세요"
        placeholderTextColor={"black"}
        maxLength={20}
        style={styles.textInput}
        onChangeText={setUsername}
      />
      <Text>{username ? "닉네임 : " + username : "no username"}</Text>

      {/* hobby */}
      <View width="70%">
        <SelectList
          placeholder="취미를 선택해 주세요"
          searchPlaceholder="취미"
          setSelected={(val) => {
            const index = hobbyData.findIndex((key) => key.value == val) + 1;
            console.log(val + "의 키값은 : " + index);
            setHobby(index);
          }}
          data={hobbyData}
          save="value"
          dropdownShown={false}
        />
      </View>
      <Text>{hobby}</Text>

      {/* disableData */}
      <View width="70%">
        <SelectList
          placeholder="가지고 계신 장애를 선택해주세요"
          searchPlaceholder="장애 유형"
          setSelected={(val) => {
            const index = disableData.findIndex((key) => key.value == val) + 1;
            console.log(val + "의 키값은 : " + index);
            setDisabledValidate(index);
            setDisabledCategory(val);
          }}
          data={disableData}
          save="value"
          dropdownShown={false}
        />
      </View>
      <Text>{disabledCategory}</Text>

      {/* locationCategory */}
      <View width="70%">
        <SelectList
          placeholder="거주 지역을 선택해주세요"
          searchPlaceholder="거주 지역"
          setSelected={(val) => {
            const index = loactionData.findIndex((key) => key.value == val) + 1;
            console.log(val + "의 키값은 : " + index);
            setLocationCategory(val);
          }}
          data={loactionData}
          save="value"
          dropdownShown={false}
        />
      </View>
      <Text>{locationCategory}</Text>
      <Button title="회원가입" width={"50%"} onPress={handleSignUp}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  textInput: {
    borderRadius: 100,
    fontWeight: "bold",
    fontSize: 15,
    backgroundColor: "gray",
    height: 30,
    width: "70%",
    textAlign: "center"
  }
});
