import React from 'react';

interface propsType {
  className?: string;
}

const Chevronlefticon = ({ className }: propsType) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32">
      <path
        className={className}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="m20 24-7.58-7.057a1.27 1.27 0 0 1 0-1.886L20 8"
      />
    </svg>
  );
};

export default Chevronlefticon;
