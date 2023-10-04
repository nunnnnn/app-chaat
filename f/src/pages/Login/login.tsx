import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonCard,
  IonButton,
  useIonLoading,
  useIonToast,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./login.css";
import API from "../../api/useApi";
import Logo from"../../assets/sci.png"

const LoginPage: React.FC = () => {
  const [present, dismiss] = useIonLoading();
  const [IonToast] = useIonToast();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const showToast = (message: any) => {
    IonToast({
      message: message,
      duration: 1500,
      position: "bottom",
      mode: "ios",
    });
  };

  useEffect(() => {
    if (localStorage.getItem("SID") || localStorage.getItem("TID")) {
      history.push("/page/ฟีดข่าว");
    }
  }, []);


  const handleEmailChange = (event: CustomEvent) => {
    setEmail(event.detail.value);
  };

  const handlePasswordChange = (event: CustomEvent) => {
    setPassword(event.detail.value);
  };

  const validateForm = () => {
    if (email === "") {
      showToast("จำเป็นต้องมีอีเมล์และรหัสผ่าน.");
      return false;
    } else if (password === "") {
      showToast("จำเป็นต้องมีอีเมล์และรหัสผ่าน.");
      return false;
    }
    return true;
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      present({
        message: "กำลังเข้าสู่ระบบ",
        spinner: "circles",
      });
      API.post(`/login`, {
        email,
        password,
      })
        .then((response) => {
          if (response.data.status === false) {
            showToast(response.data.msg);
          } else {
            if (response.data.user.school) {
              localStorage.setItem("SID", JSON.stringify(response.data.user));
              history.push("/page/ฟีดข่าว");
            } else {
              localStorage.setItem("TID", JSON.stringify(response.data.user));
              history.push("/page/ฟีดข่าวแอดมิน");
            }
          }
          dismiss();
        })
        .catch((error) => {
          showToast(error.message);
          dismiss();
        });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>งานรับเข้าศึกษาคณะวิทยาศาสตร์</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent color="secondary" fullscreen>
        <IonFab horizontal="center">
          <IonFabButton className="fabbuttonprofile">
            
          </IonFabButton>
        </IonFab>
        <form action="" onSubmit={handleLogin}>
          <h1 className="login"> เข้าสู่ระบบ</h1>
          <div>
          <img
              src={Logo} style={{width:"70% ",display:"flex",margin:"auto"}}
              alt="Logo"
            />
            <IonCard >
              <IonItem>
                <IonInput
                  type="email"
                  placeholder="อีเมล์"
                  name="email"
                  onIonChange={handleEmailChange}>
                  </IonInput>
              </IonItem>
            </IonCard>
          </div>
          <div>
            <IonCard>
              <IonItem>
                <IonInput
                  type="password"
                  placeholder="รหัสผ่าน"
                  name="password"
                  onIonChange={handlePasswordChange}></IonInput>
              </IonItem>
            </IonCard>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <IonButton shape="round" type="submit">
              เข้าสู่ระบบ
            </IonButton>

            <IonButton fill="clear" 
                style={{ textDecorationLine: "underline" }}
                routerLink="/regis">
              ลงทะเบียน
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;

