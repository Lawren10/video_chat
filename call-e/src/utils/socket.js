import { io } from "socket.io-client";

export const calleSocket = io("http://localhost:8000");

export const initPeerConnection = async () => {
 const server = {
  "ice server": [
   { url: "stun1.l.google.com:19302" },
   { url: "stun2.l.google.com:19302" },
   {
    url: "turn:192.158.29.39:3478?transport=tcp",
    credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
    username: "28224511:1379330808",
   },
  ],
 };

 const localPeer = new RTCPeerConnection(server);
 // const offer = await localPeer.createOffer();
 // await localPeer.setLocalDescription(offer);
 return localPeer;
};
