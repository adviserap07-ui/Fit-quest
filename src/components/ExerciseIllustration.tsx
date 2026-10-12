import React from 'react';
import { Exercise } from '../types';

interface Props {
  animationType: Exercise['animationType'];
  isPlaying?: boolean;
  className?: string;
}

export const ExerciseIllustration: React.FC<Props> = ({
  animationType,
  isPlaying = true,
  className = 'w-full h-48'
}) => {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#14171d] border border-slate-800/80 p-4 ${className}`}>
      {/* Background gym grid aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(#272b33_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

      {/* Stylized animated SVG avatar figure based on animationType */}
      <svg
        viewBox="0 0 200 160"
        className="w-full h-full max-h-48 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="limeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bef264" />
            <stop offset="100%" stopColor="#84cc16" />
          </linearGradient>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
        </defs>

        {/* Floor Line */}
        <line x1="20" y1="140" x2="180" y2="140" stroke="#334155" strokeWidth="2.5" strokeDasharray="4 4" />

        {/* SQUAT ANIMATION */}
        {animationType === 'squat' && (
          <g className={isPlaying ? 'animate-bounce duration-1000' : ''} style={{ animationDuration: '2.4s' }}>
            {/* Head */}
            <circle cx="100" cy="40" r="12" fill="url(#limeGlow)" />
            {/* Torso */}
            <line x1="100" y1="52" x2="95" y2="88" stroke="url(#bodyGradient)" strokeWidth="8" strokeLinecap="round" />
            {/* Arms reaching forward for balance */}
            <line x1="98" y1="62" x2="135" y2="65" stroke="url(#bodyGradient)" strokeWidth="6" strokeLinecap="round" />
            {/* Thigh */}
            <line x1="95" y1="88" x2="68" y2="106" stroke="url(#limeGlow)" strokeWidth="7" strokeLinecap="round" />
            {/* Shin */}
            <line x1="68" y1="106" x2="72" y2="140" stroke="url(#bodyGradient)" strokeWidth="7" strokeLinecap="round" />
            {/* Other leg for depth */}
            <line x1="95" y1="88" x2="120" y2="106" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
            <line x1="120" y1="106" x2="116" y2="140" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
            {/* Feet */}
            <ellipse cx="74" cy="140" rx="9" ry="3.5" fill="#94a3b8" />
            <ellipse cx="118" cy="140" rx="9" ry="3.5" fill="#64748b" />
          </g>
        )}

        {/* WALL PUSHUP */}
        {animationType === 'wall_pushup' && (
          <g>
            {/* Wall */}
            <rect x="160" y="20" width="8" height="120" rx="2" fill="#38bdf8" opacity="0.6" />
            <g className={isPlaying ? 'animate-pulse' : ''} style={{ animationDuration: '2.5s' }}>
              {/* Head */}
              <circle cx="95" cy="50" r="11" fill="url(#limeGlow)" />
              {/* Torso angled */}
              <line x1="92" y1="60" x2="70" y2="105" stroke="url(#bodyGradient)" strokeWidth="8" strokeLinecap="round" />
              {/* Arms pushing wall */}
              <line x1="90" y1="66" x2="160" y2="66" stroke="url(#limeGlow)" strokeWidth="6" strokeLinecap="round" />
              {/* Legs */}
              <line x1="70" y1="105" x2="48" y2="140" stroke="url(#bodyGradient)" strokeWidth="7" strokeLinecap="round" />
              {/* Feet */}
              <ellipse cx="46" cy="140" rx="8" ry="3" fill="#94a3b8" />
            </g>
          </g>
        )}

        {/* PUSHUP / PLANK */}
        {(animationType === 'pushup' || animationType === 'plank') && (
          <g className={isPlaying ? 'animate-pulse' : ''} style={{ animationDuration: '2s' }}>
            {/* Head */}
            <circle cx="155" cy="85" r="10" fill="url(#limeGlow)" />
            {/* Torso straight plank line */}
            <line x1="145" y1="92" x2="70" y2="110" stroke="url(#bodyGradient)" strokeWidth="8" strokeLinecap="round" />
            {/* Arms */}
            <line x1="140" y1="94" x2="140" y2="138" stroke="url(#limeGlow)" strokeWidth="6" strokeLinecap="round" />
            {/* Legs */}
            <line x1="70" y1="110" x2="35" y2="136" stroke="url(#bodyGradient)" strokeWidth="7" strokeLinecap="round" />
            {/* Feet */}
            <circle cx="34" cy="138" r="4" fill="#94a3b8" />
          </g>
        )}

        {/* BIRD DOG */}
        {animationType === 'bird_dog' && (
          <g className={isPlaying ? 'animate-pulse' : ''} style={{ animationDuration: '2.6s' }}>
            {/* Extended Arm */}
            <line x1="115" y1="90" x2="175" y2="85" stroke="url(#limeGlow)" strokeWidth="6" strokeLinecap="round" />
            {/* Head */}
            <circle cx="120" cy="78" r="9" fill="url(#limeGlow)" />
            {/* Flat Torso */}
            <line x1="115" y1="90" x2="70" y2="90" stroke="url(#bodyGradient)" strokeWidth="8" strokeLinecap="round" />
            {/* Supporting Arm on floor */}
            <line x1="108" y1="90" x2="108" y2="138" stroke="url(#bodyGradient)" strokeWidth="6" strokeLinecap="round" />
            {/* Supporting Knee on floor */}
            <line x1="75" y1="90" x2="75" y2="138" stroke="url(#bodyGradient)" strokeWidth="6" strokeLinecap="round" />
            {/* Extended Leg */}
            <line x1="70" y1="90" x2="25" y2="86" stroke="url(#limeGlow)" strokeWidth="7" strokeLinecap="round" />
          </g>
        )}

        {/* GLUTE BRIDGE */}
        {animationType === 'glute_bridge' && (
          <g className={isPlaying ? 'animate-pulse' : ''} style={{ animationDuration: '2.2s' }}>
            {/* Head & shoulders on floor */}
            <circle cx="45" cy="130" r="10" fill="url(#limeGlow)" />
            {/* Torso bridging upward */}
            <line x1="55" y1="130" x2="105" y2="92" stroke="url(#limeGlow)" strokeWidth="8" strokeLinecap="round" />
            {/* Thighs */}
            <line x1="105" y1="92" x2="140" y2="115" stroke="url(#bodyGradient)" strokeWidth="7" strokeLinecap="round" />
            {/* Lower legs */}
            <line x1="140" y1="115" x2="138" y2="140" stroke="url(#bodyGradient)" strokeWidth="7" strokeLinecap="round" />
            {/* Arms resting on floor */}
            <line x1="55" y1="135" x2="95" y2="138" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
          </g>
        )}

        {/* MARCH IN PLACE / KNEE RAISES */}
        {(animationType === 'march_in_place' || animationType === 'knee_raises') && (
          <g className={isPlaying ? 'animate-bounce' : ''} style={{ animationDuration: '1.4s' }}>
            {/* Head */}
            <circle cx="100" cy="35" r="11" fill="url(#limeGlow)" />
            {/* Torso upright */}
            <line x1="100" y1="46" x2="98" y2="90" stroke="url(#bodyGradient)" strokeWidth="8" strokeLinecap="round" />
            {/* Pumping arms */}
            <line x1="100" y1="56" x2="125" y2="68" stroke="url(#bodyGradient)" strokeWidth="6" strokeLinecap="round" />
            <line x1="100" y1="56" x2="75" y2="72" stroke="url(#bodyGradient)" strokeWidth="6" strokeLinecap="round" />
            {/* High Knee */}
            <line x1="98" y1="90" x2="128" y2="88" stroke="url(#limeGlow)" strokeWidth="7" strokeLinecap="round" />
            <line x1="128" y1="88" x2="126" y2="118" stroke="url(#limeGlow)" strokeWidth="6" strokeLinecap="round" />
            {/* Standing Leg */}
            <line x1="98" y1="90" x2="88" y2="140" stroke="url(#bodyGradient)" strokeWidth="7" strokeLinecap="round" />
            <ellipse cx="86" cy="140" rx="8" ry="3" fill="#94a3b8" />
          </g>
        )}

        {/* CAT COW */}
        {animationType === 'cat_cow' && (
          <g className={isPlaying ? 'animate-pulse' : ''} style={{ animationDuration: '3s' }}>
            {/* Head */}
            <circle cx="140" cy="80" r="10" fill="url(#limeGlow)" />
            {/* Rounded spine */}
            <path d="M 65 100 Q 100 70 132 94" fill="none" stroke="url(#limeGlow)" strokeWidth="8" strokeLinecap="round" />
            {/* Arms on floor */}
            <line x1="128" y1="96" x2="128" y2="138" stroke="url(#bodyGradient)" strokeWidth="6" strokeLinecap="round" />
            {/* Knees on floor */}
            <line x1="70" y1="102" x2="70" y2="138" stroke="url(#bodyGradient)" strokeWidth="6" strokeLinecap="round" />
          </g>
        )}

        {/* CHILD'S POSE */}
        {animationType === 'child_pose' && (
          <g>
            {/* Kneeling hips back */}
            <ellipse cx="55" cy="120" rx="14" ry="12" fill="url(#bodyGradient)" />
            {/* Lower legs tucked under */}
            <line x1="55" y1="125" x2="40" y2="138" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
            {/* Reaching back & head down */}
            <path d="M 65 120 Q 95 122 135 130" fill="none" stroke="url(#limeGlow)" strokeWidth="8" strokeLinecap="round" />
            <circle cx="120" cy="130" r="9" fill="url(#limeGlow)" />
            {/* Extended arms forward */}
            <line x1="110" y1="128" x2="165" y2="138" stroke="url(#limeGlow)" strokeWidth="6" strokeLinecap="round" />
          </g>
        )}

        {/* SHOULDER TAPS */}
        {animationType === 'shoulder_taps' && (
          <g className={isPlaying ? 'animate-pulse' : ''} style={{ animationDuration: '1.8s' }}>
            <circle cx="140" cy="72" r="10" fill="url(#limeGlow)" />
            <line x1="130" y1="80" x2="70" y2="105" stroke="url(#bodyGradient)" strokeWidth="8" strokeLinecap="round" />
            {/* One hand tapping opposite shoulder */}
            <path d="M 125 84 Q 140 100 120 95" fill="none" stroke="url(#limeGlow)" strokeWidth="6" strokeLinecap="round" />
            {/* Supporting hand planted */}
            <line x1="125" y1="85" x2="125" y2="138" stroke="url(#bodyGradient)" strokeWidth="6" strokeLinecap="round" />
            {/* Legs */}
            <line x1="70" y1="105" x2="35" y2="138" stroke="url(#bodyGradient)" strokeWidth="7" strokeLinecap="round" />
          </g>
        )}

        {/* LUNGES */}
        {animationType === 'lunges' && (
          <g className={isPlaying ? 'animate-pulse' : ''} style={{ animationDuration: '2.5s' }}>
            {/* Head */}
            <circle cx="100" cy="40" r="11" fill="url(#limeGlow)" />
            {/* Torso tall */}
            <line x1="100" y1="52" x2="100" y2="92" stroke="url(#bodyGradient)" strokeWidth="8" strokeLinecap="round" />
            {/* Hands on hips */}
            <path d="M 100 62 L 115 75 L 105 85" fill="none" stroke="url(#bodyGradient)" strokeWidth="5" strokeLinecap="round" />
            {/* Front Leg bent at 90 deg */}
            <line x1="100" y1="92" x2="130" y2="100" stroke="url(#limeGlow)" strokeWidth="7" strokeLinecap="round" />
            <line x1="130" y1="100" x2="130" y2="140" stroke="url(#limeGlow)" strokeWidth="7" strokeLinecap="round" />
            {/* Back Leg stepped back */}
            <line x1="100" y1="92" x2="65" y2="115" stroke="url(#bodyGradient)" strokeWidth="6" strokeLinecap="round" />
            <line x1="65" y1="115" x2="68" y2="136" stroke="url(#bodyGradient)" strokeWidth="6" strokeLinecap="round" />
          </g>
        )}
      </svg>

      {/* Form Cues tag overlay */}
      <div className="absolute bottom-2.5 right-3 text-[11px] font-medium text-slate-400 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/5">
        Bodyweight Movement
      </div>
    </div>
  );
};
