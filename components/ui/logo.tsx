"use client";

export default function Logo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_234_943)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M200 50V4.37114e-06L100 0V49.9803C99.9893 22.3751 77.6077 4.37114e-06 50 4.37114e-06H2.18557e-06V100H50C22.3858 100 -1.20706e-06 122.386 0 150L2.18557e-06 200H100L100 150C100 177.614 122.386 200 150 200H200L200 100H150.02C177.625 99.9893 200 77.6077 200 50Z"
          fill="url(#paint0_linear_234_943)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_234_943"
          x1="27.5"
          y1="19"
          x2="149"
          y2="174.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD9A0" />
          <stop offset="1" stopColor="#FFF5F1" />
          {/* <stop stopColor="#A7B5FF" />
          <stop offset="1" stopColor="#F3ACFF" /> */}
        </linearGradient>
        <clipPath id="clip0_234_943">
          <rect width="200" height="200" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
