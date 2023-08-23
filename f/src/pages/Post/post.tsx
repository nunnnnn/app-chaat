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
  IonTextarea,
  IonList,
  useIonToast,
  useIonLoading,
} from "@ionic/react";
import { imagesOutline, paperPlane } from "ionicons/icons";
import Appbarstaff from "../../components/Appbarstaff/Appbarstaff";
import React, { useState } from "react";
import { useHistory } from "react-router";
import API from "../../api/useApi";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Filesystem } from "@capacitor/filesystem";
import "./post.css";

const Post: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [IonToast] = useIonToast();
  const [present, dismiss] = useIonLoading();
  const [img, setImg] = useState<any>();
  const [showImgText, setShowImgText] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const history = useHistory();

  const [text, setText] = useState({
    image: "",
    branch: "",
    detail: "",
    attach_link: "",
    title: "",
    create_at: "" as any,
    teacher_id: "",
  });

  const takePhoto = async () => {
    const access = await Filesystem.checkPermissions();
    if (access.publicStorage === "denied") {
      await Filesystem.requestPermissions();
    } else {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100,
      });

      setImg(photo.dataUrl);
      setText({ ...text, image: photo.dataUrl! });
    }
  };

  const showToast = (message: any) => {
    IonToast({
      message: message,
      duration: 1500,
      position: "bottom",
      mode: "ios",
    });
  };

  const handleChange = async (event: any) => {
    setText({ ...text, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { image,branch, detail, title } = text;
    if (image === "") {
      showToast("จำเป็นต้องใส่รูปภาพ.");
      return false;
    }else if (title === "") {
      showToast("จำเป็นต้องระบุหัวข้อเรื่อง.");
      return false;
    } else if (branch === "") {
      showToast("จำเป็นต้องระบุ.");
      return false;
    } else if (detail === "") {
      showToast("จำเป็นต้องระบุรายละเอียด.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (handleValidation()) {
      text.create_at = new Date();
      text.teacher_id = JSON.parse(String(localStorage.getItem("TID")))._id;
      present({
        message: "โพส์ต...",
        spinner: "crescent",
      });
      const { data } = await API.post(`/post`, text);
      dismiss();
      if (data.status === false) {
        showToast(data.msg);
      } else {
        window.location.replace("/page/ฟีดข่าวแอดมิน");
      }
    }
  };

  return (
    <IonPage>
      <Appbarstaff />
      <IonContent fullscreen color="secondary">
        <form onSubmit={(event) => handleSubmit(event)}>
          <IonFab horizontal="center">
            <IonFabButton className="fabbuttonup" 
            onClick={() => {
              takePhoto();
              setShowImgText(true);
            }}>
          <div className="edit-avatar-text" >เพิ่มรูปภาพ</div>
              <IonIcon
                className="fabbuttonupicon"
                icon={imagesOutline}></IonIcon>
            {showImgText && <div className="img-text">เพิ่มรูปภาพ</div>}

              <img
                alt="Silhouette of a person's head"
                src={
                  img
                    ? img
                    : "https://ionicframework.com/docs/img/demos/avatar.svg"
                }
              />
              {/* </IonAvatar> */}
            </IonFabButton>
          </IonFab>

          <div className="contentcenter">
            <IonCard
              style={{
                marginTop: "15rem",
                marginLeft: "auto",
                marginRight: "auto",
                width: "80%",
                borderRadius: "1rem",
              }}>
              <IonItem>
                <IonInput
                  className="heightname"
                  placeholder="หัวข้อเรื่อง"
                  name="title"
                  onIonChange={(e) => handleChange(e)}></IonInput>
              </IonItem>
            </IonCard>
          </div>

          <div className="contentcenter">
            <IonCard className="name">
              <IonItem>
                <IonSelect
                  color="info"
                  interface="action-sheet"
                  style={{ maxWidth: "100%", width: "100%" }}
                  placeholder="สาขาที่เกี่ยวข้อง"
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
                  <IonSelectOption value="ทุกสาขา">
                    ทุกสาขา
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCard>
          </div>
          <div className="contentcenter">
            <IonCard className="name">
              <IonItem>
                <IonInput
                  placeholder="แนบลิ้งค์ไฟล์"
                  name="attach_link"
                  onIonChange={(e) => handleChange(e)}></IonInput>
              </IonItem>
            </IonCard>
          </div>
          <div className="contentcenter">
            <IonCard className="name">
              <IonList>
                <IonItem className="detail">
                  <IonTextarea
                    className="detail"
                    // rows={7}
                    placeholder="รายละเอียด"
                    autoGrow={true}
                    name="detail"
                    onIonChange={(e) => handleChange(e)}></IonTextarea>
                </IonItem>
              </IonList>
            </IonCard>
          </div>
          <IonCard
            style={{
              width: "30%",
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: "none",
              background: "#F8D874",
            }}>
            <IonButton fill="outline" expand="block" type="submit">
              โพสต์
              <IonIcon icon={paperPlane}></IonIcon>
            </IonButton>
          </IonCard>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Post;
