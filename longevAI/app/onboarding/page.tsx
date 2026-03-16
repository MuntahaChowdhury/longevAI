'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', age: '', sex: '', height: '', weight: '' });

  const steps = [
    { key: 'name', question: "Welcome. What should we call you?" },
    { key: 'age', question: "How old are you?" },
    { key: 'sex', question: "What is your biological sex?" },
    { key: 'height', question: "What is your height? (e.g., 5'9 or 175cm)" },
    { key: 'weight', question: "What is your weight? (lbs or kg)" }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Moves to the chat page when the form is done
      localStorage.setItem('demographic', JSON.stringify(formData));
      router.push('/chat');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Progress Bar */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white/80 transition-all duration-500 ease-out"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* Interactive Form Container */}
      <div className="z-10 w-full max-w-md p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl transition-all duration-500">
        <h2 className="text-2xl font-light mb-8 text-white/90 tracking-wide">
          {steps[step].question}
        </h2>

        <input
          autoFocus
          type="text"
          className="w-full bg-transparent border-b border-white/20 pb-2 text-xl outline-none focus:border-white/80 transition-colors mb-10 text-white placeholder:text-white/20"
          placeholder="Type your answer..."
          value={formData[steps[step].key as keyof typeof formData]}
          onChange={(e) => setFormData({ ...formData, [steps[step].key]: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && handleNext()}
        />

        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={() => setStep(Math.max(0, step - 1))}
            className={`text-sm text-white/40 hover:text-white transition-colors ${step === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            Back
          </button>
          
          <button 
            onClick={handleNext}
            className="px-6 py-2 rounded-full bg-white text-black font-medium hover:scale-105 transition-transform"
          >
            {step === steps.length - 1 ? 'Start Assessment' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}