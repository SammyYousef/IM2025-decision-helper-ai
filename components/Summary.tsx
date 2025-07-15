
import React, { useMemo } from 'react';
import { type Argument } from '../types';

interface SummaryProps {
  pros: Argument[];
  cons: Argument[];
}

const Summary: React.FC<SummaryProps> = ({ pros, cons }) => {
  const { proScore, conScore } = useMemo(() => {
    const proScore = pros.reduce((acc, curr) => acc + curr.weight, 0);
    const conScore = cons.reduce((acc, curr) => acc + curr.weight, 0);
    return { proScore, conScore };
  }, [pros, cons]);

  const totalScore = proScore + conScore;
  const proPercentage = totalScore > 0 ? Math.round((proScore / totalScore) * 100) : 50;
  const conPercentage = totalScore > 0 ? 100 - proPercentage : 50;
  
  const recommendation = useMemo(() => {
      if (proScore === 0 && conScore === 0) return "Add and weigh some points to see a recommendation.";
      const difference = proScore - conScore;
      if (difference > 5) return "Based on your weighting, the pros strongly outweigh the cons. This looks like a favorable decision.";
      if (difference > 0) return "The pros have a slight edge. This decision seems more beneficial than not.";
      if (difference === 0) return "The pros and cons are evenly balanced. This is a tough call, consider which points matter most in the long run.";
      if (difference < -5) return "The cons heavily outweigh the pros. You should proceed with caution or reconsider your options.";
      return "The cons have a slight edge. It might be worth re-evaluating the potential downsides.";
  }, [proScore, conScore]);

  return (
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
      <h3 className="text-3xl font-bold mb-6 text-center text-white">Analysis Summary</h3>
      <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-400">Pros: {proScore}</span>
          <span className="text-2xl font-bold text-red-400">Cons: {conScore}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-6 flex overflow-hidden mb-6">
        <div 
          className="bg-green-500 h-6 transition-all duration-500"
          style={{ width: `${proPercentage}%` }}
        ></div>
        <div 
          className="bg-red-500 h-6 transition-all duration-500"
          style={{ width: `${conPercentage}%` }}
        ></div>
      </div>
      <div className="text-center bg-gray-900/50 p-4 rounded-lg">
          <p className="text-lg text-gray-300">{recommendation}</p>
      </div>
    </div>
  );
};

export default Summary;
