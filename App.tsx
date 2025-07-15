
import React, { useState, useCallback } from 'react';
import { type Argument } from './types';
import { analyzeDecision } from './services/geminiService';
import DecisionInput from './components/DecisionInput';
import ArgumentList from './components/ArgumentList';
import Summary from './components/Summary';
import BrainIcon from './components/icons/BrainIcon';

const App: React.FC = () => {
  const [decision, setDecision] = useState<string>('');
  const [pros, setPros] = useState<Argument[]>([]);
  const [cons, setCons] = useState<Argument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisDone, setAnalysisDone] = useState<boolean>(false);

  const handleAnalysis = useCallback(async (currentDecision: string) => {
    if (!currentDecision.trim()) {
      setError('Please enter a decision to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisDone(false);

    try {
      const result = await analyzeDecision(currentDecision);
      setPros(result.pros.map(text => ({ id: crypto.randomUUID(), text, weight: 5 })));
      setCons(result.cons.map(text => ({ id: crypto.randomUUID(), text, weight: 5 })));
      setAnalysisDone(true);
    } catch (err) {
      setError(err instanceof Error ? `Failed to get analysis. ${err.message}` : 'An unknown error occurred.');
      setAnalysisDone(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetState = () => {
    setDecision('');
    setPros([]);
    setCons([]);
    setIsLoading(false);
    setError(null);
    setAnalysisDone(false);
  };

  const updateArgument = (listSetter: React.Dispatch<React.SetStateAction<Argument[]>>) => (id: string, newWeight: number) => {
    listSetter(prev => prev.map(item => item.id === id ? { ...item, weight: newWeight } : item));
  };
  
  const addArgument = (listSetter: React.Dispatch<React.SetStateAction<Argument[]>>) => (text: string) => {
      if(text.trim()){
          listSetter(prev => [...prev, {id: crypto.randomUUID(), text, weight: 5}]);
      }
  };

  const removeArgument = (listSetter: React.Dispatch<React.SetStateAction<Argument[]>>) => (id: string) => {
    listSetter(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-6xl text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-2">
          <BrainIcon />
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            IM2025 Decision Helper AI
          </h1>
        </div>
        <p className="text-gray-400 text-lg">Unpack your dilemma. Weigh every angle.</p>
        <p className="text-gray-500 text-md mt-1">A Bureaucrat Bot by Sammy Yousef for IM2025.</p>
      </header>
      
      <main className="w-full max-w-6xl">
        {!analysisDone && (
          <DecisionInput 
            decision={decision}
            setDecision={setDecision}
            onAnalyze={handleAnalysis}
            isLoading={isLoading}
            error={error}
          />
        )}
        
        {analysisDone && (
          <div className="animate-fade-in">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
              <h2 className="text-xl font-semibold text-gray-300 mb-2">Your Dilemma:</h2>
              <p className="text-2xl text-white">"{decision}"</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <ArgumentList 
                title="Pros"
                titleColor="text-green-400"
                arguments={pros} 
                onUpdateArgument={updateArgument(setPros)}
                onAddArgument={addArgument(setPros)}
                onRemoveArgument={removeArgument(setPros)}
              />
              <ArgumentList 
                title="Cons"
                titleColor="text-red-400"
                arguments={cons} 
                onUpdateArgument={updateArgument(setCons)}
                onAddArgument={addArgument(setCons)}
                onRemoveArgument={removeArgument(setCons)}
              />
            </div>
            
            <Summary pros={pros} cons={cons} />
            
            <div className="text-center mt-12">
              <button 
                onClick={resetState}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 shadow-md">
                Start a New Decision
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
