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
import Appbar from "../../components/Appbar/Appbar";
import React, { useState } from "react";
import { personCircle } from "ionicons/icons";
import "./editadmin.css";

import { platform } from "os"

const Editadmin: React.FC = () => {
  return (
    <IonPage>
      <Appbar />
      <IonContent fullscreen color="secondary">
        <IonFab horizontal="center">
          <IonFabButton className="fabbuttonprofile">
            <IonIcon
              className="fabbuttonprofileicon"
              icon={personCircle}
            ></IonIcon>
          </IonFabButton>
        </IonFab>
        <div style={{ textAlign: "center" }}>
          <h2 className="profilename">นางสาว ตุทิยาพร</h2>
          <h2>ตำแหน่ง :ประธานหลักสูตร</h2>
          <h2>Tutiyaporn.tt.62@ubu.ac.th</h2>
        </div>
        <IonCard className="buttonedit">
          <IonButton shape="round" className="bte">
            แก้ไข
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default Editadmin;



// const express = require('express');
// const app =express();
// const dfff = require('dialogflow-fulfillment');

// app.get('/',(,req,res)=>{
//   res.send("We are love")
// });

// app.post('/',express.json(), (req,res)=>{
//   const agent = new dfff.WebhookClient({
//     require:req,
//     require:res
//   });

// function demo(agent){
//   agent.add("Sending response from Webhook server as v1.1.11.1");
// }

//   function custompayloadDemo (agen){
//     var payloaddata ={
//       "richContent": [
//         [
//           {
//             "type": "info",
//             "title": "Info item title",
//             "subtitle": "Info item subtitle",
//             "image": {
//               "src": {
//                 "rawUrl": "https://example.com/images/logo.png"
//               }
//             },
//             "actionLink": "https://example.com"
//           }
//         ]
//       ]
//     }
//     agen.add(new dfff.Payload(platform.UNSPECIFIED,payloaddata,{sendAsMessage:true,rawPayload: true)})
//   }
  
//   var intentmap = new Mep();
  
//   intentMap.set('webhook',demo)
//   intentMap.set('custompayloadDemo',custompayloadDemo)
  
//   agent.handleRequest(intentMap);
// });
// app.listen(333,()=>console.log("Server is live at post 3333"));

// import { IonIcon, IonPage, IonContent, IonFooter, IonCard, IonRow, IonCol, IonText } from "@ionic/react";
// import Appbar from "../../components/Appbar/Appbar";
// import React, { useState, useRef, useEffect } from "react";
// import "./chatbot.css";
// import axios from "axios";

// const suggestions = [
//   "mytcasc,เอกสารรายงานตัว",
//   "กฎ",
//   "หอพักหอใน",
//   "ปริญญาตรีมีกี่สาขา"
// ];

// const Chactbot: React.FC = () => {
//   const [messages, setMessages] = useState<any>([]);
//   const [token, setToken] = useState("");
//   const project_id = "chatbot-ubu-science-entry-xpri";
//   const session_id = "xxsw555";
//   const msg = useRef<HTMLInputElement | null>(null);

//   const send = () => {
//     if (msg.current?.value) {
//       const text = msg.current?.value;
//       msg.current.value = "";
//       setMessages((prev: any) => [
//         ...prev,
//         { messages: text, name: "me", time: new Date(), fromself: "end" },
//       ]);
//       const payload = {
//         query_input: {
//           text: {
//             text: text,
//             language_code: "th-TH",
//           },
//         },
//       };
//       axios
//         .post(
//           `https://dialogflow.googleapis.com/v2/projects/${project_id}/agent/sessions/${session_id}:detectIntent`,
//           payload,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "x-goog-user-project": project_id,
//               "Content-Type": "application/json; charset=utf-8",
//             },
//           }
//         )
//         .then((res: any) => {
//           const fulfillmentText = res.data.queryResult.fulfillmentText;
//           const fulfillmentMessages = res.data.queryResult.fulfillmentMessages;
//           setMessages((prev: any) => [
//             ...prev,
//             {
//               messages: fulfillmentText,
//               name: "bot",
//               time: new Date(),
//               fromself: "start",
//             },
//           ]);

//           if (fulfillmentMessages && fulfillmentMessages.length > 0) {
//             fulfillmentMessages.forEach((message: any) => {
//               if (message.payload && message.payload.fields) {
//                 const payloadFields = message.payload.fields;

//                 if (payloadFields.customPayload) {
//                   const customPayload = payloadFields.customPayload.stringValue;
//                   custompayloadDemo(customPayload);
//                 }
//               }
//             });
//           }
//         });
//     }
//   };

//   useEffect(() => {
//     axios
//       .get("http://20.239.188.252:7500/google_auth")
//       .then((res: any) => setToken(res.data.token));
//   }, [token]);

//   const custompayloadDemo = (customPayload: string) => {
    
//     // ดำเนินการด้านล่างของฟังก์ชันเพื่อประมวลผล customPayload และแสดงข้อมูล rich content ในแบบที่คุณต้องการ
//     console.log("Custom Payload:", customPayload);
//   };

//   return (
//     <IonPage>
//       <Appbar />
//       <IonContent fullscreen color="secondary">
//         {messages.map((mes: any, index: number) => (
//           <div className={`chat chat-${mes.fromself}`} key={index}>
//             <div className="chat-image avatar">
//               <div className="w-10 rounded-full">
//                 <img src="https://placeimg.com/192/192/people" alt="Avatar" />
//               </div>
//             </div>
//             <div className="chat-header">
//               {mes.name}
//               <time className="text-xs opacity-50">{mes.time.toString()}</time>
//             </div>
//             <div className="chat-bubble">{mes.messages}</div>
//           </div>
//         ))}
//       </IonContent>
//       <IonFooter>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             overflowX: "scroll",
//           }}>
//           {suggestions.map((suggestion, index) => (
//             <div
//               key={index}
//               className="suggestion-btn"
//               onClick={(e) =>
//                 msg.current ? (msg.current.value = suggestion) : ""
//               }>
//               {suggestion}
//             </div>
//           ))}
//         </div>
//         <div className="form-control">
//           <div className="input-group">
//             <input
//               ref={msg}
//               type="text"
//               style={{
//                 backgroundColor: "#F1F1F1",
//                 width: "100%",
//                 borderRadius: "0rem",
//               }}
//               placeholder="ถามอะไรตอบได้..."
//               className="input input-bordered"
//             />
//             <button
//               className="btn btn-square"
//               onClick={send}
//               style={{ borderRadius: "0rem" }}>
//               <IonIcon
//                 size="large"
//                 color="light"
//                 icon="navigate-circle"></IonIcon>
//             </button>
//           </div>
//         </div>
//       </IonFooter>
//     </IonPage>
//   );
// };

// export default Chactbot;






