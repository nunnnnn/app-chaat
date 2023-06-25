import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  peopleOutline,
  // archiveSharp,
  // bookmarkOutline,
  chatbubbleEllipsesOutline,
  // heartSharp,
  home,
  // mailSharp,
  logoWechat,
  // paperPlaneSharp,
  logOutOutline,
  // trashSharp,
  warningOutline,
  warningSharp,
  newspaper,
} from "ionicons/icons";
import "./Menustaff.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "ฟีดข่าว",
    url: "/feedstaff",
    iosIcon: home,
    mdIcon: home,
  },
  {
    title: "โพสต์ ",
    url: "/page/โพสต์",
    iosIcon: newspaper,
    mdIcon: newspaper,
  },

  {
    title: "ออกจากระบบ",
    url: "/page/ออกจากระบบ",
    iosIcon: logOutOutline,
    mdIcon: logOutOutline,
  },
];

// const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>งานรับเข้าศึกษาคณะวิทยาศาสตร์</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        {/* <IonListHeader>ระบบที่เกี่ยวข้อง</IonListHeader>
        <IonList>
          <IonItem
            button
            href="https://reg1.ubu.ac.th/registrar/apphome.asp"
            lines="none"
          >
            <IonLabel>ระบบรับสมัครออนไลน์</IonLabel>
          </IonItem>
          <IonItem
            button
            href="https://reg1.ubu.ac.th/registrar/home.asp"
            lines="none"
          >
            <IonLabel>ระบบทะเบียนนักศึกษา</IonLabel>
          </IonItem>
          <IonItem button href="https://www.ubu.ac.th/" lines="none">
            <IonLabel>ระบบเว็บไซต์มหาวิทยาลัย</IonLabel>
          </IonItem>
        </IonList> */}
        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
