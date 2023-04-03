import React from 'react';
import { useSnapshot } from 'valtio';

import { getContrastingColor } from '../config/helper';
import state from '../store';

interface CustomButtonProps {
  type: 'filled' | 'outline';
  title: string;
  customStyles?: string;
  handleClick?: () => void;
}

export default function CustomButton({
  type,
  title,
  customStyles,
  handleClick,
}: CustomButtonProps) {
  const snap = useSnapshot(state);

  const generateStyle = (type: string): React.CSSProperties | undefined => {
    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    }
    if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}
