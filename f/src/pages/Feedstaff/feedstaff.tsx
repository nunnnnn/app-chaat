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
  useIonToast
} from "@ionic/react";
import { Link, useHistory, useParams } from "react-router-dom";
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
  useEffect(() => {
    API.get("/post").then((response) => {
      setPost(response.data);
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
      <Appbarstaff />
      <IonContent fullscreen color="secondary">
        {post &&
          post  
          .slice(0)
          .reverse().map((post: any) => (
            <IonCard key={post.id} >
              <div >
              <img
                alt="Silhouette of mountains"
                src={post.image}
                style={{height: "100%",width: "100%" }}
              />
              <IonCardHeader onClick={() => viewDetail(post._id)}>
                <IonCardTitle className="texttitle">หัวข้อเรื่อง: {post.title}</IonCardTitle>
                <IonCardTitle style={{ fontSize: "1rem" }}>สาขา: {post.branch}</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonToolbar mode="md">
                  <IonButtons className="size"slot="secondary" onClick={() => editpost (post._id)} >
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
                              handler: () => deletepost(post._id), // Call the deletePost function with the post ID

                            },
                          ],
                        })
                      }
                      // onClick={() => handleDeletePost(postId.id)}
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

