import {
  IonPage,
  IonContent,
  IonRow,
  IonGrid,
  IonCol,

} from "@ionic/react";
import Appbar from "../../components/Appbar/Appbar";
import React, { useEffect, useState } from "react";
import "./detail.css";
import API from "../../api/useApi";
import { useParams } from "react-router";
import dayjs from "dayjs";
import "dayjs/locale/th";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cards, setCards] = useState<any>({
    image: "",
    title: "",
    branch: "",
    detail: "",
    attach_link:"",
    teacher_id: "",
    create_at: ""as any,
  });
  const formattedDate = dayjs(cards.create_at).locale("th").format("DD/MM/YYYY HH:mm");

  useEffect(() =>{
      API.get(`/post/${id}`).then((response) => {
        setCards(response.data);
        
      });
      
  },[id]);

  return (
    <IonPage>
      <Appbar />
      <IonContent fullscreen color="secondary">
        <div className="frame" >
        <h3 className="text" >รายละเอียด  </h3>
         
       <img
                alt="Silhouette of mountains"
                src={ cards.image}
                className="image"
                // style={{width:"100% ",height: "auto",display:"flex"}}
              />
              { cards&& (
               <div className="superimposed" >
                <IonRow>
                <IonCol className="long"><h5 > หัวข้อเรื่อง:</h5></IonCol>
                <IonCol><h5 >{cards.title}</h5></IonCol>
                </IonRow>
                <IonRow >
                <IonCol className="long"><h5 > สาขา :</h5></IonCol>
                <IonCol ><h5 >{cards.branch}</h5></IonCol>
                </IonRow>
                <IonRow>
                <IonCol className="long"><h5 >รายละเอียด :</h5></IonCol>
                <IonCol><h5 >{cards.detail}</h5></IonCol>
                </IonRow>
                <IonRow>
                <IonCol className="long"><h5>ลิ้งค์ :</h5></IonCol>
                <IonCol>
                  <h5>
                  <a href={cards.attach_link} target="_blank" rel="noopener noreferrer">
                          {cards.attach_link}
                  </a>
                  </h5>
                </IonCol>
                </IonRow>         
              
                <IonGrid>
                 <div className="low">
                <IonRow>
                  <IonCol><h6>ประกาศโดย:แอดมิน </h6></IonCol>
                  <IonCol><h6>วันที่:{formattedDate}</h6></IonCol>
                </IonRow>
                </div>
                </IonGrid>

              </div>
)}
              </div>
             
      </IonContent>
    </IonPage>
  );
};
export default Detail;