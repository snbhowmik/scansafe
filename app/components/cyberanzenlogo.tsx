// ImageComponent.tsx

import React from 'react';
import myImage from './cyber-anzen-logo.png'; // Import the image

const CyberAnzenLogo: React.FC = () => {
  return (
    <div>
      <img src={myImage.src} alt="CLUB LOGO" />
    </div>
  );
};

export default CyberAnzenLogo;