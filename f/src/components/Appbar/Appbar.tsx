// import {
//   IonFab,
//   IonFabButton,
//   IonHeader,
//   IonIcon,
//   IonToolbar,
//   IonRow,
//   IonButtons,
//   IonMenuButton,
//   IonTitle,
// } from "@ionic/react";
// import React, { useState } from "react";
// // import { personCircleOutline } from "ionicons/icons";
// import "./Appbar.css";
// import { useParams } from "react-router";

// const Profile: React.FC = () => {
//   const { name } = useParams<{ name: string }>();

//   return (
//     <IonHeader>
//       <IonToolbar color="primary">
//         <IonFab horizontal="end">
//           <IonRow>
//             <IonFabButton className="fabbutton" routerLink="/Notification">
//               <IonIcon color="light" icon="notifications-circle"></IonIcon>
//             </IonFabButton>
//             <IonFabButton className="fabbutton" routerLink="/Profileedit">
//               <IonIcon color="light" icon="person-circle"></IonIcon>
//             </IonFabButton>
//           </IonRow>
//         </IonFab>
//         <IonButtons slot="start">
//           <IonMenuButton
//             style={{ width: "3rem", backgroundColor: "#121258" }}
//           />
//         </IonButtons>
//         <IonTitle>{name}</IonTitle>
//       </IonToolbar>
//     </IonHeader>
//   );
// };

// export default Profile;

import {
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonToolbar,
  IonRow,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonBadge,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
// import { personCircleOutline } from "ionicons/icons";
import "./Appbar.css";
import { useParams } from "react-router";
import API from "../../api/useApi";

const Profile: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("SID")) return;
    const id = JSON.parse(localStorage.getItem("SID")!)._id;
    API.get(`/student/${id}`).then((res) => {
      API.get("/post").then((response) => {
        const data = response.data.filter(
          (item: any) => item.branch === res.data.branch
        );

        setCount(data.length);
      });
    });
  }, []);

  return (
    <IonHeader>
      <IonToolbar  color="primary">
        <IonFab horizontal="end">
          <IonRow>
            <IonFabButton className="fabbutton" routerLink="/page/Notification">
              <IonBadge color="danger">{count > 0 ? count : null}</IonBadge>
              <IonIcon color="light" icon="notifications-circle"></IonIcon>
            </IonFabButton>
            <IonFabButton className="fabbutton" href="/page/ข้อมูลส่วนตัว">
              <IonIcon color="light" icon="person-circle"></IonIcon>
            </IonFabButton>
          </IonRow>
        </IonFab>
        <IonButtons slot="start">
          <IonMenuButton
            style={{ width: "3rem", backgroundColor: "#121258" }}
          />
        </IonButtons>
        <IonTitle>{name}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Profile;
