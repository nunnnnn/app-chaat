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
  useIonLoading
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

  const [post, setPost] =  useState<any[]>([]);
  // const [postID, setPostID] = useState({
  //   image: "",
  //   title: "",
  //   branch: "",
  //   attach_link:"",
  //   detail: "",
  // });

  // const [data,setData] = useState <any>();
  const history = useHistory();
  // const {} = useParams();
  useEffect(() => {
    API.get("/post").then((response) => {
      // setPost(
      //   response.data.filter(
      //     (v: any) =>
      //       v.teacher_id === JSON.parse(String(localStorage.getItem("TID")))._id
      //   )
      // );
      setPost(response.data);
    });
  }, [present, dismiss]);

  const viewDetail = (id: string) => {
    history.push(`/detail/${id}`);
  };

  const editpost  = (id: string)=> {
    history.push(`/page/แก้ไขโพสต์/${id}`);
    console.log('Edit post:', post);
  }

  // const editpost  = (post: any)=> {
  //   history.push(`/page/แก้ไขโพสต์/`);
  //   console.log('Edit post:', post);
  // }

  // const handleChange = (event: any) => {
  //   setPostID({ ...postID, [event.target.name]: event.target.value });
  // };

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
                              handler: () => console.log("Delete clicked"),
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

