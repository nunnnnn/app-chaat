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
} from "@ionic/react";
import React, { useState } from "react";
import "./Appbarstaff.css";
import { useParams } from "react-router";

const Appbarstaff: React.FC = () => {
  const { name } = useParams<{ name: string }>();


  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonFab horizontal="end">
          <IonRow>
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

export default Appbarstaff;
