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
    IonSelectOption,
    IonSelect,
    useIonToast,
    useIonLoading,
  } from "@ionic/react";
  import React, { useEffect, useState } from "react";
  import API from "../../api/useApi";
  import { useHistory } from "react-router";
  import "./regis.css";
  
  const RegisAdmin: React.FC = () => {
    const [inputs, setInputs] = React.useState<any>({
      name: "",
      email: "",
      password: "",
    });
    const history = useHistory();
    const [IonToast] = useIonToast();
    const [present, dismiss] = useIonLoading();
  
    useEffect(() => {
      if (localStorage.getItem("It's me")) {
        history.push("/Login");
      }
    }, []);
  
    const handleChange = async (event: any) => {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    };
  
    const showToast = (message: any) => {
      IonToast({
        message: message,
        duration: 1500,
        position: "bottom",
        mode: "ios",
      });
    };
    const handleValidation = () => {
      const { name, email, password } = inputs;
      if (name.length < 3) {
        showToast("ชื่อผู้ใช้ควรมีความยาวมากกว่า 3 ตัวอักษร");
        return false;
      } else if (password.length < 6) {
        showToast("รหัสผ่านควรมีความยาวเท่ากับหรือมากกว่า 8 ตัวอักษร");
        return false;
      } else if (email === "") {
        showToast("Email is required.");
        return false;
      }
      return true;
    };
  
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      if (handleValidation()) {
        const { name, email, password } = inputs;
        present({
          message: "Registering...",
          spinner: "crescent",
        });
        const { data } = await API.post(`/teacher`, {
          name,
          email,
          password,
        });
        dismiss();
        if (data.status === false) {
          showToast(data.msg);
        }
        if (data.status === true) {
          history.push("/login");
        }
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
          <form onSubmit={(event) => handleSubmit(event)}>
            <h1 className="login"> สมัครเพื่อรับข่าวสาร</h1>
            <div className="contentcenter">
              <IonCard className="name">
                <IonItem>
                  <IonInput
                    placeholder="ชื่อ"
                    name="name"
                    onIonChange={(e) => handleChange(e)}></IonInput>
                </IonItem>
              </IonCard>
            </div>
            <div className="contentcenter">
              <IonCard className="name">
                <IonItem>
                  <IonInput
                    type="email"
                    placeholder="อีเมล์"
                    name="email"
                    onIonChange={(e) => handleChange(e)}></IonInput>
                </IonItem>
              </IonCard>
            </div>
            <div className="contentcenter">
              <IonCard className="name">
                <IonItem>
                  <IonInput
                    type="password"
                    placeholder="รหัสผ่าน"
                    name="password"
                    onIonChange={(e) => handleChange(e)}></IonInput>
                </IonItem>
              </IonCard>
            </div>
            <div className="contentcenter">
              <IonCard className="name">
                <IonItem>
                  <IonInput
                    type="password"
                    placeholder="ยืนยันรหัสผ่าน"
                    name="password"></IonInput>
                </IonItem>
              </IonCard>
            </div>
            <IonCard className="button">
              <IonButton shape="round" type="submit">
                ลงทะเบียน
              </IonButton>
            </IonCard>
            <div className="contentcenter">
              <IonCard className="me">
                <IonButton
                  fill="clear"
                  style={{ textDecorationLine: "underline" }}
                  routerLink="/Login">
                  มีแล้วเข้าสู่ระบบ
                </IonButton>
              </IonCard>
            </div>
          </form>
        </IonContent>
      </IonPage>
    );
  };
  export default RegisAdmin;
  