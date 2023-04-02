import React from 'react';

import { useSnapshot } from 'valtio';
import state from '../store';

interface CustomButtonProps {
  type: 'filled';
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
        color: '#fff',
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
