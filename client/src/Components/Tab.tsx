import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

interface TabProps {
  tab: { name: string; icon: string };
  isFilterTab?: boolean;
  isActiveTab?: boolean;
  handleClick: () => void;
}

export default function Tab({ tab, isFilterTab, isActiveTab, handleClick }: TabProps) {
  const snap = useSnapshot(state);

  const activeStyles: React.CSSProperties =
    isFilterTab && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : { backgroundColor: 'transparent', opacity: 1 };

  return (
    <div
      className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'}`}
      style={activeStyles}
      onClick={handleClick}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}
      />
    </div>
  );
}
