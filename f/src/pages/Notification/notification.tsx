
import {
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonLoading,
  useIonLoading,
} from "@ionic/react";
import Appbar from "../../components/Appbar/Appbar";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./notification.css";
import API from "../../api/useApi";

const Notification: React.FC = () => {
  const [post, setPost] = useState([]);
  const [present, dismiss] = useIonLoading();
  const [showLoading, setShowLoading] = useState(false);
  const history = useHistory();
  // const [cards, setCards] = useState<any[]>([]);


  const viewDetail = (id: string) => {
    history.push(`/detail/${id}`);
  };
  useEffect(() => {
    setShowLoading(true);
    const id = JSON.parse(localStorage.getItem("SID")!)._id;
    API.get(`/student/${id}`).then((res) => {
      API.get("/post").then((response) => {
        const data = response.data.filter(
          (item: any) => item.branch === res.data.branch
        );
        setPost(data);
        setShowLoading(false);
      });
    });
  }, [present, dismiss]);

  return (
    <IonPage>
      <Appbar />
      <IonContent fullscreen color="secondary">
        <div>
          <IonLoading
            isOpen={showLoading}
            spinner="crescent"
            message={"กำลังโหลดกิจกรรม"}
          />
          {post &&
            post
              .slice(0)
              .reverse()
              .map((item: any, index) => (
                <IonCard key={index}>
                  <img
                    alt="Silhouette of mountains"
                    src={item.image}
                    style={{
                      height: 200,
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <IonCardHeader onClick={() => viewDetail(item._id)} >
                    <IonCardTitle>หัวข้อเรื่อง: {item.title}</IonCardTitle>
                    <IonCardSubtitle style={{ fontSize: "1rem" }}>
                      สาขา: {item.branch}
                    </IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              ))}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Notification;