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
import { addCircle, paperPlane } from "ionicons/icons";
import Appbarstaff from "../../components/Appbarstaff/Appbarstaff";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import API from "../../api/useApi";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Filesystem } from "@capacitor/filesystem";
import "./postedit.css";
import { useParams } from "react-router";
import dayjs from "dayjs";
import "dayjs/locale/th";

const Postedit: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [IonToast] = useIonToast();
  const [present, dismiss] = useIonLoading();
  const [img, setImg] = useState<any>();
  const [showEditImgText, setShowEditImgText] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const history = useHistory();

  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>({
    image: "",
    title: "",
    branch: "",
    detail: "",
    attach_link: "",
    teacher_id: "",
    create_at: "" as any,
  });
  const formattedDate = dayjs(data.create_at)
    .locale("th")
    .format("DD/MM/YYYY HH:mm");

  useEffect(() => {
    API.get(`/post/${id}`).then((response) => {
      setData(response.data);
    });
  }, [id]);

  // console.log(data);

  const [text, setText] = useState({
    image: "",
    branch: "",
    detail: "",
    attach_link: "",
    title: "",
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
  const handleChangeBranch = (event: any) => {
    setText((prevText) => ({
      ...prevText,
      branch: event.target.value,
    }));
  };

  const handleChangeDetail = (event: any) => {
    setText((prevText) => ({
      ...prevText,
      detail: event.target.value,
    }));
  };

  const handleChangeAttach_link = (event: any) => {
    setText((prevText) => ({
      ...prevText,
      attach_link: event.target.value,
    }));
  };

  const handleChangeTitle = (event: any) => {
    setText((prevText) => ({
      ...prevText,
      title: event.target.value,
    }));
  };
  const handleValidation = () => {
    const { branch, detail, title } = text;
    if (title === "") {
      showToast("จำเป็นต้องระบุหัวข้อเรื่อง.");
      return false;
    } else if (branch === "") {
      showToast("จำเป็นต้องระบุสาขา.");
      return false;
    } else if (detail === "") {
      showToast("จำเป็นต้องระบุรายละเอียด.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(text);
    const editedText = { ...text, image: img || text.image || data.image };

  console.log(editedText);

    if (handleValidation()) {
      present({
        message: "อัพเดตโพส์ต...",
        spinner: "crescent",
      });
      const { data } = await API.put(`/post/${id}`, editedText);
      dismiss();
      if (data.status === false) {
        showToast(data.msg);
      } else {
        window.location.replace("/page/ฟีดข่าวแอดมิน");
        
      }
    }
  };
console.log('data', data)
  return (
    <IonPage>
      <Appbarstaff />
      <IonContent fullscreen color="secondary">
        <form onSubmit={(event) => handleSubmit(event)}>
          <IonFab horizontal="center">
            <IonFabButton className="fabbuttonup"
            onClick={() => {
              takePhoto();
              setShowEditImgText(true);
            }}>
          <div className="edit-img-text" >แก้ไขรูปภาพ</div>

              <IonIcon className="fabbuttonupicon" icon={addCircle}></IonIcon>
              {showEditImgText && <div className="edit-img-text">แก้ไขรูปภาพ</div>}
              <img
                alt="Silhouette of a person's head"
                src={img ? img : text.image || data.image}
              />
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
              }}
            >
              <IonItem>
                <IonInput
                  className="heightname"
                  type="text"
                  placeholder="หัวข้อเรื่อง"
                  name="title"
                  value={text.title || data.title}
                  onIonChange={handleChangeTitle}
                ></IonInput>
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
                  value={text.branch || data.branch}
                  onIonChange={(e) => handleChangeBranch(e)}
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
          </div>
          <div className="contentcenter">
            <IonCard className="name">
              <IonItem>
                <IonInput
                  placeholder="แนบลิ้งค์ไฟล์"
                  name="attach_link"
                  value={text.attach_link || data.attach_link}
                  onIonChange={(e) => handleChangeAttach_link(e)}
                ></IonInput>
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
                    value={text.detail || data.detail}
                    onIonChange={(e) => handleChangeDetail(e)}
                  ></IonTextarea>
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
            }}
          >
            <IonButton fill="outline" expand="block" type="submit">
              แก้ไขโพสต์
              <IonIcon icon={paperPlane}></IonIcon>
            </IonButton>
          </IonCard>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Postedit;
