
import React from 'react';
import { type Argument } from '../types';
import TrashIcon from './icons/TrashIcon';

interface ArgumentItemProps {
  argument: Argument;
  onUpdateWeight: (weight: number) => void;
  onRemove: () => void;
}

const ArgumentItem: React.FC<ArgumentItemProps> = ({ argument, onUpdateWeight, onRemove }) => {
  return (
    <div className="bg-gray-700/50 p-4 rounded-lg flex flex-col gap-3 transition-shadow hover:shadow-md animate-fade-in-up">
      <div className="flex justify-between items-start">
        <p className="text-gray-200 flex-1 pr-2">{argument.text}</p>
        <button onClick={onRemove} className="text-gray-500 hover:text-red-400 transition-colors flex-shrink-0">
            <TrashIcon />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <label htmlFor={`weight-${argument.id}`} className="text-sm font-medium text-gray-400">Weight</label>
        <input
          id={`weight-${argument.id}`}
          type="range"
          min="1"
          max="10"
          value={argument.weight}
          onChange={(e) => onUpdateWeight(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <span className="text-blue-400 font-semibold w-8 text-center">{argument.weight}</span>
      </div>
    </div>
  );
};

export default ArgumentItem;
