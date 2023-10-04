import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  useIonLoading,
  IonLoading,
  useIonToast,
  

} from "@ionic/react";
import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import "./feed.css";
import API from "../../api/useApi";

const Feed: React.FC = () => {
  // const [post, setPost] = useState([]);
  const [IonToast]=useIonToast ();
  const history = useHistory();
  const [present, dismiss] = useIonLoading();
  const [showLoading, setShowLoading] = useState(false);
  const [cards, setCards] = useState<any[]>([]);


  useEffect(() => {
    setShowLoading(true);
    API.get("/post").then((response) => {
      setCards(response.data);
      viwePost()
      setShowLoading(false);
    });
  }, [present, dismiss]);

const viewDetail = (id: string) => {
    history.push(`/detail/${id}`);
  };
const viwePost = async () => {
    await API.get("/post").then((response)=>{
      setCards(response.data);
    });
  }
  return (
    <div>
      <IonLoading
        isOpen={showLoading}
        spinner="crescent"
        message={"กำลังโหลดกิจกรรม"}
      />
      {cards &&
        cards
          .slice(0)
          .reverse()
          .map((card: any, index) => (
            
            <IonCard key={index}>
              <img
                alt="Silhouette of mountains"
                src={card.image}
                style={{
                  height: 200,
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              
              <IonCardHeader onClick={() => viewDetail(card._id)}  >
                <IonCardTitle className="texttitle">หัวข้อเรื่อง: {card.title}</IonCardTitle>
                <IonCardSubtitle style={{ fontSize: "1rem" }}>
                  สาขา: {card.branch}
                </IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
            
          ))}
    </div>
  );
};
export default Feed;
