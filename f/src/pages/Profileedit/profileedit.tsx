import {
  IonFab,
  IonFabButton,
  IonPage,
  IonCard,
  IonContent,
  IonButton,
  IonLoading,
} from "@ionic/react";
import Appbar from "../../components/Appbar/Appbar";
import React, { useEffect, useState } from "react";
import "./profileedit.css";
import API from "../../api/useApi";
import { useHistory } from "react-router-dom";


const Profileedit: React.FC = () => {
  const [profile, setProfile] = useState<any>();
  const [showLoading, setShowLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log('profile', profile)
    setProfile(true);
    const updatedData = history.location.state; // ดึงข้อมูลที่ถูกส่งมาจากหน้า Profile
    if (updatedData) {
      setProfile(updatedData);
    } else {
      if (localStorage.getItem("TID")) {
        const id = JSON.parse(localStorage.getItem("TID")!)._id;
        API.get(`/teacher/${id}`).then((response) => {
          setProfile(response.data);
          setShowLoading(false);
        });
      } else {
        const id = JSON.parse(localStorage.getItem("SID")!)._id;
        API.get(`/student/${id}`).then((response) => {
          setProfile(response.data);
          setShowLoading(false);
        });
      }
    }
  }, []);
  
  console.log('profile', profile)

  return (
    <IonPage>
      <IonLoading
        isOpen={showLoading}
        spinner="crescent"
        message={"กำลังโหลดข้อมูลส่วนตัว"}
      />
      <Appbar />
      <IonContent fullscreen color="secondary">
        <IonFab horizontal="center">
          <IonFabButton className="fabbuttonprofile">
            {profile && <img src={profile.avatar} alt="profile" />}
          </IonFabButton>
        
        </IonFab>
        
        {profile && (
          <div className="color" style={{background:"	rgb(0 0 204 / 20%)",boxShadow:"#323278 5px 5px, #30308d 10px 10px, 15px 15px" , }} >
            <h2 className="profilename">ชื่อ : {profile.name}</h2>
            <h2> 
              {profile.school
                ? "โรงเรียน : "  + profile.school
                : "มหาวิทยาลัยอุบลราชธานี"}
            </h2>
            <h2>{profile.branch ?"สาขาที่สนใจ : "  + profile.branch : "คณะวิทยาศาสตร์"}</h2>
            <h2> อีเมล์ : {profile.email}</h2>
          </div>
        )}
        <IonCard className="buttonedit">
          <IonButton shape="round" className="bte" routerLink="/Profile">
            แก้ไข
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default Profileedit;
