import React from "react";

// Small stroke icons, sized by the surrounding font size.
const Svg = ({ children, label }) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={label ? undefined : true}
    role={label ? "img" : undefined}
    aria-label={label}
  >
    {children}
  </svg>
);

export const SpeakerIcon = () => (
  <Svg>
    <path d="M4 9h4l5-4v14l-5-4H4z" />
    <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />
  </Svg>
);
export const MuteIcon = () => (
  <Svg>
    <path d="M4 9h4l5-4v14l-5-4H4z" />
    <path d="m17 9 5 6M22 9l-5 6" />
  </Svg>
);
export const CheckIcon = () => (
  <Svg>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);
export const CrossIcon = () => (
  <Svg>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);
export const FlameIcon = () => (
  <Svg>
    <path d="M12 3c1 3.5 5 5.5 5 10.5a5 5 0 0 1-10 0c0-2.6 1.6-4.3 2.6-6 .2 2.4 1 3.5 2 3.5 0-2.8-.8-5.3.4-8z" />
  </Svg>
);
export const ArrowIcon = () => (
  <Svg>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
