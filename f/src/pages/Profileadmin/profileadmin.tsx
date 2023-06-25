import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonCard,
  IonItem,
  IonInput,
  IonContent,
  IonButton,
  IonSelectOption,
  IonSelect,
  useIonAlert,
} from "@ionic/react";
import Appbarstaff from "../../components/Appbarstaff/Appbarstaff";
import React, { useState } from "react";
import { addCircle } from "ionicons/icons";
import "./profileadmin.css";
import ExploreContainer from "../../components/ExploreContainer";

const Profileadmin: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [handlerMessage, setHandlerMessage] = useState("");
  const [roleMessage, setRoleMessage] = useState("");
  return (
    <IonPage>
      <Appbarstaff />
      <IonContent fullscreen color="secondary">
        <IonFab horizontal="center">
          <IonFabButton className="fabbuttonprofile">
            <IonIcon
              className="fabbuttonprofileicon"
              icon={addCircle}
            ></IonIcon>
          </IonFabButton>
        </IonFab>
        <div className="contentcenter">
          <IonCard
            style={{
              marginTop: "15rem",
              marginLeft: "auto",
              marginRight: "auto",
              width: "80%",
            }}
          >
            <IonItem>
              <IonInput className="heightname" placeholder="ชื่อ"></IonInput>
            </IonItem>
          </IonCard>
        </div>
        <div className="contentcenter">
          <IonCard className="name">
            <IonItem>
              <IonInput placeholder="นามสกุล"></IonInput>
            </IonItem>
          </IonCard>
        </div>
        <IonCard
          style={{
            width: "30%",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "none",
            background: "#F8D874",
          }}
        >
          <IonButton
            className="bn"
            expand="block"
            onClick={() =>
              presentAlert({
                header: "บันทึกใช่หรือไม่!",
                mode: "ios",
                buttons: [
                  {
                    text: "ยกเลิก",
                    role: "cancel",
                  },
                  {
                    text: "บันทึก",
                  },
                ],
              })
            }
          >
            บันทึก
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profileadmin;
