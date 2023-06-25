import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";
import LoginPage from "./pages/Login/login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Profile from "./pages/Profile/profile";
import Profileedit from "./pages/Profileedit/profileedit";
import Notification from "./pages/Notification/notification";
import Profilestaff from "./pages/Profilestaff/profilestaff";
import Editstaff from "./pages/Editstaff/Editstaff";
import Editfeed from "./pages/Editfeed/editfeed";
import Menustaff from "./components/Menustaff/Menustaff";
import Chatbot from "./pages/Chatbot/chatbot";
import Chatroom from "./pages/Chatroom/chatroom"
import Post from "./pages/Post/post";
import Regis from "./pages/Regis/regis";
import Contact from "./pages/Contact/contact";
import Feedstaff from "./pages/Feedstaff/feedstaff";
import Profileadmin from "./pages/Profileadmin/profileadmin";
import Editadmin from "./pages/Editadmin/editadmin";
import Detail from "./pages/Detail/detail";
import Chatcontroller from "./pages/ChatController/chatController";
import Feed from "./components/Feed/feed";
import Appbar from"./components/Appbar/Appbar";
setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main" mode="ios">
            <Route path="/" exact={true}>
              <Redirect to="/Login" />
            </Route>
            <Route path="/page/:name">
              <Page />
            </Route>
            <Route path="/Login">
              <LoginPage />
            </Route>
            <Route path="/Profile" exact={true}>
              <Profile />
            </Route>
            <Route path="/Notification/" exact={true}>
              <Notification />
            </Route>
            <Route path="/Profilestaff" exact={true}>
              <Profilestaff />
            </Route>
            <Route path="/Chatbot" exact={true}>
              <Chatbot />
            </Route>
            <Route path="/Chatcontroller" exact={true}>
              <Chatcontroller />
            </Route>
            <Route path="/Post" exact={true}>
              <Post />
            </Route>
            <Route path="/Regis" exact={true}>
              <Regis />
            </Route>
            <Route path="/Profileedit" exact={true}>
              <Profileedit />
            </Route>
            <Route path="/Contact" exact={true}>
              <Contact />
            </Route>
            <Route path="/Feedstaff/" exact={true}>
              <Feedstaff />
            </Route>
            <Route path="/Editfeed/:id" exact={true}>
              <Editfeed />
            </Route>
            <Route path="/Editstaff/:id" exact={true}>
              <Editstaff />
            </Route>
            <Route path="/Profileadmin" exact={true}>
              <Profileadmin />
            </Route>
            <Route path="/Editadmin" exact={true}>
              <Editadmin />
              </Route>
            <Route path="/Feed" exact={true} >
              <Feed />
            </Route>
            <Route path="/Detail/:id" exact={true} >
              <Detail />
            </Route>
            <Route path="/Chatroom" exact={true}>
              <Chatroom />
            </Route>
            <Route path="/Appbar" exact={true}>
              <Chatroom />
            </Route>
            {/* <Route path="ChatController" exact={true}>
              <ChatController />
            </Route> */}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;