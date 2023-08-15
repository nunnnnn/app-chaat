import {
  IonIcon,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonButton,
  IonToolbar,
  IonButtons,
  useIonAlert,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import { Link, useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { create, ellipse, trash } from "ionicons/icons";
import "./driect_message.css";
import Appbarstaff from "../../components/Appbarstaff/Appbarstaff";
import API from "../../api/useApi";
import { v4 as uuidv4 } from "uuid";

const DriectMessages: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [handlerMessage, setHandlerMessage] = useState("");
  const [roleMessage, setRoleMessage] = useState("");
  const [present, dismiss] = useIonLoading();
  const [IonToast] = useIonToast();

  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [latestChat, setLatestChat] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    API.get("student").then((response) => {
      console.log("users", response.data);
      setUsers(response.data);
    });
  }, [present, dismiss]);

  useEffect(() => {
    API.get("messages/getlatestmsg").then((response) => {
      console.log("message", response.data);
      setLatestChat(response.data);
    });
  }, [present, dismiss]);

  const viewChat = (sid: string) => {
    history.push(`/Chatroomtid/${sid}`);
  };

  return (
    <IonPage>
      <Appbarstaff />
      <IonContent fullscreen color="secondary">
        {latestChat.map((chat: any) => (
          <IonCard key={uuidv4()} style={{ cursor: "pointer" }} onClick={() => viewChat(chat._id)}>
            {users.map((user: any) => (
              <div key={uuidv4()}>
                {user._id == chat.users[0] && (
                  <div>
                    <IonCardHeader style={{ backgroundColor: '#F6F1E9' }}>
                      <IonCardTitle className="texttitle">
                        <div style={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>
                          <img
                            alt="Profile image {user.name}"
                            src={user.avatar}
                            style={{
                              height: "40px",
                              width: "40px",
                              objectFit: "cover",
                              marginRight: "8px"
                            }}
                          />
                          {user.name} { chat.isRead == false ? <IonIcon style={{color: '#7AA874'}} icon={ellipse}></IonIcon> : ''}
                        </div>
                      </IonCardTitle>
                      <IonCardContent style={{ fontSize: "1rem" }}>
                        {chat.message.text.length > 40 ? 'ส่งข้อความถึงคุณ': chat.message.text}
                      </IonCardContent>
                    </IonCardHeader>
                  </div>
                )}
              </div>
            ))}
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};
export default DriectMessages;
