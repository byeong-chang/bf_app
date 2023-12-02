import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, ScrollView } from "react-native";
import api_post from "../api/api_post";
import api_get from "../api/api_get";

function ChattingBox(props) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontWeight: "bold", fontSize: 18}}>{props.chat.userName}: </Text>
      <Text style={{fontSize: 16}}>{props.chat.data}</Text>
    </View>
  );
}

const MatchScreen = ({ route, navigation }) => {
  const [request, setRequest] = useState(0);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  console.log(data);

  useEffect(() => {
    const getData = async () => {
      const detailData = await api_get.recruitmentDetail(
        route.params.recruitId
      )
      .catch((err) => {
        console.log(err);
      });
      setData(() => detailData);
    };
    getData();
  }, [request]);

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
      })
      .catch((err) => {
        console.log(err);
      });
      setRequest((p) => (p+1));
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
        <View style={{ flexDirection: "row" }}>
          <Button title="답글 작성" onPress={handleShow} />
          {show ? (
            <View style={{ flexDirection: "row" }}>
              <TextInput placeholder="내용" onChangeText={setContent} 
                style={{width: "70%", backgroundColor: "ivory",
                borderWidth: 1, }}
              />
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
      const res = await api_post.uploadChat({
        currentUserToken: route.params.token,
        recruitmentId: route.params.recruitId,
        data: content,
        chatLink: 0
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(res);
      setRequest((p) => (p+1));
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
        <View  style={{ flexDirection: "row" }}>
          <Button
            title="댓글"
            onPress={() => {
              setShow((p) => !p);
            }}
          />
          {show ? (
            <View  style={{ flexDirection: "row" }}>
              <TextInput placeholder="내용" onChangeText={setContent}
                style={{width: "80%", backgroundColor: "ivory",
                borderWidth: 1, }}
              />
              <Button title="작성" onPress={handleSubmit} />
            </View>
          ) : null}
        </View>
        {chatLog.map((e) => (
          <ChattingBlock 
            key={`ChattingBlock-${e.chatMain.currentChatId}`} 
            chatMain={e.chatMain} 
            chatSub={e.chatSub} />
        ))}
      </View>
    );
  }


  if (data.length === 0) {
    return <Text>데이터 없음</Text>;
  }
  const handleMatch = async () => {
    if( data.chatLogList.length === 0 ) {
      alert('댓글 작성자가 없습니다.');
    }
    else if( name.length === 0 ) {
      alert('매칭 상대의 이름을 입력해주십시오.');
    }
    else{
      let token = null;
      data.chatLogList.map((chat) => {
        if( chat.userName === name) {
          token = chat.currentUserToken;
        }
      });
      if(token) {
        const res = await api_post.matching({
          flag: 1,
          recruitmentId: route.params.recruitId,
          volunteerUserToken: token
        })
        .then(() => {
          alert('매칭 성공!');
        })
        .catch((err) => {
          console.log(err);
        });
        console.log(res);
        setRequest((p) => (p+1));
      }
      else {
        alert('해당되는 매칭 상대가 없습니다.');
      }
    }
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View>
          <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}>
            {data.title}
          </Text>
          <Text style={{ textAlign: "right", fontSize:20}}>{data.flag?'매칭 완료':'매칭 대기중'}</Text>
          <Text>요청자: {data.user.username}</Text>
          <Text>위치: {data.location.locationName}</Text>
          <Text>예정일: {data.reservationDate}</Text>
          <Text style={{ margin: 5, height: 200, backgroundColor: "ivory" }}>
            {data.content}
          </Text>
        </View>
        
        <View  style={{ flexDirection: "row" }}>
          <Button title="매칭" onPress={handleMatch}/>
          <TextInput placeholder="매칭 상대" onChangeText={setName}
            style={{width: "70%", backgroundColor: "ivory",
            borderWidth: 1, textAlign: "center"}}
          />
        </View>
        <ChattingList chatLogList={data.chatLogList} />
      </ScrollView>
    </View>
  );
};

export default MatchScreen;
