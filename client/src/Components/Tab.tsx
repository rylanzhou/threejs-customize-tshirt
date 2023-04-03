import React from 'react';

interface TabProps {
  tab: { name: string; icon: string };
  isFilterTab?: boolean;
  isActiveTab?: string;
  handleClick: () => void;
}

export default function Tab({ tab, handleClick }: TabProps) {
  return <div>Tab</div>;
}
