import React from 'react';

interface propsType {
  className?: string;
}

const EventShareIcon = ({ className }: propsType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
      viewBox="0 0 17 18"
    >
      <path
        stroke="currentColor"
        className={className}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m5.472 10.208 5.464 3.184m-.008-8.784L5.472 7.792M15.4 3.4a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0ZM5.8 9A2.4 2.4 0 1 1 1 9a2.4 2.4 0 0 1 4.8 0Zm9.6 5.6a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0Z"
      />
    </svg>
  );
};

export default EventShareIcon;
