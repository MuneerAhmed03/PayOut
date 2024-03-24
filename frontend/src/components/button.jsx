import React from 'react';

export const Button = ({label,onClick}) => {
  return (
    <button onClick={onClick} className="w-full bg-sky-800 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded">
      {label}
    </button>
  );
};

