import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// Utility to parse URL parameters
function getUrlParams(url = window.location.href) {
  const queryString = url.split('?')[1] || '';
  return new URLSearchParams(queryString);
}

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
    // Extract or create room ID, user ID, and user name
    const params = getUrlParams();
    const roomID = params.get('roomID') || randomNumericID(5);
    const userID = randomNumericID(5);
    const userName = `user_${userID}`;

    // Test App credentials (use generateKitTokenForTest in development)
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

    // Create Zego prebuilt UI instance and join
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: callContainerRef.current,
      sharedLinks: [
        {
          name: 'Personal link',
          url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}`,
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
