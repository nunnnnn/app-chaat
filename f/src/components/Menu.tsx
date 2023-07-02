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
import {
  home,
  chatbubbleEllipses,
  people,
  logoWechat,
  logOut,
  newspaper,
  homeOutline,
} from "ionicons/icons";
import { useLocation, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Menu.css";
import API from "../api/useApi";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const teacherPages: AppPage[] = [
  {
    title: "ฟีดข่าว",
    url: "/page/ฟีดข่าวแอดมิน",
    iosIcon: home,
    mdIcon: home,
  },
  {
    title: "ตอบกลับข้อความ ",
    url: "/page/ตอบกลับข้อความ",
    iosIcon: chatbubbleEllipses,
    mdIcon: chatbubbleEllipses,
  },
  {
    title: "โพสต์ ",
    url: "/page/โพสต์",
    iosIcon: newspaper,
    mdIcon: newspaper,
  },
];

const studentPages: AppPage[] = [
  {
    title: "ฟีดข่าว",
    url: "/page/ฟีดข่าว",
    iosIcon: home,
    mdIcon: home,
  },
  {
    title: "ฝากข้อความ ",
    url: "/page/ฝากข้อความ",
    iosIcon: chatbubbleEllipses,
    mdIcon: chatbubbleEllipses,
  },
  {
    title: "แชทตอบอัตโนมัติ",
    url: "/Chatbot",
    iosIcon: logoWechat,
    mdIcon: logoWechat,
  },
  {
    title: "ติดต่อเรา",
    url: "/page/ติดต่อเรา",
    iosIcon: people,
    mdIcon: people,
  },
];

// const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [user, setUser] = useState<any>();
  const [menu, setMenu] = useState<AppPage[]>();

  const logout = () => {
    localStorage.removeItem("TID");
    localStorage.removeItem("SID");
    history.push("/login");
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname.includes("page")) {
      if (localStorage.getItem("SID")) {
        setUser(JSON.parse(String(localStorage.getItem("SID"))));
        setMenu(studentPages);
        return;
      } else if (localStorage.getItem("TID")) {
        setUser(JSON.parse(String(localStorage.getItem("TID"))));
        setMenu(teacherPages);
      }
    }
  }, [location.pathname]);

  return (
    <IonMenu  contentId="main" type="overlay" >
      <IonContent>
        <IonList id="inbox-list" >
          <IonListHeader >งานรับเข้าศึกษาคณะวิทยาศาสตร์</IonListHeader>
          <IonNote>ผู้ใช้ : {user && user.email}</IonNote>
          {menu &&
            menu.map((appPage, index) => {
              return (
                <IonMenuToggle  key={index} autoHide={false}>
                  <IonItem
                    className={
                      location.pathname === appPage.url ? "selected" : ""
                    }
                    routerLink={appPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}>
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
          <IonMenuToggle autoHide={false}>
            <IonItem lines="none" detail={false} onClick={logout}>
              <IonIcon slot="start" ios={logOut} md={logOut} />
              <IonLabel>ออกจากระบบ</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <IonListHeader>ระบบที่เกี่ยวข้อง</IonListHeader>
        <IonList>
          <IonItem
            button
            href="https://reg1.ubu.ac.th/registrar/apphome.asp"
            lines="none">
            <IonLabel>ระบบรับสมัครออนไลน์</IonLabel>
          </IonItem>
          <IonItem
            button
            href="https://reg1.ubu.ac.th/registrar/home.asp"
            lines="none">
            <IonLabel>ระบบทะเบียนนักศึกษา</IonLabel>
          </IonItem>
          <IonItem button href="https://www.ubu.ac.th/" lines="none">
            <IonLabel>ระบบเว็บไซต์มหาวิทยาลัย</IonLabel>
          </IonItem>
        </IonList>
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
