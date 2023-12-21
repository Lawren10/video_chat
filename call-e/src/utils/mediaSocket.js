import { io } from "socket.io-client";
import * as mediaSoupClient from "mediasoup-client";

export const calleSocket = io("http://localhost:8000");

export const initMediaDevice = () => {
 return new mediaSoupClient.Device();
};
