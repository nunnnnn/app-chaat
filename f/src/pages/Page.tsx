import { IonContent, IonPage } from "@ionic/react";
import Appbar from "../components/Appbar/Appbar";
// import Feed from "../components/Feed/feed";
import Feed from "../components/Feed/feed"
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import Appbarstaff from "../components/Appbarstaff/Appbarstaff";
import "./Page.css";
import Post from "./Post/post";
import Contact from "./Contact/contact";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const staff = ["โพสต์"];

  return (
    <IonPage>
      {staff.includes(name) ? <Appbarstaff /> : <Appbar />}

      <IonContent fullscreen color="secondary">
        {name === "ฟีดข่าว" && <Feed />}
        {name === "โพสต์" && <Post />}
        {name === "ติดต่อเรา" && <Contact />}
      </IonContent>
    </IonPage>
  );
};

export default Page;
