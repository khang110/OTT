import React, { createContext, useState, useRef, useEffect, FC, Dispatch, SetStateAction } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import {APIClient} from '../../api/apiCore';
import * as url from '../../api/urls';
import { Link, Redirect } from "react-router-dom";
const api = new APIClient();
const updateSocketId = (userID: string, socketID: string) => {
  return api.create(url.POST_UPDATE_SOCKET_ID + "/" + userID + "/" + socketID);
};
type Props = {
    children: React.ReactNode;
};

interface Signal {
    sdp?: string;
    type: RTCSdpType;
}

interface Call {
    isReceivingCall: boolean,
    from: string, 
    name: string,
    signal: Signal,
}
interface Context {
    call: Call,
    callAccepted: boolean,
    myVideo: Object,
    userVideo: Object,
    stream: any,
    name: string,
    callEnded: boolean,
    me: string,
    answerCall: any,
    callUser: any,
    leaveCall: any,
    setName: Dispatch<SetStateAction<string>>;
};
const myCall: Call = {
    isReceivingCall: false,
    from: '', 
    name: '',
    signal: {
        sdp: '',
        type: 'offer'
    },
} 
type initialState = {
    call: (myCall: Call) => void,
    callAccepted: false,
    myVideo: {},
    userVideo: {},
    stream: MediaStream,
    name: '',
    callEnded: false,
    me: '',
    answerCall: () => {},
    callUser: () => {},
    setName: () => {},
  };
const SocketContext = createContext<Context | null>(null);

const socket = io('http://192.168.1.37:6000');
interface ContextProps {
    children: any
}
const ContextProvider: FC<ContextProps> = ({children}) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState<MediaStream>();
    const [name, setName] = useState('');
    const defaultCall: Call = {
        isReceivingCall: false,
        from: '',
        name: '',
        signal: {
            sdp: '',
            type: 'offer',
        }
    } 
    const [call, setCall] = useState<Call>(defaultCall);
    const [me, setMe] = useState('');
  
    const myVideo = useRef<HTMLVideoElement | null>(null);
    const userVideo = useRef<HTMLVideoElement | null>(null);
    const connectionRef = useRef<Peer.Instance>();

    useEffect(() => {
        
        const getStream  = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            setStream(stream);
    
            myVideo.current!.srcObject = stream;
          } catch (err) {
            console.log(err);
          }
        }
        getStream();
        socket.on('me', (id) => {
          setMe(id)
          console.log("2: " + id)
          updateSocketId(JSON.parse(localStorage.getItem("authUser")!).user.id, id);
        });
        socket.on('callUser', ({ from, name: callerName, signal }) => {
          setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
      }, [])

      const answerCall = () => {
        setCallAccepted(true);
    
        const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on('signal', (data) => {
          socket.emit('answerCall', { signal: data, to: call!.from});
        });
    
        peer.on('stream', (currentStream) => {
          userVideo.current!.srcObject = currentStream;
        });
    
        peer.signal(call!.signal);
    
        connectionRef.current = peer;
      };
      const callUser = (id: string | null) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
    
        peer.on('signal', (data) => {
          socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });
        peer.on('stream', (currentStream) => {
          userVideo.current!.srcObject = currentStream;
        });
    
        socket.on('callAccepted', (signal) => {
          setCallAccepted(true);
    
          peer.signal(signal);
        });
      };
      const leaveCall = () => {
        setCallEnded(true);
    
        connectionRef.current?.destroy();
    
        window.location.reload();
      };
  return (
    <SocketContext.Provider value={{
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      me,
      answerCall,
      callUser,
      leaveCall
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
