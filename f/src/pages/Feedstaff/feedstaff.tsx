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
  IonLoading,
  useIonToast,
} from "@ionic/react";
import { useHistory, } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { create, trash } from "ionicons/icons";
import "./feedstaff.css";
import Appbarstaff from "../../components/Appbarstaff/Appbarstaff";
import API from "../../api/useApi";

const Feedstaff: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [handlerMessage, setHandlerMessage] = useState("");
  const [roleMessage, setRoleMessage] = useState("");
  const [present, dismiss] = useIonLoading();
  const [IonToast] = useIonToast();
  const [post, setPost] =  useState<any[]>([]);
  const history = useHistory();
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [cards, setCards] = useState<any[]>([]);


  // useEffect(() => {
  //   API.get("/post").then((response) => {
  //     setPost(response.data);
  //   });
  // }, [present, dismiss]);

  // useEffect(() => {
  //   setLoadingPosts(true); // Start loading posts
  //   API.get("/post")
  //     .then((response) => {
  //       setPost(response.data);
  //     })
  //     .finally(() => {
  //       setLoadingPosts(false); // Finish loading posts
  //     });
  // }, []);

  useEffect(() => {
    setShowLoading(true);
    API.get("/post").then((response) => {
      setCards(response.data);
      setShowLoading(false);
    });
  }, [present, dismiss]);

  const viewDetail = (id: string) => {
    history.push(`/detail/${id}`);
  };

  const editpost  = (id: string)=> {
    history.push(`/แก้ไขโพสต์/${id}`);
    console.log('Edit post:', post);
  }
  const deletepost =(postId: string) =>{
    present({
      message: "กำลังลบโพสต์...",
      spinner: "crescent",
    });
    API.delete(`/post/${postId}`).then((response) => {
      dismiss();
      console.log("Post deleted:", postId);
      setPost((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    }).catch((error) => {
      console.error("Error deleting post:", error);
    });
  };



  return (

    <IonPage>
      <IonLoading
        isOpen={showLoading}
        spinner="crescent"
        message={"กำลังโหลดกิจกรรม"}
      />
      <Appbarstaff />
      <IonContent fullscreen color="secondary">
     
        {cards &&
          cards  
          .slice(0)
          .reverse().map((cards: any,index) => (
            <IonCard  key={index} >
              <div >
              <img
                alt="Silhouette of mountains"
                src={cards.image}
                style={{height: "100%",width: "100%" }}
              />
              <IonCardHeader onClick={() => viewDetail(cards._id)}>
                <IonCardTitle className="texttitle">หัวข้อเรื่อง: {cards.title}</IonCardTitle>
                <IonCardTitle style={{ fontSize: "1rem" }}>สาขา: {cards.branch}</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonToolbar mode="md">
                  <IonButtons className="size"slot="secondary" onClick={() =>
                        presentAlert({
                          cssClass: "my-css",
                          header: "การยืนยัน",
                          message: "คุณแน่ใจหรือไม่ว่าต้องการแก้ไขโพสต์นี้?",
                          buttons: [
                            {
                              text: "ยกเลิก",
                              role: "cancel",
                            },
                            {
                              text: "แก้ไข",
                              handler: () => editpost(cards._id), // Call the deletePost function with the post ID

                            },
                          ],
                        })
                      }   
               >
                    <IonButton style={{ background:"none"}}>
                      <IonIcon
                        slot="icon-only"
                        style={{  }}
                        icon={create}
                      ></IonIcon>
                    </IonButton>
                  </IonButtons>
                  <IonButtons className="size" slot="primary">
                    <IonButton style={{ background:"none"}}
                       onClick={() =>
                        presentAlert({
                          cssClass: "my-css",
                          header: "การยืนยัน",
                          message: "คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้?",
                          buttons: [
                            {
                              text: "ยกเลิก",
                              role: "cancel",
                            },
                            {
                              text: "ลบ",
                              handler: () => deletepost(cards._id), // Call the deletePost function with the post ID

                            },
                          ],
                        })
                      }
                    >
                      <IonIcon
                        slot="icon-only"
                        // className="size"
                        style={{ background:"none"}}
                        icon={trash}
                      ></IonIcon>
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonCardContent>
              </div>
            </IonCard>
          ))}
      </IonContent>
    </IonPage>
  );
};
export default Feedstaff;

