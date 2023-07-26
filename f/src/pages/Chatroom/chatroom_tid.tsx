import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonFooter,
  IonItem,
  IonIcon,
  IonAvatar,
  IonChip,
  IonLabel,
  IonInput,
  IonList,
  IonButton,
  useIonLoading,
} from "@ionic/react";
import { caretBack, send } from "ionicons/icons";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import API from "../../api/useApi";
import { useBack } from "../../api/stor";
import "./chatroom.css";
import Appbarstaff from "../../components/Appbarstaff/Appbarstaff";

const Chatroom_tid: React.FC = () => {
  const history = useHistory();
  const params: any = useParams();
  const [present, dismiss] = useIonLoading();
  const [currentUser, setCurrentUser] = useState<any>();
  const socket: any = useRef();
  const setIsBack = useBack((state: any) => state.setIsBack);
  const [messages, setMessages] = useState<any>([]);
  const scrollRef = useRef<HTMLIonContentElement | null>(null);
  const [arrivalMessage, setArrivalMessage] = useState<any>();
  const { sid } = useParams<{ sid: string }>();
  const [chats, setChat] = useState<any[]>([]);

  const [input, setInput] = useState("");
  const [users, setUsers] = useState("");

  console.log(sid);
  const scrollToBottom = () => {
    scrollRef.current && scrollRef.current.scrollToBottom();
  };

  const mounted = async () => {
    if (!localStorage.getItem("TID")) {
      history.push("/");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("TID")!));
    }
  };

  const handleSendMsg = async (msg: any) => {
    getCurrentChat();
    const data = await JSON.parse(localStorage.getItem("TID")!);
    socket.current.emit("send-msg", {
      to: params.param._id,
      from: data._id,
      msg,
    });
    await API.post(`/messages/addmsg`, {
      from: data._id,
      to: params.param._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  const sendMessage = (event: any) => {
    event.preventDefault();
    if (input.length > 0) {
      handleSendMsg(input);
      setInput("");
    }
  };

  const getCurrentChat = async () => {
    const storedValue = localStorage.getItem("SID");

    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      params.param = parsedValue;
      console.log(params.param);
    }
  };

  useEffect(() => {
    API.get(`messages/getmsguser/${sid}`).then((response) => {
      console.log("message", response.data);
      setChat(response.data);
    });
  }, [present, dismiss]);

  useEffect(() => {
    API.get(`student/${sid}`).then((response) => {
      console.log(response.data.name);
      setUsers(response.data.name);
    });
  }, [present, dismiss]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getCurrentChat();
  }, []);

  const backToList = () => {
    setIsBack(true);
    history.goBack();
  };
  console.log("users", users);

  return (
    <IonPage>
      <Appbarstaff />

      <IonHeader mode="md">
        <IonToolbar>
          <IonButtons>
            <IonChip
              color="success"
              style={{ marginLeft: "0.5rem" }}
              onClick={backToList}
            >
              <IonIcon icon={caretBack}></IonIcon>
              <IonLabel>กลับ</IonLabel>
            </IonChip>
          </IonButtons>
          <IonTitle slot="end">
                {sid ? users : "Loading"}{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen color="secondary">
        <br />
        {chats.map((chat: any) => (
          <IonItem lines="none" key={uuidv4()}>
            <IonChip
              color={chat.sender != sid ? "success" : "primary"}
              slot={chat.sender != sid ? "end" : "start"}
            >
              {chat.sender != sid ? (
                <></>
              ) : (
                <IonAvatar>
                  <img
                    alt=""
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />
                </IonAvatar>
              )}
              <IonLabel>{chat.message.text}</IonLabel>
              {chat.sender != sid ? (
                <IonAvatar>
                  <img
                    alt=""
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />
                </IonAvatar>
              ) : (
                <></>
              )}
            </IonChip>
          </IonItem>
        ))}
      </IonContent>

      <IonFooter>
        <IonList class="au-form"  style={{borderTop: "1px solid gray"}} >
          <IonItem lines="none">
            <IonInput
              placeholder="คุณกำลังคิดอะไรอยู่"
              // style={{ background: "#a71616" }}
              value={input}
              onIonChange={(e: any) => setInput(e.target.value)}
            ></IonInput>
            <IonButton
              size="default"
              style={{ background:"red" ,with:"70px", }}
              onClick={sendMessage}
              
            >
              <IonIcon slot="icon-only" icon={send}></IonIcon>
            </IonButton>
          </IonItem>
        </IonList>
      </IonFooter>
    </IonPage>
  );
};

export default Chatroom_tid;
