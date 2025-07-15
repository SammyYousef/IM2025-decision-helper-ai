
import React, { useState } from 'react';
import { type Argument } from '../types';
import ArgumentItem from './ArgumentItem';
import PlusIcon from './icons/PlusIcon';

interface ArgumentListProps {
  title: string;
  titleColor: string;
  arguments: Argument[];
  onUpdateArgument: (id: string, weight: number) => void;
  onAddArgument: (text: string) => void;
  onRemoveArgument: (id: string) => void;
}

const ArgumentList: React.FC<ArgumentListProps> = ({ title, titleColor, arguments: args, onUpdateArgument, onAddArgument, onRemoveArgument }) => {
  const [newItemText, setNewItemText] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemText.trim()) {
      onAddArgument(newItemText);
      setNewItemText('');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 h-full flex flex-col">
      <h3 className={`text-3xl font-bold mb-6 text-center ${titleColor}`}>{title}</h3>
      <div className="space-y-4 flex-grow overflow-y-auto pr-2 -mr-2" style={{maxHeight: '400px'}}>
        {args.length > 0 ? (
          args.map(arg => (
            <ArgumentItem 
              key={arg.id} 
              argument={arg} 
              onUpdateWeight={(weight) => onUpdateArgument(arg.id, weight)}
              onRemove={() => onRemoveArgument(arg.id)}
            />
          ))
        ) : (
            <p className="text-gray-500 text-center py-8">No {title.toLowerCase()} added yet.</p>
        )}
      </div>
      <form onSubmit={handleAdd} className="mt-6 flex gap-2">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder={`Add a new ${title.slice(0, -1).toLowerCase()}...`}
          className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors flex-shrink-0">
          <PlusIcon />
        </button>
      </form>
    </div>
  );
};

export default ArgumentList;
