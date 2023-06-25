// import {
//   IonFab,
//   IonFabButton,
//   IonIcon,
//   IonPage,
//   IonCard,
//   IonCardContent,
//   IonCardHeader,
//   IonCardSubtitle,
//   IonCardTitle,
//   IonContent,
//   IonButton,
//   IonToolbar,
//   IonButtons,
//   IonTitle,
//   useIonAlert,
// } from "@ionic/react";
// import React, { useEffect, useState } from "react";
// import { pencil, trash } from "ionicons/icons";
// import "./feedstaff.css";
// import Appbarstaff from "../../components/Appbarstaff/Appbarstaff";
// import API from "../../api/useApi";

// const Feedstaff: React.FC = () => {
//   const [presentAlert] = useIonAlert();
//   const [handlerMessage, setHandlerMessage] = useState("");
//   const [roleMessage, setRoleMessage] = useState("");

//   const [post, setPost] = useState([]);

//   useEffect(() => {
//     API.get("/post").then((response) => {
//       setPost(
//         response.data.filter(
//           (v: any) =>
//             v.teacher_id === JSON.parse(String(localStorage.getItem("TID")))._id
//         )
//       );
//     });
//   }, []);

//   return (
//     <IonPage>
//       <Appbarstaff />
//       <IonContent fullscreen color="secondary">
//         {post &&
//           post.map((item: any) => (
//             <IonCard>
//               <img
//                 alt="Silhouette of mountains"
//                 src={item.image}
//                 style={{ height: "60vmin" }}
//               />
//               <IonCardHeader>
//                 <IonCardTitle>หัวข้อเรื่อง: {item.title}</IonCardTitle>
//                 <IonCardTitle>สาขา: {item.branch}</IonCardTitle>
//               </IonCardHeader>

//               <IonCardContent>
//                 <IonToolbar mode="md">
//                   <IonButtons slot="secondary">
//                     <IonButton className="color">
//                       <IonIcon
//                         slot="icon-only"
//                         style={{ color: "#364AAF" }}
//                         icon={pencil}></IonIcon>
//                     </IonButton>
//                   </IonButtons>
//                   <IonButtons slot="primary">
//                     <IonButton
//                       className="color"
//                       onClick={() =>
//                         presentAlert({
//                           header: "ลบใช่หรือไม่!",
//                           buttons: [
//                             {
//                               text: "ยกเลิก",
//                               role: "cancel",
//                               handler: () => {
//                                 setHandlerMessage("Alert canceled");
//                               },
//                             },
//                             {
//                               text: "ลบ",
//                               role: "confirm",
//                               handler: () => {
//                                 setHandlerMessage("Alert confirmed");
//                               },
//                             },
//                           ],
//                           onDidDismiss: (e: CustomEvent) =>
//                             setRoleMessage(
//                               `Dismissed with role: ${e.detail.role}`
//                             ),
//                         })
//                       }>
//                       <IonIcon
//                         slot="icon-only"
//                         style={{ color: "red" }}
//                         icon={trash}></IonIcon>
//                     </IonButton>
//                   </IonButtons>
//                 </IonToolbar>
//               </IonCardContent>
//             </IonCard>
//           ))}
//       </IonContent>
//     </IonPage>
//   );
// };
// export default Feedstaff;

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
} from "@ionic/react";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { pencil, trash } from "ionicons/icons";
import "./feedstaff.css";
import Appbarstaff from "../../components/Appbarstaff/Appbarstaff";
import API from "../../api/useApi";

const Feedstaff: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [handlerMessage, setHandlerMessage] = useState("");
  const [roleMessage, setRoleMessage] = useState("");
  const [post, setPost] = useState([]);
  const [data,setData] = useState <any>();
  // const {} = useParams();

  useEffect(() => {
    API.get("/post").then((response) => {
      setPost(
        response.data.filter(
          (v: any) =>
            v.teacher_id === JSON.parse(String(localStorage.getItem("TID")))._id
        )
      );
    });
  }, []);

  // const click = async(event:any) => {
  //   if (localStorage.getItem("TID")) {
  //     const id = JSON.parse(localStorage.getItem("TID")!)._id;
  //     API.get(`/post/${id}`).then((response) => {
  //       setData(response.data);
  //     });
  //   }
  //   console.log('Card clicked')

  // };

  return (
    <IonPage>
      <Appbarstaff />
      <IonContent fullscreen color="secondary">
        {post &&
          post.map((item: any) => (
            <IonCard  >
              <div >
              <img
                alt="Silhouette of mountains"
                src={item.image}
                style={{ height: "60vmin" }}
              />
              <IonCardHeader>
                <IonCardTitle>หัวข้อเรื่อง: {item.title}</IonCardTitle>
                <IonCardTitle>สาขา: {item.branch}</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <IonToolbar mode="md">
                  <IonButtons slot="secondary"  >
                    <IonButton className="color">
                      <IonIcon
                        slot="icon-only"
                        style={{ color: "#364AAF" }}
                        icon={pencil}
                      ></IonIcon>
                    </IonButton>
                  </IonButtons>
                  <IonButtons slot="primary">
                    <IonButton
                      className="color"
                      onClick={() =>
                        presentAlert({
                          header: "ลบใช่หรือไม่!",
                          buttons: [
                            {
                              text: "ยกเลิก",
                              role: "cancel",
                              handler: () => {
                                setHandlerMessage("Alert canceled");
                              },
                            },
                            {
                              text: "ลบ",
                              role: "confirm",
                              handler: () => {
                                setHandlerMessage("Alert confirmed");
                              },
                            },
                          ],
                          onDidDismiss: (e: CustomEvent) =>
                            setRoleMessage(
                              `Dismissed with role: ${e.detail.role}`
                            ),
                        })
                      }
                    >
                      <IonIcon
                        slot="icon-only"
                        style={{ color: "red" }}
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

