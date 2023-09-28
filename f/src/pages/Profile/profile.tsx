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
    school:"",
    avatar: "",
  });
  
  const [profile, setProfile] = useState<any>();
  const [present, dismiss] = useIonLoading();
  const history = useHistory();
  const [showEditAvatarText, setShowEditAvatarText] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("TID")) {
      const id = JSON.parse(localStorage.getItem("TID")!)._id;
      API.get(`/teacher/${id}`)
        .then((response) => {
          setProfile(response.data);
          setData((prevData) => ({
            ...prevData,
            avatar: response.data.avatar,
            surname: response.data.name.split(" ")[0],
            lastname: response.data.name.split(" ")[1],
            // school: response.data.school,
            // branch: response.data.branch,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const id = JSON.parse(localStorage.getItem("SID")!)._id;
      API.get(`/student/${id}`)
        .then((response) => {
          setProfile(response.data);
          setData((prevData) => ({
            ...prevData,
            avatar: response.data.avatar,
            surname: response.data.name.split(" ")[0],
            lastname: response.data.name.split(" ")[1],
            school: response.data.school,
            branch: response.data.branch,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
      const updatedData = { ...data, avatar: response.data.avatar };
      console.log(updatedData);
      window.location.replace("/page/ข้อมูลส่วนตัว");
    })
    
    .catch((error) => {
      console.log(error);
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
      history.push("/page/ข้อมูลส่วนตัว", { updatedData: data });
    }).catch((error) => {
      console.log(error);
    });
  };
 

  return (
    
    <IonPage>
      <Appbar />
      <IonContent fullscreen color="secondary">
      <IonButton className="icon"  routerLink="/page/ข้อมูลส่วนตัว" color="secondary" >
            {/* <IonIcon  icon="arrow-back-circle-outline" style={{with:"fit-content",}} ></IonIcon> */}
          </IonButton>
        <IonFab horizontal="center">
        <IonFabButton
            className="fabbuttonprofile"
            onClick={() => {
              takePhoto();
              setShowEditAvatarText(true);
            }}>
          <div className="edit-avatar-text" >แก้ไขรูปภาพ</div>

            <IonIcon
              className="fabbuttonprofileicon"
              icon={addCircle}></IonIcon>
            {showEditAvatarText && <div className="edit-avatar-text">แก้ไขรูปภาพ</div>}
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
                value={data.surname}
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
                value={data.lastname}
                onIonChange={(e) => handleChange(e)}></IonInput>
            </IonItem>
          </IonCard>
        </div>
        {profile && profile.school && (
        <div>
        <IonCard className="name">
            <IonItem>
              <IonInput
                placeholder={profile && profile.school}
                name="school"
                value={data.school}
                
                onIonChange={(e) => handleChange(e)}> </IonInput>
            </IonItem>
          </IonCard>
        </div>
        )}
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
                  value={data.branch||""}
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
              routerLink="/page/ข้อมูลส่วนตัว"
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
