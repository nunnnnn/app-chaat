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

const Regis: React.FC = () => {
  const [inputs, setInputs] = React.useState<any>({
    surname: "",
    lastname: "",
    branch: "",
    school: "",
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
    const { surname,lastname,branch,school, email, password } = inputs;
    if (surname.length < 3) {
      showToast("ชื่อผู้ใช้ควรมีความยาวมากกว่า 3 ตัวอักษร");
      return false;
    } else if (lastname.length < 3) {
      showToast("นามสกุลผู้ใช้ควรมีความยาวมากกว่า 3 ตัวอักษร");
      return false;
    } else if (school.length < 8) {
      showToast("จำเป็นต้องใส่ข้อมูล");
      return false;
    }else if (branch.length < 8) {
      showToast("จำเป็นต้องใส่ข้อมูล");
      return false;
    }  else if (email === "") {
      showToast("จำเป็นต้องมีอีเมล์.");
      return false;
    }else if (password.length < 8) {
      showToast("รหัสผ่านควรมีความยาวเท่ากับหรือมากกว่า 8 ตัวอักษร");
      return false;
    } 

    return true;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (handleValidation()) {
      const { surname, lastname, branch, school, email, password } = inputs;
      present({
        message: "Registering...",
        spinner: "crescent",
      });
      const { data } = await API.post(`/student`, {
        surname,
        lastname,
        branch,
        school,
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
                  name="surname"
                  onIonChange={(e) => handleChange(e)}></IonInput>
              </IonItem>
            </IonCard>
          </div>
          <div className="contentcenter">
            <IonCard className="name">
              <IonItem>
                <IonInput
                  placeholder="นามสกุล"
                  name="lastname"
                  onIonChange={(e) => handleChange(e)}></IonInput>
              </IonItem>
            </IonCard>
          </div>
          <div className="contentcenter">
            <IonCard className="name">
              <IonItem>
                <IonInput
                  placeholder="โรงเรียน"
                  name="school"
                  onIonChange={(e) => handleChange(e)}></IonInput>
              </IonItem>
            </IonCard>
          </div>
          <div className="contentcenter">
            <IonCard className="name">
              <IonItem lines="none">
                <IonSelect
                  color="info"
                  style={{ maxWidth: "100%", width: "100%" }}
                  interface="action-sheet"
                  placeholder="สาขาที่คุณสนใจ"
                  name="branch"
                  onIonChange={(e) => handleChange(e)}>
                  <IonSelectOption value="สาขาวิชาฟิสิกส์ชีวการแพทย์">
                    สาขาวิชาฟิสิกส์ชีวการแพทย์
                  </IonSelectOption>
                  <IonSelectOption value="สาขาวิชาชีววิทยา">
                    สาขาวิชาชีววิทยา
                  </IonSelectOption>
                  <IonSelectOption value="สาขาวิชาจุลชีววิทยา">
                    สาขาวิชาจุลชีววิทยา
                  </IonSelectOption>
                  <IonSelectOption value="สาขาวิชาเคมี">
                    สาขาวิชาเคมี
                  </IonSelectOption>
                  <IonSelectOption value="สาขาวิชาวิทยาการข้อมูลและนวัตกรรมซอฟต์แวร์">
                    สาขาวิชาวิทยาการข้อมูลและนวัตกรรมซอฟต์แวร์
                  </IonSelectOption>
                  <IonSelectOption value="สาขาวิชาเทคโนโลยีสารสนเทศและการสื่อสาร">
                    สาขาวิชาเทคโนโลยีสารสนเทศและการสื่อสาร
                  </IonSelectOption>
                  <IonSelectOption value="สาขาวิชาคณิตศาสตร์">
                    สาขาวิชาคณิตศาสตร์
                  </IonSelectOption>
                  <IonSelectOption value="สาขาวิชาอาชีวอนามัยและความปลอดภัย">
                    สาขาวิชาอาชีวอนามัยและความปลอดภัย
                  </IonSelectOption>
                  <IonSelectOption value="สาขาวิชาวิทยาศาสตร์สิ่งแวดล้อม">
                    สาขาวิชาวิทยาศาสตร์สิ่งแวดล้อม
                  </IonSelectOption>
                  <IonSelectOption value="สาขาวิชาเทคโนโลยียางและพอลิเมอร์">
                    สาขาวิชาเทคโนโลยียางและพอลิเมอร์
                  </IonSelectOption>
                </IonSelect>
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <IonButton shape="round" type="submit">
              ลงทะเบียน
            </IonButton>
 
              <IonButton
                fill="clear"
                style={{ textDecorationLine: "underline" }}
                routerLink="/Login">
                มีแล้วเข้าสู่ระบบ
              </IonButton>
           
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};
export default Regis;
