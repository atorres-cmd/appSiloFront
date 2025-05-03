import React from 'react';

interface CustomSvgIconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
}

const CustomSvgIcon: React.FC<CustomSvgIconProps> = ({ name, className = "", size = 30, color }) => {
  return (
    <div 
      className={className}
      style={{ 
        width: size, 
        height: size,
        backgroundImage: `url(/icons/${name}.svg)`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: color ? `invert(100%) sepia(100%) saturate(10000%) hue-rotate(${color === 'yellow' ? '60deg' : '0deg'})` : undefined
      }}
    />
  );
};

export default CustomSvgIcon;
