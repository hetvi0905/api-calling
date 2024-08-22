import React from 'react';
interface LikeIconProps {
  className?: string;
}
const LikeIcon: React.FC<LikeIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
      viewBox="0 0 32 32"
    >
      <path
        stroke="currentColor"
        className={className}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M25.022 9.645a5.614 5.614 0 0 0-7.94 0l-.671.67a.582.582 0 0 1-.822 0l-.671-.67a5.614 5.614 0 1 0-7.94 7.94l6.555 6.555a3.489 3.489 0 0 0 4.934 0l6.555-6.555a5.612 5.612 0 0 0 0-7.94Z"
      />
    </svg>
  );
};

export default LikeIcon;
