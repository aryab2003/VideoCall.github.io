import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const RoomPage = () => {
  const { roomId } = useParams();
  const containerRef = useRef(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const myMeeting = async (element) => {
      const appID = 1856732061;
      const serverSecret = '6904ed9cf33f37606e24cde82eb1a7f3';
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        'Arya'
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Copy Link',
            url: `http://localhost:3000/room/${roomId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
      });
    };

    myMeeting(containerRef.current);
  }, [roomId]);

 
  const sendLinkByEmail = () => {
    const link = `http://localhost:3000/room/${roomId}`;
    const subject = 'Join the video conference';
    const body = `Hi, I would like you to join the video conference. Here is the link:\n${link}`;
  
   
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
   
    window.open(mailtoUrl);
  };
  

  return (
    <div>
      <div ref={containerRef}></div>
      <div>
        <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={sendLinkByEmail}>Send Link</button>
      </div>
    </div>
  );
};

export default RoomPage;
