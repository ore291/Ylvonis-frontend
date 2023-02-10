// @ts-nocheck
import { io } from 'socket.io-client';

let socket;

export const initiateSocketConnection = async () => {
	socket = io(process.env.NEXT_PUBLIC_BASE_URL);
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

export const subscribeToChat = (cb) => {
	socket.emit('my message', 'Hello there from React.');
}