import React from 'react';

interface MascotProps {
  color?: string;
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
}

/**
 * Mascot 1: Tilted character box (Question 1)
 */
export const SamBoxMascot: React.FC<MascotProps> = ({
  color = '#FF9900',
  className = '',
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer transition-transform hover:scale-105 active:scale-95 ${className} ${
        isSelected ? 'ring-4 ring-purple-600 ring-offset-4 rounded-3xl' : ''
      }`}
      title="Nhân vật Sam / Cashflow Mascot"
    >
      <svg
        width="190"
        height="190"
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-36 h-36 md:w-44 md:h-44 drop-shadow-md"
      >
        <g transform="rotate(-10 110 110)">
          {/* Main body */}
          <rect
            x="25"
            y="25"
            width="170"
            height="170"
            rx="24"
            fill={color}
            stroke="#FFFFFF"
            strokeWidth="5"
          />
          {/* Eyes */}
          {/* Left Eye */}
          <ellipse cx="88" cy="85" rx="16" ry="20" fill="#FFFFFF" />
          <ellipse cx="94" cy="88" rx="4.5" ry="5.5" fill="#3D3A36" />

          {/* Right Eye */}
          <ellipse cx="128" cy="85" rx="16" ry="20" fill="#FFFFFF" />
          <ellipse cx="134" cy="88" rx="4.5" ry="5.5" fill="#3D3A36" />

          {/* Happy Smile Arc */}
          <path
            d="M75 125 C95 155, 140 150, 155 120"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

/**
 * Mascot 2: Elongated Purple Pill character (Question 3)
 */
export const PurplePillMascot: React.FC<MascotProps> = ({
  color = '#9B77C1',
  className = '',
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer transition-transform hover:scale-105 active:scale-95 ${className} ${
        isSelected ? 'ring-4 ring-purple-600 ring-offset-4 rounded-full' : ''
      }`}
      title="Nhân vật Cashflow Pill Mascot"
    >
      <svg
        width="160"
        height="240"
        viewBox="0 0 170 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-28 h-44 md:w-36 md:h-56 drop-shadow-md"
      >
        <g transform="rotate(12 85 130)">
          {/* Main capsule body */}
          <rect
            x="25"
            y="15"
            width="120"
            height="225"
            rx="60"
            fill={color}
            stroke="#FFFFFF"
            strokeWidth="5"
          />
          {/* Eyes */}
          {/* Left eye */}
          <ellipse cx="70" cy="85" rx="15" ry="19" fill="#FFFFFF" />
          <ellipse cx="75" cy="90" rx="4" ry="5" fill="#2D2438" />

          {/* Right eye */}
          <ellipse cx="102" cy="82" rx="15" ry="19" fill="#FFFFFF" />
          <ellipse cx="107" cy="87" rx="4" ry="5" fill="#2D2438" />

          {/* Smile */}
          <path
            d="M72 122 Q86 135 100 120"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

/**
 * Mascot 3: Trio of playful friends (Question 5)
 */
export const TrioFriendsMascot: React.FC<MascotProps> = ({
  color = '#41A456',
  className = '',
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-block cursor-pointer transition-transform hover:scale-105 active:scale-95 ${className} ${
        isSelected ? 'ring-4 ring-purple-600 ring-offset-4 rounded-3xl' : ''
      }`}
      title="Bộ ba nhân vật Cashflow Trio"
    >
      <svg
        width="280"
        height="220"
        viewBox="0 0 340 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-56 h-40 md:w-72 md:h-52 drop-shadow-lg"
      >
        {/* Character 1 (Green tall rectangle) */}
        <g transform="rotate(-15 90 140)">
          <rect
            x="30"
            y="40"
            width="100"
            height="180"
            rx="22"
            fill={color}
            stroke="#FFFFFF"
            strokeWidth="4.5"
          />
          <ellipse cx="65" cy="95" rx="14" ry="17" fill="#FFFFFF" />
          <ellipse cx="69" cy="98" rx="4" ry="4.5" fill="#1E1B2E" />

          <ellipse cx="98" cy="93" rx="14" ry="17" fill="#FFFFFF" />
          <ellipse cx="102" cy="96" rx="4" ry="4.5" fill="#1E1B2E" />

          <path
            d="M62 135 Q82 155 102 135"
            stroke="#FFFFFF"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Character 2 (Orange middle pill) */}
        <g transform="rotate(10 180 160)">
          <rect
            x="135"
            y="65"
            width="90"
            height="150"
            rx="45"
            fill="#FF9900"
            stroke="#FFFFFF"
            strokeWidth="4.5"
          />
          <ellipse cx="165" cy="115" rx="13" ry="16" fill="#FFFFFF" />
          <ellipse cx="168" cy="118" rx="3.5" ry="4" fill="#1E1B2E" />

          <ellipse cx="195" cy="113" rx="13" ry="16" fill="#FFFFFF" />
          <ellipse cx="198" cy="116" rx="3.5" ry="4" fill="#1E1B2E" />

          <path
            d="M165 145 Q180 156 195 145"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Character 3 (Pink tilted small box) */}
        <g transform="rotate(-30 250 170)">
          <rect
            x="200"
            y="110"
            width="100"
            height="95"
            rx="18"
            fill="#F5ABCE"
            stroke="#FFFFFF"
            strokeWidth="4.5"
          />
          <ellipse cx="235" cy="145" rx="13" ry="16" fill="#FFFFFF" />
          <ellipse cx="238" cy="148" rx="3.5" ry="4" fill="#1E1B2E" />

          <ellipse cx="265" cy="143" rx="13" ry="16" fill="#FFFFFF" />
          <ellipse cx="268" cy="146" rx="3.5" ry="4" fill="#1E1B2E" />

          <path
            d="M235 170 Q250 182 268 170"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

/**
 * Mascot 4: Big celebratory smile mascot (Thank you / End screen)
 */
export const BigSmileMascot: React.FC<MascotProps> = ({
  color = '#FF9900',
  className = '',
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative w-full max-w-md mx-auto cursor-pointer transition-transform hover:scale-105 active:scale-95 ${className} ${
        isSelected ? 'ring-4 ring-purple-600 ring-offset-4 rounded-3xl' : ''
      }`}
      title="Mascot chiến thắng"
    >
      <svg
        viewBox="0 0 500 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-md"
      >
        {/* Soft pink top curve */}
        <path
          d="M 20 230 C 50 100, 450 100, 480 230 Z"
          fill="#F5ABCE"
          opacity="0.8"
        />

        {/* Big orange bottom hill */}
        <path
          d="M 50 240 C 90 140, 410 140, 450 240 Z"
          fill={color}
        />

        {/* Left eye */}
        <ellipse cx="225" cy="145" rx="22" ry="32" fill="#FFFFFF" />
        <ellipse cx="230" cy="150" rx="6" ry="7" fill="#3D3A36" />

        {/* Right eye */}
        <ellipse cx="275" cy="145" rx="22" ry="32" fill="#FFFFFF" />
        <ellipse cx="280" cy="150" rx="6" ry="7" fill="#3D3A36" />

        {/* Happy smile */}
        <path
          d="M 195 185 C 220 220, 280 225, 305 200"
          stroke="#3D3A36"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};
