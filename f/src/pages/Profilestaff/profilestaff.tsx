import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonCard,
  IonItem,
  IonInput,
  IonContent,
  IonButton,
  IonSelectOption,
  IonSelect,
  useIonAlert,
} from "@ionic/react";
import Appbarstaff from "../../components/Appbarstaff/Appbarstaff";
import React, { useState } from "react";
import { addCircle } from "ionicons/icons";
import "./profilestaff.css";
import ExploreContainer from "../../components/ExploreContainer";

const Profilestaff: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [handlerMessage, setHandlerMessage] = useState("");
  const [roleMessage, setRoleMessage] = useState("");
  return (
    <IonPage>
      <Appbarstaff />
      <IonContent fullscreen color="secondary">
        <IonFab horizontal="center">
          <IonFabButton className="fabbuttonprofile">
            <IonIcon
              className="fabbuttonprofileicon"
              icon={addCircle}
            ></IonIcon>
          </IonFabButton>
        </IonFab>
        <div className="contentcenter">
          <IonCard
            style={{
              marginTop: "15rem",
              marginLeft: "auto",
              marginRight: "auto",
              width: "80%",
            }}
          >
            <IonItem>
              <IonInput className="heightname" placeholder="ชื่อ"></IonInput>
            </IonItem>
          </IonCard>
        </div>
        <div className="contentcenter">
          <IonCard className="name">
            <IonItem>
              <IonInput placeholder="นามสกุล"></IonInput>
            </IonItem>
          </IonCard>
        </div>
        {/* <div className="contentcenter">
          <IonCard className="name">
            <IonItem>
              <IonSelect
                color="info"
                className="select"
                interface="action-sheet"
                placeholder="สาขาที่คุณสนใจ"
              >
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
        </div> */}
        <IonCard
          style={{
            width: "30%",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "none",
            background: "#F8D874",
          }}
        >
          <IonButton
            className="bn"
            expand="block"
            onClick={() =>
              presentAlert({
                header: "บันทึกใช่หรือไม่!",
                mode: "ios",
                buttons: [
                  {
                    text: "ยกเลิก",
                    role: "cancel",
                    // handler: () => {
                    //   setHandlerMessage("Alert canceled");
                    // },
                  },
                  {
                    text: "บันทึก",
                    role: "confirm",
                    // handler: () => {
                    //   setHandlerMessage("Alert confirmed");
                    // },
                  },
                ],
                // onDidDismiss: (e: CustomEvent) =>
                //   setRoleMessage(`Dismissed with role: ${e.detail.role}`),
              })
            }
          >
            บันทึก
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
    // <IonPage>
    //   <Appbar />
    //   <IonContent fullscreen color="primary">

    //   </IonContent>
    // </IonPage>
  );
};

export default Profilestaff;
