import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import api_post from "../api/api_post";
import api_get from "../api/api_get";

function ChattingBox(props) {
  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>{props.chat.userName}</Text>
      <Text>{props.chat.data}</Text>
    </View>
  );
}

const MatchScreen = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    const getData = async () => {
      const detailData = await api_get.recruitmentDetail(
        route.params.recruitId
      );
      setData(() => detailData);
    };
    getData();
  }, []);

  function ChattingBlock(props) {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");

    const handleShow = () => {
      setShow((p) => !p);
    };

    const handleSubmit = async () => {
      console.log(content);
      const res = await api_post.uploadChat({
        currentUserToken: route.params.token,
        recruitmentId: route.params.recruitId,
        data: content,
        chatLink: props.chatMain.currentChatId
      });
      console.log(res);
      handleShow();
    };

    return (
      <View>
        <ChattingBox
          key={`ChattingBox-${props.chatMain.currentChatId}`}
          chat={props.chatMain}
        />
        <View style={{ marginLeft: 20 }}>
          {props.chatSub.map((chat) => (
            <ChattingBox
              key={`ChattingBox-${chat.currentChatId}`}
              chat={chat}
            />
          ))}
        </View>
        <View style={{ width: "30%" }}>
          <Button title="답글" onPress={handleShow} />
          {show ? (
            <View>
              <TextInput placeholder="내용" onChangeText={setContent} />
              <Button title="작성" onPress={handleSubmit} />
            </View>
          ) : null}
        </View>
      </View>
    );
  }

  function ChattingList(props) {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");

    const handleSubmit = async () => {
      console.log(content);
      const res = await api_post.uploadChat({
        currentUserToken: route.params.token,
        recruitmentId: route.params.recruitId,
        data: content,
        chatLink: 0
      });
      console.log(res);
      setShow((q) => !q);
    };

    let chatLog = [];
    props.chatLogList.map((chat) => {
      if (chat.chatLink === 0) {
        chatLog.push({
          chatMain: chat,
          chatSub: []
        });
      } else {
        chatLog.map((e) => {
          if (chat.chatLink === e.chatMain.currentChatId) {
            e.chatSub.push(chat);
          }
        });
      }
    });

    return (
      <View>
        <View>
          <Button
            title="댓글"
            onPress={() => {
              setShow((p) => !p);
            }}
          />
          {show ? (
            <View>
              <TextInput placeholder="내용" onChangeText={setContent} />
              <Button title="작성" onPress={handleSubmit} />
            </View>
          ) : null}
        </View>
        {chatLog.map((e) => (
          <ChattingBlock chatMain={e.chatMain} chatSub={e.chatSub} />
        ))}
      </View>
    );
  }

  if (data.length === 0) {
    return <Text>데이터 없음</Text>;
  }

  const chattings = data.chatLogList;

  return (
    <View>
      <View>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          {data.title}
        </Text>
        <Text>위치: {data.location.locationName}</Text>
        <Text>예정일: {data.reservationDate}</Text>
        <Text style={{ margin: 5, height: 200, backgroundColor: "#dddddd" }}>
          {data.content}
        </Text>
      </View>
      <ChattingList chatLogList={data.chatLogList} />
    </View>
  );
};

export default MatchScreen;
