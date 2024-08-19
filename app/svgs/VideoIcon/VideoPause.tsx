import React from 'react';

interface propsType {
  className?: string;
}

const VideoPause = ({ className }: propsType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50">
      <rect width="50" height="50" fill="#000" fillOpacity=".2" rx="25" />
      <path
        className={className}
        stroke="#fff"
        strokeWidth="4"
        d="M16 15.847c0-2.856 2.908-4.714 5.38-3.436l14.565 9.152c2.74 1.416 2.74 5.458 0 6.874L21.38 37.589c-2.472 1.278-5.38-.58-5.38-3.436V15.847Z"
      />
    </svg>
  );
};

export default VideoPause;
