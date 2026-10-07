import React from 'react';
import { TionMascot } from './TionMascot';

interface MascotProps {
  mood?: 'happy' | 'cheer' | 'thinking' | 'sad' | 'talking';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bubbleText?: string;
  className?: string;
}

export const MascotOwl: React.FC<MascotProps> = ({
  mood = 'happy',
  size = 'md',
  bubbleText,
  className = ''
}) => {
  return (
    <TionMascot
      mood={mood}
      size={size}
      bubbleText={bubbleText}
      className={className}
    />
  );
};
