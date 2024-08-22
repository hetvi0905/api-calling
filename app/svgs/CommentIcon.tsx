import React from 'react';

interface propsType {
  className?: string;
}

const CommentIcon = ({ className }: propsType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        className={className}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M22.667 12a10.517 10.517 0 0 1-1.13 4.769 10.667 10.667 0 0 1-13.507 5.13c-.528-.213-1.102-.31-1.663-.215l-2.728.29a1.467 1.467 0 0 1-1.614-1.614l.291-2.727c.095-.561-.002-1.135-.216-1.663A10.667 10.667 0 0 1 7.231 2.463 10.516 10.516 0 0 1 12 1.333h.627a10.642 10.642 0 0 1 10.04 10.04V12Z"
      />
    </svg>
  );
};

export default CommentIcon;
