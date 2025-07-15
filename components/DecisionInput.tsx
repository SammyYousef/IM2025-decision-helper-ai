
import React from 'react';
import SpinnerIcon from './icons/SpinnerIcon';

interface DecisionInputProps {
  decision: string;
  setDecision: (value: string) => void;
  onAnalyze: (decision: string) => void;
  isLoading: boolean;
  error: string | null;
}

const DecisionInput: React.FC<DecisionInputProps> = ({ decision, setDecision, onAnalyze, isLoading, error }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(decision);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
      <form onSubmit={handleSubmit}>
        <label htmlFor="decision-input" className="block text-lg font-medium text-gray-300 mb-3">
          What decision are you weighing?
        </label>
        <textarea
          id="decision-input"
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          placeholder="e.g., Should I move to a new city for a job offer?"
          className="w-full bg-gray-900 border-2 border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg p-4 text-lg text-gray-100 transition duration-200 resize-none"
          rows={3}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !decision.trim()}
          className="mt-6 w-full flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {isLoading ? (
            <>
              <SpinnerIcon />
              Analyzing...
            </>
          ) : (
            'Analyze Decision'
          )}
        </button>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default DecisionInput;
