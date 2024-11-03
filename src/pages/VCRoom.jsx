import React, { useEffect, useRef } from 'react';
// import './style.css';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
  let result = '';
  if (result) return result;
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  len = len || 5;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

// Function to get the token
function generateToken(tokenServerUrl, appID, userID) {
  return fetch(tokenServerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: appID,
      user_id: userID,
    }),
  }).then(async (res) => {
    const result = await res.text();
    return result;
  });
}

// Function to get URL parameters
export function getUrlParams(url = window.location.href) {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VCRoom() {
//   const roomID = getUrlParams().get('roomID') || randomID(5);
  const roomID = "globalroom123";
  const userID = randomID(5);
  const userName = randomID(5);
  const callContainerRef = useRef(null);

  useEffect(() => {
    const setupMeeting = async () => {
      const token = await generateToken(
        'https://preview-uikit-server.zegotech.cn/api/token',
        2013980891,
        userID
      );

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        2013980891,
        token,
        roomID,
        userID,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: callContainerRef.current,
        showPreJoinView: false,
        sharedLinks: [
          {
            name: 'Personal link',
            url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    };

    setupMeeting();
  }, [roomID, userID, userName]);

  return (
    <div
      className="myCallContainer"
      ref={callContainerRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
