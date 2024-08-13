import React from "react";

const HeartIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48">
      <g clip-path="url(#a)">
        <path
          fill="#7257FF"
          d="M0 16C0 7.163 7.163 0 16 0h16c8.837 0 16 7.163 16 16v16c0 8.837-7.163 16-16 16H16C7.163 48 0 40.837 0 32V16Z"
        />
        <path
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M30.766 19.234a4.211 4.211 0 0 0-5.955 0l-.503.503a.436.436 0 0 1-.617 0l-.503-.503a4.211 4.211 0 0 0-5.955 5.955l4.917 4.916a2.617 2.617 0 0 0 3.7 0l4.916-4.916a4.21 4.21 0 0 0 0-5.955Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill="#fff"
            d="M0 16C0 7.163 7.163 0 16 0h16c8.837 0 16 7.163 16 16v16c0 8.837-7.163 16-16 16H16C7.163 48 0 40.837 0 32V16Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HeartIcon;
