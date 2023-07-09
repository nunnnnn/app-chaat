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
  useIonLoading,
} from "@ionic/react";
import Appbar from "../../components/Appbar/Appbar";
import React, { useEffect, useState } from "react";
import { addCircle } from "ionicons/icons";
import "./profile.css";
// import ExploreContainer from "../../components/ExploreContainer";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Filesystem } from "@capacitor/filesystem";
import { useHistory } from "react-router-dom";
import API from "../../api/useApi";

const Profile: React.FC = () => {
  const [img, setImg] = useState<any>();
  const [data, setData] = useState({
    surname: "",
    lastname: "",
    branch: "",
    avatar: "",
  });
  
  const [profile, setProfile] = useState<any>();
  const [present, dismiss] = useIonLoading();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("TID")) {
      const id = JSON.parse(localStorage.getItem("TID")!)._id;
      API.get(`/teacher/${id}`).then((response) => {
        setProfile(response.data);
        setData({ ...data, avatar: response.data.avatar! });
      });
    } else {
      const id = JSON.parse(localStorage.getItem("SID")!)._id;
      API.get(`/student/${id}`).then((response) => {
        setProfile(response.data);
        setData({ ...data, avatar: response.data.avatar! });
      });
    }
  }, []);

  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
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
      setData({ ...data, avatar: photo.dataUrl! });
    }
  };

  const handleStudentProfileUpdate = () => {
    const id = JSON.parse(localStorage.getItem("SID")!)._id;
    present({
      message: "แก้ไขข้อมูล",
      spinner: "crescent",
    });
    API.put(`/student/${id}`, data).then((response) => {
      dismiss();
    });
  };

  const handleTeacherProfileUpdate = () => {
    const id = JSON.parse(localStorage.getItem("TID")!)._id;
    present({
      message: "แก้ไขข้อมูล",
      spinner: "crescent",
    });
    API.put(`/teacher/${id}`, data).then((response) => {
      dismiss();
      
    });
    
    history.push("/profileedit");
    window.location.reload();
  };
 

  return (
    
    <IonPage>
      <Appbar />
      <IonContent fullscreen color="secondary">
      <IonButton className="icon"  routerLink="/Profileedit" color="secondary" >
            <IonIcon  icon="arrow-back-circle-outline" style={{with:"fit-content",}} ></IonIcon>
          </IonButton>
        <IonFab horizontal="center">
          <IonFabButton className="fabbuttonprofile" onClick={takePhoto}>
            <IonIcon
              className="fabbuttonprofileicon"
              icon={addCircle}></IonIcon>
            <img
              alt="Silhouette of a person's head"
              src={img ? img : profile && profile.avatar}
            />
          </IonFabButton>
        </IonFab>
        <div className="contentcenter">
          <IonCard
            className="name"
            style={{
              marginTop: "15rem",
              marginLeft: "auto",
              marginRight: "auto",
              width: "80%",
            }}>
            <IonItem>
              <IonInput
                className="heightname"
                placeholder={profile && profile.name.split(" ")[0]}
                name="surname"
                onIonChange={(e) => handleChange(e)}></IonInput>
            </IonItem>
          </IonCard>
        </div>
        <div className="contentcenter">
          <IonCard className="name">
            <IonItem>
              <IonInput
                placeholder={profile && profile.name.split(" ")[1]}
                name="lastname"
                onIonChange={(e) => handleChange(e)}></IonInput>
            </IonItem>
          </IonCard>
        </div>
        {profile && profile.branch && (
          <div className="contentcenter">
            <IonCard className="name">
              <IonItem>
                <IonSelect
                  color="info"
                  interface="action-sheet"
                  placeholder={profile && profile.branch}
                  onIonChange={(e) => handleChange(e)}
                  name="branch"
                  style={{ maxWidth: "100%", width: "100%" }}>
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
        )}
        <IonCard
          style={{
            width: "30%",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "none",
            background: "#F8D874",
          }}>
          {profile && profile.branch ? (
            <IonButton
              className="bn"
              expand="block"
              onClick={handleStudentProfileUpdate}>
              บันทึก
            </IonButton>
          ) : (
            <IonButton
              className="bn"
              expand="block"
              routerLink="/Profileedit"
              onClick={handleTeacherProfileUpdate}>
              บันทึก
              
            </IonButton>
          )}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
