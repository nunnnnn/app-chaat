// import { IonContent, IonPage } from "@ionic/react";
// import Appbar from "../components/Appbar/Appbar";
// import Feed from "../components/Feed/feed"
// import Feedstaff from "./Feedstaff/feedstaff";
// import { useParams } from "react-router";
// import ExploreContainer from "../components/ExploreContainer";
// import Appbarstaff from "../components/Appbarstaff/Appbarstaff";
// import "./Page.css";
// import Post from "./Post/post";
// import Contact from "./Contact/contact";
// import Postedit from "./Postedit/postedit";

// const Page: React.FC = () => {
//   const { name } = useParams<{ name: string }>();
//   const staff = ["โพสต์"];

//   return (
//     <IonPage>
//       {staff.includes(name) ? <Appbarstaff /> : <Appbar />}

//       <IonContent fullscreen color="secondary">
//         {name === "ฟีดข่าว" && <Feed />}
//         {name === "ฟีดข่าวแอดมิน" && <Feedstaff />}
//         {name === "โพสต์" && <Post />}
//         {name === "แก้ไขโพสต์" && <Postedit />}
//         {name === "ติดต่อเรา" && <Contact />}
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Page;
import { IonContent, IonPage } from "@ionic/react";
import Appbar from "../components/Appbar/Appbar";
import Feed from "../components/Feed/feed"
import Feedstaff from "./Feedstaff/feedstaff";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import Appbarstaff from "../components/Appbarstaff/Appbarstaff";
import "./Page.css";
import Post from "./Post/post";
import Contact from "./Contact/contact";
import Chactbot from "./Chatbot/chatbot";
import Chatroom from "./Chatroom/chatroom";
import DriectMessages from "./Driect/driect_message";
import Profileedit from "./Profileedit/profileedit";
// import Postedit from "./Postedit/postedit";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const staff = ["โพสต์","ฟีดข่าวแอดมิน","ตอบกลับข้อความ"];

  return (
    <IonPage>
      {staff.includes(name) ? <Appbarstaff /> : <Appbar />}

      <IonContent fullscreen color="secondary">
        {name === "ฟีดข่าว" && <Feed />}
        {name === "ฟีดข่าวแอดมิน" && <Feedstaff />}
        {name === "โพสต์" && <Post />}
        {name === "ติดต่อเรา" && <Contact />}
        {name === "แชทตอบอัตโนมัติ" && <Chactbot />}
        {name === "ฝากข้อความ" && <Chatroom />}
        {name === "ตอบกลับข้อความ" && <DriectMessages />}
        {/* {name === "แก้ไขข้อมูลส่วนตัว" && <Profileedit />} */}




      </IonContent>
    </IonPage>
  );
};

export default Page;

