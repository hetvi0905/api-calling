import React from 'react';

interface propsType {
  className?: string;
}

const VideoPlay = ({ className }: propsType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50">
      <rect width="50" height="50" fill="#000" fillOpacity=".2" rx="25" />
      <path
        className={className}
        fill="#fff"
        d="M16.667 36.111h5.555V13.89h-5.555v22.22Zm12.5 0h5.555V13.89h-5.555v22.22Z"
      />
    </svg>
  );
};

export default VideoPlay;
