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
import "./chatroom.css"

const Chatroom: React.FC = () => {
  const history = useHistory();
  const params: any = useParams();
  const [currentUser, setCurrentUser] = useState<any>();
  const socket: any = useRef();
  const setIsBack = useBack((state: any) => state.setIsBack);
  const [messages, setMessages] = useState<any>([]);
  const scrollRef = useRef<HTMLIonContentElement | null>(null);
  const [arrivalMessage, setArrivalMessage] = useState<any>();
  const [admin, setAdmin] = useState("");
  const [present, dismiss] = useIonLoading();

  const [input, setInput] = useState("");

  const scrollToBottom = () => {
    scrollRef.current && scrollRef.current.scrollToBottom();
  };

  const mounted = async () => {
    if (!localStorage.getItem("SID")) {
      history.push("/");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("SID")!));
    }
  };

  const receivedMessage = async () => {
    const data = await JSON.parse(localStorage.getItem("SID")!);
    const response = await API.post(`/messages/getmsg`, {
      from: data._id,
      to: params.param._id,
    });
    if (window.location.pathname.split("/")[1] === "chat_room") {
      console.log('markread')
      response.data.map(async (x: any) => {
        await API.post(`/messages/markread`, { messageId: x.id });
      });
    }
    setMessages(response.data);
    console.log(messages)
  };

  const handleSendMsg = async (msg: any) => {
    getCurrentChat()
    const data = await JSON.parse(localStorage.getItem("SID")!);
    socket.current.emit("send-msg", {
      to: admin,
      from: data._id,
      studentID: data._id,
      msg,
    });
    await API.post(`/messages/addmsg`, {
      from: data._id,
      to: admin,
      studentID: data._id,
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
      console.log(params.param)
    }
  };

  useEffect(() => {
    API.get(`/teacher`).then((response) => {
      console.log(response.data[0]._id);
      setAdmin(response.data[0]._id);
    });
  }, [present, dismiss]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:7000");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg: any) => {
        receivedMessage();
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  });

  useEffect(() => {
    arrivalMessage && setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    receivedMessage();
    mounted();
  }, []);

  useEffect(() => {
    getCurrentChat();
  }, []);

  const backToList = () => {
    setIsBack(true);
    history.goBack();
  };

  return (
    <IonPage>
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
              {params.param
                ? params.param.username
                : "Loading"}{" "}
            Room
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent  fullscreen color="secondary">
        <br />
        {messages.map((message: any) => (
          <IonItem lines="none" key={uuidv4()}>
            <IonChip
              color={message.fromSelf ? "success" : "primary"}
              slot={message.fromSelf ? "end" : "start"}
            >
              {message.fromSelf ? (
                <></>
              ) : (
                <IonAvatar>
                  <img
                    alt=""
                    src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  />
                </IonAvatar>
              )}
              <IonLabel>{message.message}</IonLabel>
              {message.fromSelf ? (
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
        <IonList class="au-form" style={{ borderTop: "1px solid gray" }}>
          <IonItem lines="none">
            <IonInput
              placeholder="Type your message"
              style={{ background: "#f5f5f5" }}
              value={input}
              onIonChange={(e: any) => setInput(e.target.value)}
            ></IonInput>
            <IonButton
              size="default"
              style={{ marginLeft: "0.5rem" }}
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

export default Chatroom;