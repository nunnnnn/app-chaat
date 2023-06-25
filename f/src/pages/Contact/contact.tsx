import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
} from "@ionic/react";
import {
  home,
  call,
  logoWhatsapp,
  mailOpen,
  logoFacebook,
} from "ionicons/icons";
import Appbar from "../../components/Appbar/Appbar";
import React, { useState } from "react";
import "./contact.css";
import Linelogo from "../../assets/line-svgrepo-com.svg";

const Contact: React.FC = () => {
  return (
    <IonPage>
      <Appbar />
      <IonContent fullscreen color="secondary">
        <div className="frame">
          &nbsp; <IonIcon icon={home}></IonIcon>
          &nbsp; ที่อยู่:งานรับเข้างานศึกษา กองบริการศึกษามหาวิทยาลัยอุบลราชธานี
          85 ต.เมืองศรีไค อ.วารินชำราบ จ.อุบลราชธานี 34190
          อาคารสำนักงานอธิการบดี(หลังเก่า) ชั้น 1
          <br />
          &nbsp; <IonIcon icon={call}></IonIcon>
          &nbsp; โทรศัพท์ 045-353120, 045-353122, 045-353223, 045-353224
          <br />
          &nbsp; <IonIcon icon={logoWhatsapp}></IonIcon>
          &nbsp; โทรสาร 045-353119
          <br />
          &nbsp; <IonIcon icon={mailOpen}></IonIcon>
          &nbsp; entry.ubu@gmail.com
          <br />
          &nbsp; <IonIcon icon={logoFacebook}></IonIcon>
          &nbsp; UBUEntryOfficial
          <br />
          &nbsp; <IonIcon icon={Linelogo}></IonIcon>
          &nbsp; @hcs9340l
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Contact;
