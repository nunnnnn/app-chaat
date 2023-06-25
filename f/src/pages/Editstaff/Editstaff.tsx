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
import { personCircle } from "ionicons/icons";
import "./Editstaff.css";

const Editstaff: React.FC = () => {
  const [presentAlert] = useIonAlert();

  return (
    <IonPage>
      <Appbarstaff />
      <IonContent fullscreen color="secondary">
        <IonFab horizontal="center">
          <IonFabButton className="fabbuttonprofile">
            <IonIcon
              className="fabbuttonprofileicon"
              icon={personCircle}
            ></IonIcon>
          </IonFabButton>
        </IonFab>
        <div style={{ textAlign: "center" }}>
          <h2 className="profilename">นางสาวศศิกาน</h2>
          <h2>ตำแหน่ง :ประธานหลักสูตร</h2>
          <h2>sasi.tt.62@ubu.ac.th</h2>
        </div>
        <IonCard className="buttonedit">
          <IonButton shape="round" className="bte">
            แก้ไข
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default Editstaff;
