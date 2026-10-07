import React from 'react';
import ugmLogo from '../assets/images/ugmlogo.png';

interface UgmLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export const UgmLogo: React.FC<UgmLogoProps> = ({
  className = '',
  size = 40
}) => {
  return (
    <img
      src={ugmLogo}
      alt="Logo Universitas Gadjah Mada"
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
    />
  );
};