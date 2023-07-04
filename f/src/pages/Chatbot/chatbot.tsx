import {
  IonIcon,
  IonPage,
  IonContent,
  IonFooter,
  IonCard,
  IonRow,
  IonCol,
} from "@ionic/react";
import Appbar from "../../components/Appbar/Appbar";
import React, { useState, useRef, useEffect } from "react";
import "./chatbot.css";
import axios from "axios";

const suggestions = [
  "เกี่ยวกับmytcasc",
  "กฎ",
  "หอพักหอใน",
  "ปริญญาตรีมีกี่สาขา",
];

const Chactbot: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);
  const [details, setDetails] = useState<any>([]);
  const [token, setToken] = useState("");
  const project_id = "chatbot-ubu-science-entry-xpri";
  const session_id = "xxsw555";
  const msg = useRef<HTMLInputElement | null>(null);

  const send = () => {
    if (msg.current?.value) {
      const text = msg.current?.value;
      msg.current.value = "";
      setMessages((prev: any) => [
        ...prev,
        { messages: text, name: "me", time: new Date(), fromself: "end" },
      ]);
      const payload = {
        query_input: {
          text: {
            text: text,
            language_code: "th-TH",
          },
        },
      };
      // setDetails([]);
      axios
        .post(
          `https://dialogflow.googleapis.com/v2/projects/${project_id}/agent/sessions/${session_id}:detectIntent`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-goog-user-project": project_id,
              "Content-Type": "application/json; charset=utf-8",
            },
          }
        )
        .then((res: any) => {
          setMessages((prev: any) => [
            ...prev,
            {
              messages: res.data.queryResult.fulfillmentText,
              name: "bot",
              time: new Date(),
              fromself: "start",
            },
          ]);

          for (const item of res.data.queryResult.fulfillmentMessages) {
            if (item.payload && Array.isArray(item.payload.richContent)) {
              console.log("payload", item.payload.richContent);
              var payloadContent = item.payload.richContent;
            } else {
              continue;
            }
          }
          // console.log(payload)

          setDetails((prev: any) => [
            ...prev,
            // res.data.queryResult.fulfillmentMessages[1].payload.richContent
            payloadContent,
          ]);
          // console.log(res.data.queryResult.fulfillmentMessages[0].payload.richContent);
        });
    }
  };

  console.log("deeet", details);

  useEffect(() => {
    axios
      .get("http://20.239.188.252:7500/google_auth")
      .then((res: any) => setToken(res.data.token));
  }, [token]);

  return (
    <IonPage>
      <Appbar />
      <IonContent fullscreen color="secondary">
        {messages.map((mes: any, index: number) => (
          <div className={`chat chat-${mes.fromself}`} key={index}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://placeimg.com/192/192/people" /> {/*ไม่มีรูปในเว็บ */}
              </div>
            </div>

            <div className="chat-header">
              {mes.name}
              <time className="text-xs opacity-50"></time>
            </div>

            <div className="chat-bubble">
              {mes.messages}

              {mes.name == "bot" ? (
                <div>
                  {details.map((det: any, indexx: number) => (
                    <div className="link-wrapper  " key={indexx}>
                      {det.map((detai: any, indexxx: number) => (
                        <div className="link-wrapper  " key={indexxx}>
                          {detai.map((detail: any, indexxxx: number) => (
                            <div className="link-wrapper  " key={indexxxx}>
                              <IonCard href={detail.actionLink} target="_blank">
                                <IonRow>
                                  <IonCol className="">
                                    <img
                                      src={detail.image?.src?.rawUrl || ""}
                                    />
                                  </IonCol>
                                  <IonCol className="title">
                                    {detail.title}
                                  </IonCol>
                                </IonRow>
                                <IonRow>
                                  <IonCol className="subtitle">
                                    {detail.subtitle}
                                  </IonCol>
                                </IonRow>
                              </IonCard>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (<div></div>) }

              <div>
                {/* <IonCard href="https://www.mytcas.com/" >
                <IonRow>
                  <IonCol className=""><img src="https://placeimg.com/192/192/people" /></IonCol>
                  <IonCol className="title">หัวข้อเรื่ิองงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงง</IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="subtitle">เนื้อเรื่องงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงงง</IonCol>
                </IonRow>
              </IonCard> */}
              </div>
            </div>

            {/* <div className="chat-footer opacity-50">Delivered</div> */}
          </div>
        ))}
      </IonContent>
      <IonFooter>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            overflowX: "scroll",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-btn"
              onClick={(e) =>
                msg.current ? (msg.current.value = suggestion) : ""
              }
            >
              {suggestion}
            </div>
          ))}
        </div>
        <div className="form-control">
          <div className="input-group">
            <input
              ref={msg}
              type="text"
              style={{
                backgroundColor: "#F1F1F1",
                width: "100%",
                borderRadius: "0rem",
              }}
              placeholder="ถามอะไรตอบได้..."
              className="input input-bordered"
            />
            <button
              className="btn btn-square"
              onClick={send}
              style={{ borderRadius: "0rem" }}
            >
              <IonIcon
                size="large"
                color="light"
                icon="navigate-circle"
              ></IonIcon>
            </button>
          </div>
        </div>
      </IonFooter>
    </IonPage>
  );
};
export default Chactbot;
