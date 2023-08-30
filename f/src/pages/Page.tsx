
import { IonContent, IonPage } from "@ionic/react";
import Appbar from "../components/Appbar/Appbar";
import Feed from "../components/Feed/feed"
import Feedstaff from "./Feedstaff/feedstaff";
import { useParams } from "react-router";
import Appbarstaff from "../components/Appbarstaff/Appbarstaff";
import "./Page.css";
import Post from "./Post/post";
import Contact from "./Contact/contact";
import Chactbot from "./Chatbot/chatbot";
import Chatroom from "./Chatroom/chatroom";
import DriectMessages from "./Driect/driect_message";
import Profileedit from "./Profileedit/profileedit";
import Profile from "./Profile/profile";
import Notification from"./Notification/notification";
import Detail from "./Detail/detail";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const staff = ["โพสต์","ฟีดข่าวแอดมิน","ตอบกลับข้อความ","ข้อมูลส่วนตัว","แก้ไขข้อมูลส่วนตัว","รายละเอียด"];

  return (
    <IonPage>
      {staff.includes(name) ? <Appbarstaff /> : <Appbar />}

      <IonContent fullscreen color="secondary">
        {name === "ฟีดข่าว" && <Feed />}
        {name === "โพสต์" && <Post />}
        {name === "ติดต่อเรา" && <Contact />}
        {name === "แชทตอบอัตโนมัติ" && <Chactbot />}
        {name === "ฝากข้อความ" && <Chatroom />}
        {name === "ตอบกลับข้อความ" && <DriectMessages />}
        {name === "ฟีดข่าวแอดมิน" && <Feedstaff />}
        {name === "ข้อมูลส่วนตัว" && <Profileedit />}
        {name === "แก้ไขข้อมูลส่วนตัว" && <Profile />}
        {name === "แจ้งเตือน" && <Notification />}
        {name === "รายละเอียด" && <Detail />}









      </IonContent>
    </IonPage>
  );
};

export default Page;

