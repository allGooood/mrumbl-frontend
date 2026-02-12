import React from 'react';

interface ListProps {
  children: React.ReactNode;
  className?: string;
}

const List: React.FC<ListProps> = ({ children, className = "" }) => {
  return (
    <ul className={`flex flex-col gap-1 overflow-y-auto ${className}`.trim()}>
      {children}
    </ul>
  );
};

export default List;
