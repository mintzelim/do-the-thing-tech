import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLocation } from 'wouter';

export default function About() {
  const [, navigate] = useLocation();

  return (
    <div className="mobile-frame">
      <Navigation />
      <div className="mobile-content">
        <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="text-sm mb-8 text-black border-4 border-black px-4 py-3 active:translate-y-1 active:shadow-none transition-all hover:bg-gray-100"
          style={{
            boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.3)',
            fontFamily: 'VT323, monospace',
            fontSize: '12px',
            letterSpacing: '2px'
          }}
        >
          BACK TO HOME
        </button>

        {/* Main Title */}
        <div className="border-4 border-black p-6 mb-8 bg-white" style={{
          boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.3)',
        }}>
          <h1 className="text-4xl md:text-5xl mb-4 text-black" style={{
            fontFamily: 'VT323, monospace',
            fontSize: '36px',
            letterSpacing: '3px',
            lineHeight: '1.2'
          }}>
            ABOUT DO THE THING
          </h1>
          <p className="text-lg md:text-xl text-gray-700" style={{
            fontFamily: "'Noto Sans Mono', monospace",
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            Understanding ADHD, Task Management, and Why We Built This App
          </p>
        </div>

        {/* Mission Section */}
        <div className="border-4 border-black p-6 mb-6 bg-white" style={{
          boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.3)',
          fontFamily: "'Noto Sans Mono', monospace"
        }}>
          <h2 className="text-2xl md:text-3xl mb-4 text-black" style={{
            fontFamily: 'VT323, monospace',
            fontSize: '24px',
            letterSpacing: '2px'
          }}>
            OUR MISSION
          </h2>
          <div className="space-y-4 text-base md:text-lg text-gray-700" style={{
            fontFamily: "'Noto Sans Mono', monospace",
            fontSize: '14px',
            lineHeight: '1.8'
          }}>
            <p>
              DoTheThing exists to help neurodivergent individuals—especially those with ADHD—break down overwhelming tasks into manageable steps, estimate realistic time, and actually get things done.
            </p>
            <p>
              We believe that executive dysfunction isn't a personal failure. It's a neurological difference that deserves tools designed specifically for how ADHD brains work.
            </p>
          </div>
        </div>

        {/* ADHD & Task Management */}
        <div className="border-4 border-black p-6 mb-6 bg-white" style={{
          boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.3)',
          fontFamily: "'Noto Sans Mono', monospace"
        }}>
          <h2 className="text-2xl md:text-3xl mb-4 text-black" style={{
            fontFamily: 'VT323, monospace',
            fontSize: '24px',
            letterSpacing: '2px'
          }}>
            ADHD AND TASK MANAGEMENT
          </h2>
          <div className="space-y-4 text-base md:text-lg text-gray-700" style={{
            fontFamily: "'Noto Sans Mono', monospace",
            fontSize: '14px',
            lineHeight: '1.8'
          }}>
            <p>
              People with ADHD often struggle with executive function—the brain's ability to plan, organize, and execute tasks. This isn't laziness or lack of motivation. It's how their neurology works.
            </p>
            <p className="font-bold">Common challenges include:</p>
            <ul className="space-y-2 ml-6">
              <li>• <strong>Time Blindness:</strong> Difficulty perceiving how much time has passed or will be needed</li>
              <li>• <strong>Task Paralysis:</strong> Feeling overwhelmed by large tasks and not knowing where to start</li>
              <li>• <strong>Executive Dysfunction:</strong> Difficulty initiating, planning, and completing tasks</li>
              <li>• <strong>Time Estimation Errors:</strong> Consistently underestimating how long things take</li>
              <li>• <strong>Hyperfocus Variability:</strong> Ability to focus intensely on interesting tasks but struggling with boring ones</li>
            </ul>
          </div>
        </div>

        {/* Why DoTheThing Exists */}
        <div className="border-4 border-black p-6 mb-6 bg-white" style={{
          boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.3)',
          fontFamily: "'Noto Sans Mono', monospace"
        }}>
          <h2 className="text-2xl md:text-3xl mb-4 text-black" style={{
            fontFamily: 'VT323, monospace',
            fontSize: '24px',
            letterSpacing: '2px'
          }}>
            WHY DO THE THING EXISTS
          </h2>
          <div className="space-y-4 text-base md:text-lg text-gray-700" style={{
            fontFamily: "'Noto Sans Mono', monospace",
            fontSize: '14px',
            lineHeight: '1.8'
          }}>
            <p>
              Traditional task management apps were built for neurotypical brains. They assume you can estimate time accurately, break down tasks logically, and maintain focus on boring work. For ADHD brains, these apps often make things worse.
            </p>
            <p>
              DoTheThing is different. We built it specifically for how ADHD brains work:
            </p>
            <ul className="space-y-2 ml-6">
              <li>• <strong>AI-Powered Breakdown:</strong> Instantly breaks tasks into micro-steps</li>
              <li>• <strong>Smart Time Estimates:</strong> Includes buffers for time blindness (20-30%)</li>
              <li>• <strong>Focus-Level Adjustment:</strong> Estimates change based on your focus level today</li>
              <li>• <strong>Countdown Timer:</strong> Visual timer to help with time perception</li>
              <li>• <strong>Minimal Friction:</strong> No complex setup. Start immediately.</li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="border-4 border-black p-6 mb-6 bg-white" style={{
          boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.3)',
          fontFamily: "'Noto Sans Mono', monospace"
        }}>
          <h2 className="text-2xl md:text-3xl mb-4 text-black" style={{
            fontFamily: 'VT323, monospace',
            fontSize: '24px',
            letterSpacing: '2px'
          }}>
            HOW IT WORKS
          </h2>
          <div className="space-y-4 text-base md:text-lg text-gray-700" style={{
            fontFamily: "'Noto Sans Mono', monospace",
            fontSize: '14px',
            lineHeight: '1.8'
          }}>
            <div className="border-2 border-gray-300 p-4">
              <p className="font-bold mb-2">1. BRAIN DUMP</p>
              <p>Enter a single task or brain dump everything you need to do. No organization needed.</p>
            </div>
            <div className="border-2 border-gray-300 p-4">
              <p className="font-bold mb-2">2. SELECT FOCUS LEVEL</p>
              <p>Tell us if you're hyperfocused, normal, or distracted today. This adjusts time estimates.</p>
            </div>
            <div className="border-2 border-gray-300 p-4">
              <p className="font-bold mb-2">3. CHOOSE BREAKDOWN SIZE</p>
              <p>Pick how detailed you want the breakdown: Tiny Steps, Balanced, or Big Milestones.</p>
            </div>
            <div className="border-2 border-gray-300 p-4">
              <p className="font-bold mb-2">4. GET AI BREAKDOWN</p>
              <p>AI instantly breaks your task into micro-steps with realistic time estimates.</p>
            </div>
            <div className="border-2 border-gray-300 p-4">
              <p className="font-bold mb-2">5. EDIT & EXECUTE</p>
              <p>Adjust steps, check them off, and use the countdown timer to stay on track.</p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="border-4 border-black p-6 mb-6 bg-white" style={{
          boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.3)',
          fontFamily: "'Noto Sans Mono', monospace"
        }}>
          <h2 className="text-2xl md:text-3xl mb-4 text-black" style={{
            fontFamily: 'VT323, monospace',
            fontSize: '24px',
            letterSpacing: '2px'
          }}>
            KEY FEATURES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base md:text-lg text-gray-700" style={{
            fontFamily: "'Noto Sans Mono', monospace",
            fontSize: '14px',
            lineHeight: '1.8'
          }}>
            <div className="border-2 border-gray-300 p-4">
              <p className="font-bold mb-2">AI Task Breakdown</p>
              <p>Instantly decompose tasks into actionable steps</p>
            </div>
            <div className="border-2 border-gray-300 p-4">
              <p className="font-bold mb-2">Smart Time Estimates</p>
              <p>Realistic estimates with ADHD-friendly buffers</p>
            </div>
            <div className="border-2 border-gray-300 p-4">
              <p className="font-bold mb-2">Focus Level Adjustment</p>
              <p>Estimates change based on your focus today</p>
            </div>
            <div className="border-2 border-gray-300 p-4">
              <p className="font-bold mb-2">Countdown Timer</p>
              <p>Visual timer to help with time perception</p>
            </div>
            <div className="border-2 border-gray-300 p-4">
              <p className="font-bold mb-2">Editable Steps</p>
              <p>Adjust, delete, or reorder steps as needed</p>
            </div>
            <div className="border-2 border-gray-300 p-4">
              <p className="font-bold mb-2">No Login Required</p>
              <p>Start immediately. Use as a guest.</p>
            </div>
          </div>
        </div>

        {/* For Whom */}
        <div className="border-4 border-black p-6 mb-6 bg-white" style={{
          boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.3)',
          fontFamily: "'Noto Sans Mono', monospace"
        }}>
          <h2 className="text-2xl md:text-3xl mb-4 text-black" style={{
            fontFamily: 'VT323, monospace',
            fontSize: '24px',
            letterSpacing: '2px'
          }}>
            FOR WHOM
          </h2>
          <div className="space-y-4 text-base md:text-lg text-gray-700" style={{
            fontFamily: "'Noto Sans Mono', monospace",
            fontSize: '14px',
            lineHeight: '1.8'
          }}>
            <p>DoTheThing is built for:</p>
            <ul className="space-y-2 ml-6">
              <li>• People with ADHD who struggle with task initiation and time management</li>
              <li>• Anyone with executive dysfunction or time blindness</li>
              <li>• Neurodivergent individuals who need tools designed for their brain</li>
              <li>• People who feel overwhelmed by large projects</li>
              <li>• Anyone who consistently underestimates how long things take</li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-4 border-black p-6 mb-8 bg-white" style={{
          boxShadow: '6px 6px 0px rgba(0, 0, 0, 0.3)',
          fontFamily: "'Noto Sans Mono', monospace"
        }}>
          <h2 className="text-2xl md:text-3xl mb-4 text-black" style={{
            fontFamily: 'VT323, monospace',
            fontSize: '24px',
            letterSpacing: '2px'
          }}>
            READY TO DO THE THING?
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-6" style={{
            fontFamily: "'Noto Sans Mono', monospace",
            fontSize: '14px',
            lineHeight: '1.8'
          }}>
            Start breaking down your tasks right now. No signup required. No credit card. Just enter your task and let AI do the work.
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-sm md:text-base bg-black text-white border-4 border-black px-6 py-4 hover:bg-gray-800 active:translate-y-1 active:shadow-none transition-all"
            style={{
              boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.3)',
              fontFamily: 'VT323, monospace',
              fontSize: '14px',
              letterSpacing: '2px'
            }}
          >
            START NOW
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t-4 border-black">
          <p className="text-sm md:text-base text-gray-600" style={{
            fontFamily: "'Noto Sans Mono', monospace",
            fontSize: '12px'
          }}>
            DoTheThing is a free tool designed for neurodivergent individuals. Built with care by people who understand ADHD.
          </p>
        </div>
        </div>
      </div>
      
        {/* Footer Navigation */}
      <Footer />
    </div>
  );
}
