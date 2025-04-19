import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// Generate a random numeric ID of given length
function randomNumericID(len = 5) {
  let result = '';
  const chars = '0123456789';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function VCRoom() {
  const callContainerRef = useRef(null);

  useEffect(() => {
    // 🔒 Fixed room ID for all users
    const roomID = 'global-room';

    // Generate random user ID and name
    const userID = randomNumericID(5);
    const userName = `user_${userID}`;

    // Zego credentials (test)
    const appID = 905418461;
    const serverSecret = '9f4e66b109d743f91538695ad7fc8588';

    // Generate a test token
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName
    );

    // Join the video conference
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: callContainerRef.current,
      sharedLinks: [
        {
          name: 'Join this meeting',
          url: `${window.location.origin}${window.location.pathname}`,
        },
      ],
      scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 50,
      layout: 'Auto',
      showLayoutButton: true,
    });
  }, []);

  return (
    <div
      ref={callContainerRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
