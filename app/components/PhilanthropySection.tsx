'use client';

import { useRef, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

// ─── SVG: Dual-dog illustration — Amstaff (left) + Akita (right) ───────────
// Museum-quality luxury brand register. ViewBox 0 0 260 160.

function DogSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <defs>

        {/* ════ FILTERS ════ */}
        <filter id="duo-soft-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="duo-ambient" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="duo-blur-soft" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>

        {/* ════ SHARED GRADIENTS ════ */}
        <radialGradient id="duo-ground-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C5956B" stopOpacity="0.14" />
          <stop offset="60%" stopColor="#C5956B" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#C5956B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="duo-shadow-am" cx="50%" cy="20%" r="50%">
          <stop offset="0%" stopColor="#7A5535" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7A5535" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="duo-shadow-ak" cx="50%" cy="20%" r="50%">
          <stop offset="0%" stopColor="#9A8A72" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#9A8A72" stopOpacity="0" />
        </radialGradient>

        {/* ════ AMSTAFF GRADIENTS (sand/fawn, light upper-left) ════ */}
        <linearGradient id="duo-am-body" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#F0DCC8" />
          <stop offset="25%" stopColor="#E8CDB5" />
          <stop offset="55%" stopColor="#D4A574" />
          <stop offset="80%" stopColor="#C5956B" />
          <stop offset="100%" stopColor="#A0754E" />
        </linearGradient>
        <linearGradient id="duo-am-body-dark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5956B" />
          <stop offset="50%" stopColor="#A0754E" />
          <stop offset="100%" stopColor="#7A5535" />
        </linearGradient>
        <radialGradient id="duo-am-torso-vol" cx="38%" cy="28%" r="62%">
          <stop offset="0%" stopColor="#F0DCC8" stopOpacity="1" />
          <stop offset="35%" stopColor="#D4A574" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#C5956B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7A5535" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id="duo-am-head-top" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#F0DCC8" />
          <stop offset="40%" stopColor="#E8CDB5" />
          <stop offset="75%" stopColor="#D4A574" />
          <stop offset="100%" stopColor="#A0754E" />
        </linearGradient>
        <radialGradient id="duo-am-head-vol" cx="30%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#F0DCC8" stopOpacity="1" />
          <stop offset="45%" stopColor="#D4A574" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7A5535" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id="duo-am-muzzle" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#D4A574" />
          <stop offset="50%" stopColor="#C5956B" />
          <stop offset="100%" stopColor="#7A5535" />
        </linearGradient>
        <linearGradient id="duo-am-ear-outer" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5956B" />
          <stop offset="60%" stopColor="#A0754E" />
          <stop offset="100%" stopColor="#7A5535" />
        </linearGradient>
        <linearGradient id="duo-am-leg-l" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#E8CDB5" />
          <stop offset="40%" stopColor="#D4A574" />
          <stop offset="100%" stopColor="#A0754E" />
        </linearGradient>
        <linearGradient id="duo-am-leg-r" x1="5%" y1="0%" x2="95%" y2="100%">
          <stop offset="0%" stopColor="#D4A574" />
          <stop offset="60%" stopColor="#C5956B" />
          <stop offset="100%" stopColor="#7A5535" />
        </linearGradient>
        <linearGradient id="duo-am-haunch" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#D4A574" />
          <stop offset="45%" stopColor="#C5956B" />
          <stop offset="80%" stopColor="#A0754E" />
          <stop offset="100%" stopColor="#7A5535" />
        </linearGradient>
        <radialGradient id="duo-am-eye-iris" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#7A4A1A" />
          <stop offset="50%" stopColor="#4A2E0A" />
          <stop offset="100%" stopColor="#2A1A04" />
        </radialGradient>
        <radialGradient id="duo-am-nose" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#5A3D22" />
          <stop offset="60%" stopColor="#3A2A1A" />
          <stop offset="100%" stopColor="#1E1208" />
        </radialGradient>
        <linearGradient id="duo-am-paw" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A574" />
          <stop offset="100%" stopColor="#A0754E" />
        </linearGradient>

        {/* ════ AKITA GRADIENTS (white/cream, light upper-left) ════ */}
        <linearGradient id="duo-ak-body" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#FAFAF5" />
          <stop offset="50%" stopColor="#F5F0E8" />
          <stop offset="75%" stopColor="#E8DFD0" />
          <stop offset="100%" stopColor="#D4C4B0" />
        </linearGradient>
        <linearGradient id="duo-ak-body-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8DFD0" />
          <stop offset="50%" stopColor="#D4C4B0" />
          <stop offset="100%" stopColor="#9A8A72" />
        </linearGradient>
        <radialGradient id="duo-ak-torso-vol" cx="55%" cy="25%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="30%" stopColor="#F5F0E8" stopOpacity="0.95" />
          <stop offset="65%" stopColor="#E8DFD0" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#B8A890" stopOpacity="0.65" />
        </radialGradient>
        <linearGradient id="duo-ak-head" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FAFAF5" />
          <stop offset="65%" stopColor="#F5F0E8" />
          <stop offset="100%" stopColor="#D4C4B0" />
        </linearGradient>
        <radialGradient id="duo-ak-head-vol" cx="55%" cy="28%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="40%" stopColor="#F5F0E8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#B8A890" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id="duo-ak-muzzle" x1="60%" y1="0%" x2="40%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E8" />
          <stop offset="50%" stopColor="#E8DFD0" />
          <stop offset="100%" stopColor="#B8A890" />
        </linearGradient>
        <linearGradient id="duo-ak-ruff-a" x1="60%" y1="0%" x2="40%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#FAFAF5" />
          <stop offset="80%" stopColor="#F5F0E8" />
          <stop offset="100%" stopColor="#D4C4B0" />
        </linearGradient>
        <linearGradient id="duo-ak-ruff-b" x1="55%" y1="0%" x2="45%" y2="100%">
          <stop offset="0%" stopColor="#FAFAF5" />
          <stop offset="60%" stopColor="#E8DFD0" />
          <stop offset="100%" stopColor="#B8A890" />
        </linearGradient>
        <linearGradient id="duo-ak-ruff-c" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E8" />
          <stop offset="100%" stopColor="#9A8A72" />
        </linearGradient>
        <linearGradient id="duo-ak-ear" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FAFAF5" />
          <stop offset="60%" stopColor="#E8DFD0" />
          <stop offset="100%" stopColor="#B8A890" />
        </linearGradient>
        <linearGradient id="duo-ak-tail-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FAFAF5" />
          <stop offset="70%" stopColor="#F5F0E8" />
          <stop offset="100%" stopColor="#D4C4B0" />
        </linearGradient>
        <linearGradient id="duo-ak-tail-b" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#E8DFD0" />
          <stop offset="100%" stopColor="#9A8A72" />
        </linearGradient>
        <linearGradient id="duo-ak-leg" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FAFAF5" />
          <stop offset="50%" stopColor="#F5F0E8" />
          <stop offset="100%" stopColor="#D4C4B0" />
        </linearGradient>
        <linearGradient id="duo-ak-haunch" x1="40%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E8" />
          <stop offset="50%" stopColor="#E8DFD0" />
          <stop offset="100%" stopColor="#B8A890" />
        </linearGradient>
        <radialGradient id="duo-ak-eye-iris" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#5A3A1A" />
          <stop offset="50%" stopColor="#2E1A0A" />
          <stop offset="100%" stopColor="#120800" />
        </radialGradient>
        <radialGradient id="duo-ak-nose" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#2A1A10" />
          <stop offset="60%" stopColor="#1A1410" />
          <stop offset="100%" stopColor="#080402" />
        </radialGradient>
      </defs>

      {/* ══════════════════════════════════════════════════════════
          GROUND PLANE & AMBIENT SHADOWS
          ══════════════════════════════════════════════════════════ */}
      <ellipse cx="130" cy="153" rx="105" ry="8" fill="url(#duo-ground-glow)" />
      <ellipse cx="82" cy="154" rx="38" ry="4.5" fill="url(#duo-shadow-am)" />
      <ellipse cx="178" cy="154" rx="46" ry="5" fill="url(#duo-shadow-ak)" />

      {/* ══════════════════════════════════════════════════════════
          AMERICAN STAFFORDSHIRE TERRIER
          Sand/fawn | sitting LEFT | facing ~3/4 right
          Skull top ~y=18, ground y=150
          ══════════════════════════════════════════════════════════ */}

      {/* ── Amstaff: Short tail (low-set, tapered, curves slightly left) ── */}
      <path
        d="M44 117 C37 111 32 104 33 96 C34 91 37 88 41 89 C43 91 44 97 44 103 C45 109 45 114 44 117 Z"
        fill="url(#duo-am-body-dark)"
        opacity="0.72"
        filter="url(#duo-soft-glow)"
      />
      <path
        d="M42 115 C36 109 32 103 33 97 C34 92 37 90 40 91"
        fill="none"
        stroke="#F0DCC8"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.16"
      />

      {/* ── Amstaff: Rear haunches — compact muscular mass ── */}
      <path
        d="M44 150 C41 138 37 123 40 110 C42 100 50 94 58 96 C64 98 67 106 65 117 C64 126 61 138 58 150 Z"
        fill="url(#duo-am-haunch)"
        opacity="0.82"
        filter="url(#duo-soft-glow)"
      />
      {/* Hip highlight */}
      <path
        d="M45 148 C43 136 40 121 43 110 C45 103 51 98 56 100"
        fill="none"
        stroke="#F0DCC8"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.14"
      />
      {/* Hip shadow crease */}
      <path
        d="M62 150 C63 138 65 126 65 116 C65 108 62 101 58 99"
        fill="none"
        stroke="#5A3D22"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.13"
      />

      {/* ── Amstaff: Main torso — broad, barrel chest, muscular ── */}
      <path
        d="M58 96 C60 84 62 70 65 60 C67 52 72 46 78 45 C85 44 92 48 95 57 C98 66 96 78 92 90 C89 99 82 104 74 104 C66 104 59 101 58 96 Z"
        fill="url(#duo-am-torso-vol)"
        opacity="0.92"
        filter="url(#duo-soft-glow)"
      />
      {/* Pectoral muscle division — deep central groove */}
      <path
        d="M77 60 C77 70 77 80 77 92"
        fill="none"
        stroke="#7A5535"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.12"
      />
      {/* Left pectoral highlight */}
      <path
        d="M65 62 C67 56 71 51 76 50 C76 58 74 66 71 74 C68 70 66 67 65 62 Z"
        fill="#F0DCC8"
        opacity="0.22"
      />
      {/* Right pectoral highlight */}
      <path
        d="M88 60 C90 54 92 57 93 62 C94 67 93 74 90 80 C87 74 86 67 86 61 Z"
        fill="#E8CDB5"
        opacity="0.14"
      />
      {/* Shoulder blade — left scapula ridge */}
      <path
        d="M60 96 C58 88 59 78 62 69 C64 63 67 59 70 58"
        fill="none"
        stroke="#E8CDB5"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.17"
      />
      {/* Shoulder blade — right scapula */}
      <path
        d="M92 90 C94 82 95 72 93 62 C91 56 88 52 84 50"
        fill="none"
        stroke="#E8CDB5"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.13"
      />
      {/* Waist tuck */}
      <path
        d="M58 96 C58 91 59 86 62 82"
        fill="none"
        stroke="#7A5535"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.10"
      />

      {/* ── Amstaff: Front legs — straight, powerful ── */}
      {/* Left front leg (near) */}
      <path
        d="M64 104 C63 110 62 119 62 128 C62 136 63 143 63 150 L72 150 C72 142 72 134 72 126 C72 116 72 107 70 103 Z"
        fill="url(#duo-am-leg-l)"
        opacity="0.88"
      />
      {/* Left leg muscle highlight */}
      <path
        d="M66 105 C65 111 64 122 64 132 C64 140 65 147 65 150"
        fill="none"
        stroke="#F0DCC8"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.18"
      />
      {/* Left leg inner shadow */}
      <path
        d="M70 104 C70 111 71 120 71 130 C71 139 71 145 71 150"
        fill="none"
        stroke="#7A5535"
        strokeWidth="1.0"
        strokeLinecap="round"
        opacity="0.11"
      />
      {/* Left front paw */}
      <path
        d="M62 150 C61 152 61 154 63 154 C65 154 67 154 69 154 C71 154 72 154 72 152 C72 150 72 150 72 150 Z"
        fill="url(#duo-am-paw)"
        opacity="0.80"
      />
      {/* Left paw toes */}
      <ellipse cx="63.5" cy="153.5" rx="1.2" ry="0.8" fill="#7A5535" opacity="0.22" />
      <ellipse cx="65.5" cy="154" rx="1.1" ry="0.7" fill="#7A5535" opacity="0.22" />
      <ellipse cx="67.5" cy="154" rx="1.1" ry="0.7" fill="#7A5535" opacity="0.22" />
      <ellipse cx="69.5" cy="153.5" rx="1.1" ry="0.8" fill="#7A5535" opacity="0.20" />

      {/* Right front leg (far — slightly behind) */}
      <path
        d="M82 100 C81 107 80 117 80 127 C80 136 81 143 82 150 L89 150 C89 143 89 136 89 127 C89 117 89 108 87 100 Z"
        fill="url(#duo-am-leg-r)"
        opacity="0.74"
      />
      {/* Right front paw */}
      <path
        d="M80 150 C79 152 79 154 81 154 C83 154 85 154 87 154 C88 154 89 153 89 151 C89 150 89 150 89 150 Z"
        fill="url(#duo-am-paw)"
        opacity="0.66"
      />
      {/* Right paw toes */}
      <ellipse cx="81.5" cy="153.5" rx="1.1" ry="0.7" fill="#7A5535" opacity="0.16" />
      <ellipse cx="83.5" cy="154" rx="1.0" ry="0.7" fill="#7A5535" opacity="0.16" />
      <ellipse cx="85.5" cy="154" rx="1.0" ry="0.7" fill="#7A5535" opacity="0.16" />
      <ellipse cx="87.5" cy="153.5" rx="1.0" ry="0.8" fill="#7A5535" opacity="0.14" />

      {/* ── Amstaff: Neck — thick, muscular, arched ── */}
      <path
        d="M68 58 C66 50 65 41 67 34 C69 28 73 24 78 24 C83 24 87 28 87 35 C87 42 84 50 80 56 C77 60 73 62 70 60 Z"
        fill="url(#duo-am-body)"
        opacity="0.90"
        filter="url(#duo-soft-glow)"
      />
      {/* Neck left highlight */}
      <path
        d="M68 56 C67 49 67 41 69 35"
        fill="none"
        stroke="#F0DCC8"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.22"
      />
      {/* Neck right shadow */}
      <path
        d="M86 54 C87 47 87 39 85 34"
        fill="none"
        stroke="#7A5535"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.14"
      />

      {/* ── Amstaff: Head — wide flat skull, pronounced cheeks ── */}
      {/* Skull — broad, slightly flat on top */}
      <path
        d="M68 30 C68 20 72 13 78 11 C84 9 91 12 93 19 C95 25 93 32 89 36 C86 39 82 40 78 40 C73 40 68 36 68 30 Z"
        fill="url(#duo-am-head-vol)"
        opacity="0.94"
        filter="url(#duo-soft-glow)"
      />
      {/* Skull top highlight — flat broad plane */}
      <path
        d="M72 14 C75 12 80 11 84 12 C87 13 90 15 91 19"
        fill="none"
        stroke="#F0DCC8"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.28"
      />
      {/* Skull top fill highlight */}
      <ellipse cx="80" cy="17" rx="7" ry="4" fill="#F0DCC8" opacity="0.20" />
      {/* Forehead stop crease (between eyes — Amstaff hallmark) */}
      <path
        d="M79 22 C79 24 79 26 79 28"
        fill="none"
        stroke="#7A5535"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.16"
      />
      {/* Cheek muscle — zygomatic arch RIGHT (facing right) — bulging */}
      <path
        d="M89 28 C93 26 97 27 98 31 C99 35 96 39 91 40 C87 41 84 39 84 36 C84 32 86 29 89 28 Z"
        fill="url(#duo-am-head-top)"
        opacity="0.72"
      />
      {/* Cheek highlight */}
      <path
        d="M90 29 C93 28 96 29 97 32"
        fill="none"
        stroke="#F0DCC8"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.20"
      />
      {/* Cheek muscle — LEFT (partially visible, 3/4 view) */}
      <path
        d="M69 27 C66 26 63 28 63 31 C63 35 66 38 70 38"
        fill="none"
        stroke="#D4A574"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.30"
      />

      {/* ── Amstaff: Muzzle — short, square, deep ── */}
      {/* Muzzle block */}
      <path
        d="M68 30 C66 31 64 33 65 37 C66 40 69 43 74 44 C79 45 85 44 88 42 C91 40 91 36 89 33 C87 30 84 28 80 28 C76 28 71 29 68 30 Z"
        fill="url(#duo-am-muzzle)"
        opacity="0.85"
      />
      {/* Muzzle top plane highlight */}
      <path
        d="M70 30 C72 29 76 28 80 28 C83 28 86 29 88 31"
        fill="none"
        stroke="#E8CDB5"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.24"
      />
      {/* Lip line — from nose corner to jaw */}
      <path
        d="M65 37 C66 39 68 41 72 43 C76 44 80 44 84 43 C87 42 89 40 89 37"
        fill="none"
        stroke="#7A5535"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.20"
      />
      {/* Lower jaw mass */}
      <path
        d="M66 38 C65 40 66 42 69 44 C73 46 78 46 83 45 C87 44 90 42 90 39 L89 37 C87 40 84 43 79 44 C74 44 69 43 66 40 Z"
        fill="#A0754E"
        opacity="0.35"
      />

      {/* ── Amstaff: Nose — broad, dark, visible nostrils ── */}
      <path
        d="M71 34 C71 31 73 29 76 28 C79 27 82 28 83 30 C84 31 84 33 84 35 C84 37 82 38 79 38 C76 38 73 38 71 37 C70 36 70 35 71 34 Z"
        fill="url(#duo-am-nose)"
        opacity="0.88"
      />
      {/* Left nostril */}
      <path
        d="M72 34 C72 32 73 31 75 31 C76 31 77 32 77 34 C77 35 76 36 74 36 C73 36 72 35 72 34 Z"
        fill="#1E1208"
        opacity="0.50"
      />
      {/* Right nostril */}
      <path
        d="M78 34 C78 32 79 31 81 31 C82 31 83 32 83 34 C83 35 82 36 80 36 C79 36 78 35 78 34 Z"
        fill="#1E1208"
        opacity="0.50"
      />
      {/* Nose bridge highlight */}
      <path
        d="M73 30 C75 29 78 29 81 30"
        fill="none"
        stroke="#7A5535"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.25"
      />
      {/* Nose specular */}
      <ellipse cx="73" cy="32" rx="1.2" ry="0.8" fill="#D4A574" opacity="0.28" />

      {/* ── Amstaff: Rose ears (folded forward at tips) ── */}
      {/* Left ear — folded rose ear, cartilage visible */}
      <path
        d="M72 19 C71 13 71 7 69 5 C67 3 64 5 63 9 C62 13 63 18 65 21 C67 24 70 24 72 22 C73 21 73 20 72 19 Z"
        fill="url(#duo-am-ear-outer)"
        opacity="0.85"
      />
      {/* Left ear inner concave */}
      <path
        d="M71 19 C70 14 70 9 69 7 C67 6 65 8 65 12 C65 16 66 19 68 21 C69 22 71 21 71 19 Z"
        fill="#7A5535"
        opacity="0.35"
      />
      {/* Left ear tip fold — the rose fold */}
      <path
        d="M63 9 C62 13 63 17 65 20"
        fill="none"
        stroke="#A0754E"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.28"
      />
      {/* Left ear cartilage fold line */}
      <path
        d="M69 6 C68 9 68 14 69 18"
        fill="none"
        stroke="#E8CDB5"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.20"
      />
      {/* Right ear (partial — 3/4 view, far ear) */}
      <path
        d="M90 17 C91 11 92 7 91 5 C89 3 86 5 85 9 C84 13 85 17 87 19 C88 21 90 20 90 17 Z"
        fill="url(#duo-am-ear-outer)"
        opacity="0.70"
      />
      {/* Right ear inner */}
      <path
        d="M89 17 C89 12 90 8 90 6 C88 6 87 8 86 11 C86 14 87 17 88 18 Z"
        fill="#7A5535"
        opacity="0.28"
      />

      {/* ── Amstaff: Eyes — almond-shaped, amber-brown ── */}
      {/* Right eye — dominant (nearest viewer, facing right) */}
      {/* Eye socket shadow */}
      <ellipse cx="88" cy="26" rx="3.5" ry="3" fill="#5A3D22" opacity="0.20" />
      {/* Eye white */}
      <ellipse cx="88" cy="26" rx="2.8" ry="2.4" fill="#F0E8D8" opacity="0.60" />
      {/* Iris */}
      <ellipse cx="88" cy="26" rx="2.2" ry="2" fill="url(#duo-am-eye-iris)" opacity="0.92" />
      {/* Pupil */}
      <ellipse cx="88.2" cy="26.2" rx="1.2" ry="1.1" fill="#120800" opacity="0.88" />
      {/* Primary specular highlight */}
      <ellipse cx="87.0" cy="25.0" rx="0.85" ry="0.7" fill="#FFFFFF" opacity="0.72" />
      {/* Secondary specular highlight */}
      <ellipse cx="89.1" cy="26.8" rx="0.4" ry="0.35" fill="#FFFFFF" opacity="0.45" />
      {/* Lower eyelid shadow line */}
      <path
        d="M85.5 27.5 C86.5 28.2 88 28.4 90 27.8"
        fill="none"
        stroke="#5A3D22"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.22"
      />
      {/* Upper eyelid line */}
      <path
        d="M85.5 24.8 C86.5 24.0 88 23.8 90.2 24.5"
        fill="none"
        stroke="#3A2A1A"
        strokeWidth="0.55"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* Left eye — partially visible (3/4 view) */}
      <ellipse cx="73" cy="26" rx="2.4" ry="2.1" fill="#3A2A10" opacity="0.55" />
      <ellipse cx="73" cy="26" rx="1.8" ry="1.6" fill="url(#duo-am-eye-iris)" opacity="0.72" />
      <ellipse cx="73.2" cy="26.2" rx="0.9" ry="0.85" fill="#120800" opacity="0.75" />
      <ellipse cx="72.2" cy="25.2" rx="0.6" ry="0.5" fill="#FFFFFF" opacity="0.55" />
      <ellipse cx="73.9" cy="26.9" rx="0.3" ry="0.28" fill="#FFFFFF" opacity="0.32" />

      {/* ── Amstaff: Muscle / coat texture lines ── */}
      <path d="M67 65 C70 61 75 59 80 60" fill="none" stroke="#F0DCC8" strokeWidth="0.55" strokeLinecap="round" opacity="0.16" />
      <path d="M65 74 C68 70 74 68 79 69" fill="none" stroke="#F0DCC8" strokeWidth="0.55" strokeLinecap="round" opacity="0.13" />
      <path d="M63 84 C67 80 72 78 78 79" fill="none" stroke="#F0DCC8" strokeWidth="0.5" strokeLinecap="round" opacity="0.11" />
      <path d="M68 94 C72 91 77 90 82 91" fill="none" stroke="#E8CDB5" strokeWidth="0.5" strokeLinecap="round" opacity="0.10" />
      <path d="M87 88 C89 83 92 77 92 70" fill="none" stroke="#E8CDB5" strokeWidth="0.5" strokeLinecap="round" opacity="0.09" />
      <path d="M71 55 C74 51 78 49 83 50" fill="none" stroke="#E8CDB5" strokeWidth="0.5" strokeLinecap="round" opacity="0.14" />
      <path d="M66 78 C68 76 72 75 75 76" fill="none" stroke="#7A5535" strokeWidth="0.4" strokeLinecap="round" opacity="0.10" />
      <path d="M84 76 C86 74 90 73 92 75" fill="none" stroke="#7A5535" strokeWidth="0.4" strokeLinecap="round" opacity="0.09" />

      {/* ══════════════════════════════════════════════════════════
          AMERICAN AKITA
          White/cream | sitting RIGHT | facing ~3/4 left
          Skull top ~y=10, ground y=150  (taller than Amstaff)
          ══════════════════════════════════════════════════════════ */}

      {/* ── Akita: Curled tail — thick, bushy, tightly coiled over back ── */}
      {/* Tail body fill — outermost mass */}
      <path
        d="M211 98 C218 88 224 76 224 64 C224 55 220 47 215 44 C210 41 204 44 200 50 C196 56 195 64 197 72 C199 78 203 84 205 90 C207 95 208 100 207 102"
        fill="none"
        stroke="url(#duo-ak-tail-a)"
        strokeWidth="11"
        strokeLinecap="round"
        opacity="0.78"
      />
      {/* Tail inner curl — shadow side */}
      <path
        d="M209 96 C215 86 220 75 220 64 C220 56 217 50 213 47 C209 44 204 46 201 52 C198 57 198 65 200 72 C202 79 205 85 207 91"
        fill="none"
        stroke="url(#duo-ak-tail-b)"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Tail top curl — tightest part of the spitz curl */}
      <path
        d="M200 52 C198 46 199 41 202 39 C205 37 209 39 211 44 C213 48 213 54 211 58"
        fill="none"
        stroke="url(#duo-ak-tail-a)"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.70"
      />
      {/* Tail highlight — primary bright stripe along outer curl */}
      <path
        d="M213 97 C219 87 224 75 224 64 C224 55 220 48 216 45"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.0"
        strokeLinecap="round"
        opacity="0.32"
      />
      {/* Tail highlight secondary */}
      <path
        d="M210 95 C216 85 221 74 221 63 C221 55 218 49 214 46"
        fill="none"
        stroke="#FAFAF5"
        strokeWidth="1.0"
        strokeLinecap="round"
        opacity="0.22"
      />
      {/* Tail shadow on inner side */}
      <path
        d="M205 90 C201 82 199 73 200 63 C200 56 203 50 207 47"
        fill="none"
        stroke="#9A8A72"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.20"
      />
      {/* Tail shadow cast on body */}
      <ellipse cx="209" cy="73" rx="7" ry="14" fill="#9A8A72" opacity="0.07" transform="rotate(-30 209 73)" />
      {/* Tail fluff lines */}
      <path d="M215 92 C220 83 224 73 223 63" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeLinecap="round" opacity="0.18" />
      <path d="M212 94 C217 84 221 74 220 63" fill="none" stroke="#F5F0E8" strokeWidth="0.5" strokeLinecap="round" opacity="0.22" />
      <path d="M207 93 C212 84 215 74 214 64" fill="none" stroke="#FAFAF5" strokeWidth="0.5" strokeLinecap="round" opacity="0.15" />
      <path d="M203 88 C206 80 207 71 207 63 C207 56 205 50 202 47" fill="none" stroke="#E8DFD0" strokeWidth="0.5" strokeLinecap="round" opacity="0.18" />

      {/* ── Akita: Rear haunches — large, powerful, fluffy ── */}
      <path
        d="M210 150 C214 136 218 120 214 106 C210 93 198 85 188 88 C180 90 177 100 178 112 C179 124 182 137 184 150 Z"
        fill="url(#duo-ak-haunch)"
        opacity="0.85"
        filter="url(#duo-soft-glow)"
      />
      {/* Haunch outer fluffy edge */}
      <path
        d="M212 148 C215 134 218 118 214 105 C210 94 200 87 190 89"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.20"
      />
      {/* Haunch inner shadow */}
      <path
        d="M183 150 C182 137 180 123 180 111 C180 101 183 94 188 91"
        fill="none"
        stroke="#9A8A72"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.16"
      />
      {/* Rear thigh fluff texture */}
      <path d="M210 142 C213 130 215 116 211 104" fill="none" stroke="#FAFAF5" strokeWidth="0.6" strokeLinecap="round" opacity="0.14" />
      <path d="M206 145 C208 133 210 120 207 108" fill="none" stroke="#F5F0E8" strokeWidth="0.5" strokeLinecap="round" opacity="0.12" />

      {/* ── Akita: Main torso — large, thick double-coat, fluffy silhouette ── */}
      {/* Body core with wavy/irregular outer edge to suggest fluffy coat */}
      <path
        d="M178 112 C176 100 175 86 176 73 C177 62 181 53 186 48 C191 43 198 41 205 43 C212 45 217 52 218 62 C219 72 216 84 211 95 C207 104 200 108 192 108 C185 108 179 112 178 112 Z"
        fill="url(#duo-ak-torso-vol)"
        opacity="0.92"
        filter="url(#duo-soft-glow)"
      />
      {/* Fluffy body right-side edge (irregular wavy strokes) */}
      <path
        d="M216 72 C218 68 219 64 218 60 C217 56 215 52 212 49"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.18"
      />
      {/* Fluffy body top edge — coat break where tail meets back */}
      <path
        d="M185 50 C189 46 194 43 200 43 C205 43 210 46 213 50"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.22"
      />
      {/* Chest central highlight */}
      <path
        d="M182 72 C184 65 186 60 189 57 C193 54 197 53 200 55"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.0"
        strokeLinecap="round"
        opacity="0.28"
      />
      {/* Body coat direction lines */}
      <path d="M178 100 C182 96 188 94 194 95" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeLinecap="round" opacity="0.14" />
      <path d="M176 88 C180 84 186 82 192 83" fill="none" stroke="#FFFFFF" strokeWidth="0.55" strokeLinecap="round" opacity="0.12" />
      <path d="M177 76 C181 72 187 70 193 71" fill="none" stroke="#FAFAF5" strokeWidth="0.55" strokeLinecap="round" opacity="0.10" />
      <path d="M179 64 C183 60 188 58 194 59" fill="none" stroke="#F5F0E8" strokeWidth="0.5" strokeLinecap="round" opacity="0.09" />
      <path d="M211 90 C214 85 217 79 216 72" fill="none" stroke="#FAFAF5" strokeWidth="0.5" strokeLinecap="round" opacity="0.12" />
      <path d="M213 82 C215 78 216 73 215 67" fill="none" stroke="#E8DFD0" strokeWidth="0.45" strokeLinecap="round" opacity="0.10" />

      {/* ── Akita: Neck ruff — massive, layered, signature feature ── */}
      {/* Ruff layer 1 — outermost, left side (facing left) */}
      <path
        d="M175 95 C169 88 164 79 165 70 C166 63 170 58 175 57 C173 63 172 71 173 79 C174 85 175 91 175 95 Z"
        fill="url(#duo-ak-ruff-a)"
        opacity="0.62"
        filter="url(#duo-soft-glow)"
      />
      {/* Ruff layer 2 */}
      <path
        d="M176 90 C171 83 168 75 169 67 C170 60 174 56 178 55 C176 61 175 69 176 77 C177 83 177 88 176 90 Z"
        fill="url(#duo-ak-ruff-a)"
        opacity="0.56"
      />
      {/* Ruff layer 3 */}
      <path
        d="M178 86 C174 79 172 71 173 64 C174 58 178 54 182 53 C180 59 179 67 180 75 C181 81 179 85 178 86 Z"
        fill="url(#duo-ak-ruff-b)"
        opacity="0.50"
      />
      {/* Ruff layer 4 — innermost */}
      <path
        d="M180 82 C177 75 176 68 177 62 C178 57 181 53 185 52 C183 57 182 65 183 72 C184 78 182 82 180 82 Z"
        fill="url(#duo-ak-ruff-c)"
        opacity="0.40"
      />
      {/* Ruff bright highlight on outer fold */}
      <path
        d="M166 88 C164 80 164 71 166 63"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.35"
      />
      {/* Ruff fur lines — direction downward-outward */}
      <path d="M166 85 C168 80 172 77 175 78" fill="none" stroke="#FFFFFF" strokeWidth="0.65" strokeLinecap="round" opacity="0.20" />
      <path d="M164 79 C167 74 171 71 174 72" fill="none" stroke="#FAFAF5" strokeWidth="0.60" strokeLinecap="round" opacity="0.18" />
      <path d="M165 73 C167 68 171 65 174 66" fill="none" stroke="#F5F0E8" strokeWidth="0.55" strokeLinecap="round" opacity="0.16" />
      <path d="M168 66 C169 62 172 59 175 60" fill="none" stroke="#F5F0E8" strokeWidth="0.50" strokeLinecap="round" opacity="0.14" />
      <path d="M171 61 C172 57 175 55 178 56" fill="none" stroke="#E8DFD0" strokeWidth="0.45" strokeLinecap="round" opacity="0.12" />

      {/* ── Akita: Front legs — thick, fluffy "pants" ── */}
      {/* Left front leg (near — facing left) */}
      <path
        d="M178 108 C176 115 174 124 174 133 C174 140 175 146 176 150 L185 150 C185 145 185 138 185 131 C185 122 185 113 183 107 Z"
        fill="url(#duo-ak-leg)"
        opacity="0.88"
      />
      {/* Left leg fluffy highlight */}
      <path
        d="M177 110 C176 117 175 126 175 135 C175 141 176 147 176 150"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.24"
      />
      {/* Left leg outer shadow */}
      <path
        d="M184 108 C184 116 184 125 184 134 C184 141 184 147 184 150"
        fill="none"
        stroke="#B8A890"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.16"
      />
      {/* Left leg fluffy fringe at knee */}
      <path
        d="M174 120 C172 121 171 122 172 124 C173 125 175 125 177 124"
        fill="none"
        stroke="#FAFAF5"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.22"
      />
      {/* Left front paw */}
      <path
        d="M174 150 C173 152 173 154 175 155 C177 155 180 155 182 155 C184 155 185 154 185 152 C185 150 185 150 185 150 Z"
        fill="url(#duo-ak-leg)"
        opacity="0.80"
      />
      <ellipse cx="175.5" cy="154" rx="1.2" ry="0.8" fill="#9A8A72" opacity="0.22" />
      <ellipse cx="177.5" cy="154.5" rx="1.1" ry="0.7" fill="#9A8A72" opacity="0.22" />
      <ellipse cx="179.5" cy="154.5" rx="1.1" ry="0.7" fill="#9A8A72" opacity="0.22" />
      <ellipse cx="181.5" cy="154" rx="1.1" ry="0.8" fill="#9A8A72" opacity="0.20" />

      {/* Right front leg (far — slightly less visible) */}
      <path
        d="M195 105 C194 113 193 122 193 132 C193 139 194 145 195 150 L203 150 C203 145 203 138 203 130 C203 121 203 113 201 104 Z"
        fill="url(#duo-ak-leg)"
        opacity="0.72"
      />
      {/* Right front paw */}
      <path
        d="M193 150 C192 152 192 154 194 155 C196 155 199 155 201 155 C203 155 203 154 203 152 C203 150 203 150 203 150 Z"
        fill="url(#duo-ak-leg)"
        opacity="0.64"
      />
      <ellipse cx="194.5" cy="154" rx="1.1" ry="0.7" fill="#9A8A72" opacity="0.16" />
      <ellipse cx="196.5" cy="154.5" rx="1.0" ry="0.7" fill="#9A8A72" opacity="0.16" />
      <ellipse cx="198.5" cy="154.5" rx="1.0" ry="0.7" fill="#9A8A72" opacity="0.16" />
      <ellipse cx="200.5" cy="154" rx="1.0" ry="0.8" fill="#9A8A72" opacity="0.14" />

      {/* ── Akita: Neck — thick, wide, connects to ruff ── */}
      <path
        d="M182 56 C180 48 180 39 182 32 C184 26 188 22 193 22 C198 22 202 26 202 33 C202 40 199 48 195 54 C191 58 186 59 182 56 Z"
        fill="url(#duo-ak-body)"
        opacity="0.90"
        filter="url(#duo-soft-glow)"
      />
      {/* Neck left highlight */}
      <path
        d="M182 54 C181 46 181 38 183 32"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.28"
      />
      {/* Neck right shadow */}
      <path
        d="M200 52 C201 44 201 36 199 31"
        fill="none"
        stroke="#B8A890"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.18"
      />
      {/* Neck coat lines */}
      <path d="M183 50 C186 47 190 46 193 47" fill="none" stroke="#FFFFFF" strokeWidth="0.55" strokeLinecap="round" opacity="0.18" />
      <path d="M182 43 C185 40 189 39 193 40" fill="none" stroke="#FAFAF5" strokeWidth="0.5" strokeLinecap="round" opacity="0.14" />

      {/* ── Akita: Head — broad bear-like, wide at cheeks ── */}
      {/* Head main mass */}
      <path
        d="M178 28 C178 16 183 9 191 7 C199 5 208 9 210 17 C212 24 209 32 204 37 C200 40 196 42 191 42 C185 42 179 37 178 28 Z"
        fill="url(#duo-ak-head-vol)"
        opacity="0.95"
        filter="url(#duo-soft-glow)"
      />
      {/* Skull top highlight — wide, slightly domed */}
      <ellipse cx="192" cy="13" rx="9" ry="5" fill="#FFFFFF" opacity="0.24" />
      {/* Forehead plane highlight */}
      <path
        d="M182 13 C185 10 189 8 193 8 C197 8 201 10 204 13"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.30"
      />
      {/* Cheek fur mass — left (dominant, facing left) */}
      <path
        d="M178 28 C174 25 170 27 169 32 C168 37 171 42 176 44 C179 45 182 43 182 39"
        fill="url(#duo-ak-head)"
        opacity="0.62"
        filter="url(#duo-soft-glow)"
      />
      {/* Cheek fur lines — left */}
      <path d="M170 32 C172 28 175 26 178 27" fill="none" stroke="#FFFFFF" strokeWidth="0.7" strokeLinecap="round" opacity="0.22" />
      <path d="M169 36 C171 32 174 30 177 31" fill="none" stroke="#FAFAF5" strokeWidth="0.6" strokeLinecap="round" opacity="0.18" />
      {/* Cheek mass — right (far side) */}
      <path
        d="M210 27 C214 25 216 28 215 33 C214 38 210 42 206 43"
        fill="url(#duo-ak-head)"
        opacity="0.45"
      />
      {/* Dark eye rims */}
      <path
        d="M178 26 C180 23 184 21 188 21 C192 21 196 23 198 26"
        fill="none"
        stroke="#2A1A10"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.25"
      />

      {/* ── Akita: Muzzle — broad but shorter, strong jaw ── */}
      {/* Muzzle main mass */}
      <path
        d="M178 28 C175 30 173 32 174 36 C175 40 178 43 183 44 C188 45 194 44 197 42 C200 40 201 36 199 32 C197 29 193 27 188 27 C184 27 180 27 178 28 Z"
        fill="url(#duo-ak-muzzle)"
        opacity="0.82"
      />
      {/* Muzzle top highlight */}
      <path
        d="M179 29 C182 27 186 27 190 27 C193 27 196 28 198 30"
        fill="none"
        stroke="#FAFAF5"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.26"
      />
      {/* Jaw line — dark lips */}
      <path
        d="M174 36 C175 39 178 42 183 44 C188 45 193 44 197 42 C200 40 201 37 199 35"
        fill="none"
        stroke="#2A1A10"
        strokeWidth="0.65"
        strokeLinecap="round"
        opacity="0.30"
      />
      {/* Lower jaw mass */}
      <path
        d="M175 37 C174 39 175 42 179 44 C184 46 190 46 195 44 C199 42 201 39 200 37"
        fill="#D4C4B0"
        opacity="0.30"
      />

      {/* ── Akita: Nose — near-black, broad ── */}
      <path
        d="M178 32 C178 29 180 27 183 26 C186 25 189 26 190 28 C191 29 191 31 191 33 C191 35 189 36 186 37 C183 37 180 37 179 35 C178 34 178 33 178 32 Z"
        fill="url(#duo-ak-nose)"
        opacity="0.90"
      />
      {/* Left nostril */}
      <path
        d="M179 32 C179 30 180 29 182 29 C183 29 184 30 184 32 C184 33 183 34 181 34 C180 34 179 33 179 32 Z"
        fill="#080402"
        opacity="0.55"
      />
      {/* Right nostril */}
      <path
        d="M185 32 C185 30 186 29 188 29 C189 29 190 30 190 32 C190 33 189 34 187 34 C186 34 185 33 185 32 Z"
        fill="#080402"
        opacity="0.55"
      />
      {/* Nose bridge line */}
      <path
        d="M180 27 C182 26 185 26 188 27"
        fill="none"
        stroke="#2A1A10"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.28"
      />
      {/* Nose specular */}
      <ellipse cx="179.5" cy="30" rx="1.3" ry="0.9" fill="#B8A890" opacity="0.25" />

      {/* ── Akita: Ears — small, thick, triangular, erect, rounded tips ── */}
      {/* Left ear */}
      <path
        d="M183 13 C182 7 183 2 186 1 C189 0 191 3 191 8 C191 12 190 15 188 16 C186 17 184 15 183 13 Z"
        fill="url(#duo-ak-ear)"
        opacity="0.92"
      />
      {/* Left ear inner (pink-cream) */}
      <path
        d="M184 13 C183 8 184 3 186 2 C188 3 189 6 189 10 C189 13 188 15 186 16 Z"
        fill="#D4C4B0"
        opacity="0.40"
      />
      {/* Left ear outer edge highlight */}
      <path
        d="M182 12 C182 7 183 3 186 1"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.32"
      />
      {/* Left ear base thickness */}
      <path
        d="M183 13 C182 15 182 17 183 18 C185 19 188 18 189 16 C190 15 190 13 191 11"
        fill="none"
        stroke="#E8DFD0"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.22"
      />
      {/* Right ear */}
      <path
        d="M196 12 C196 6 197 2 200 1 C203 0 205 3 205 8 C205 12 204 15 202 16 C200 17 197 15 196 12 Z"
        fill="url(#duo-ak-ear)"
        opacity="0.82"
      />
      {/* Right ear inner */}
      <path
        d="M197 12 C197 7 198 3 200 2 C202 3 203 6 203 10 C203 13 202 15 200 16 Z"
        fill="#D4C4B0"
        opacity="0.32"
      />
      {/* Right ear outer edge */}
      <path
        d="M205 11 C205 6 204 2 201 1"
        fill="none"
        stroke="#FAFAF5"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.25"
      />

      {/* ── Akita: Eyes — small, deep-set, triangular, dark rims ── */}
      {/* Left eye — dominant (nearest viewer, facing left) */}
      {/* Eye socket / dark rim */}
      <path
        d="M179 23 C180 21 183 19 186 19 C189 19 191 20 192 22 C191 21 189 20 186 20 C183 20 180 21 179 23 Z"
        fill="#2A1A10"
        opacity="0.35"
      />
      {/* Eye white / sclera */}
      <ellipse cx="186" cy="22" rx="3.2" ry="2.6" fill="#F5EEE0" opacity="0.55" />
      {/* Iris — notably smaller relative to head size (Akita hallmark) */}
      <ellipse cx="186" cy="22" rx="2.4" ry="2.1" fill="url(#duo-ak-eye-iris)" opacity="0.90" />
      {/* Pupil */}
      <ellipse cx="186.1" cy="22.2" rx="1.3" ry="1.2" fill="#080402" opacity="0.90" />
      {/* Primary specular highlight */}
      <ellipse cx="184.8" cy="21.0" rx="0.8" ry="0.65" fill="#FFFFFF" opacity="0.75" />
      {/* Secondary specular */}
      <ellipse cx="187.2" cy="22.8" rx="0.38" ry="0.32" fill="#FFFFFF" opacity="0.48" />
      {/* Dark upper eyelid line (triangular appearance) */}
      <path
        d="M182.5 20.5 C184 19.5 186 19.2 188 19.8 C189.5 20.3 191 21.2 191.5 22.3"
        fill="none"
        stroke="#1A1008"
        strokeWidth="0.65"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Lower eyelid line */}
      <path
        d="M182.5 23.5 C184 24.3 186 24.5 188.5 24.0 C190 23.5 191 22.8 191.5 22.3"
        fill="none"
        stroke="#2A1A10"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.28"
      />
      {/* Dark eye rim fill */}
      <ellipse cx="186" cy="22" rx="3.0" ry="2.5" fill="none" stroke="#2A1A10" strokeWidth="0.5" opacity="0.35" />

      {/* Right eye — far side, less detail */}
      <ellipse cx="202" cy="21" rx="2.6" ry="2.2" fill="#2A1A10" opacity="0.40" />
      <ellipse cx="202" cy="21" rx="2.0" ry="1.8" fill="url(#duo-ak-eye-iris)" opacity="0.70" />
      <ellipse cx="202.2" cy="21.2" rx="1.0" ry="0.95" fill="#080402" opacity="0.78" />
      <ellipse cx="201.0" cy="20.1" rx="0.65" ry="0.55" fill="#FFFFFF" opacity="0.58" />
      <ellipse cx="203.1" cy="21.8" rx="0.30" ry="0.28" fill="#FFFFFF" opacity="0.38" />
    </svg>
  );
}

// ─── SVG: Elegant vector paw print ────────────────────────────────────────

interface PawPrintProps {
  size?: number;
  opacity?: number;
  className?: string;
}

function PawPrint({ size = 24, opacity = 1, className }: PawPrintProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <linearGradient id="paw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8CDB5" />
          <stop offset="100%" stopColor="#C5956B" />
        </linearGradient>
      </defs>

      {/* Main central pad — elongated teardrop */}
      <path
        d="M20 38 C14 38 11 33 11 28 C11 22 14 18 20 18 C26 18 29 22 29 28 C29 33 26 38 20 38 Z"
        fill="url(#paw-grad)"
      />

      {/* Top-left toe pad */}
      <ellipse
        cx="13"
        cy="14"
        rx="4"
        ry="5"
        fill="url(#paw-grad)"
        opacity="0.85"
        transform="rotate(-18 13 14)"
      />

      {/* Top-center-left toe pad */}
      <ellipse
        cx="18"
        cy="11"
        rx="3.8"
        ry="4.8"
        fill="url(#paw-grad)"
        opacity="0.9"
        transform="rotate(-6 18 11)"
      />

      {/* Top-center-right toe pad */}
      <ellipse
        cx="23"
        cy="11"
        rx="3.8"
        ry="4.8"
        fill="url(#paw-grad)"
        opacity="0.9"
        transform="rotate(6 23 11)"
      />

      {/* Top-right toe pad */}
      <ellipse
        cx="28"
        cy="14"
        rx="4"
        ry="5"
        fill="url(#paw-grad)"
        opacity="0.85"
        transform="rotate(18 28 14)"
      />
    </svg>
  );
}

// ─── 3D perspective tilt wrapper ──────────────────────────────────────────

function PerspectiveCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 22 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = (e.clientX - left) / width - 0.5;
      const cy = (e.clientY - top) / height - 0.5;
      rotateX.set(-cy * 7);
      rotateY.set(cx * 7);
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated walking paw using SVG PawPrint ──────────────────────────────

function WalkingPaw({ index, total }: { index: number; total: number }) {
  const offsetY = index % 2 === 0 ? -6 : 6;
  const rotate = -15 + index * (30 / (total - 1));

  return (
    <motion.span
      initial={{ opacity: 0, y: 20, scale: 0.4 }}
      whileInView={{ opacity: 1, y: offsetY, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.4 + index * 0.18,
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className="inline-block select-none"
      style={{
        transform: `rotate(${rotate}deg) translateY(${offsetY}px)`,
        filter: 'drop-shadow(0 0 4px rgba(197,149,107,0.14))',
      }}
    >
      <PawPrint size={18} opacity={0.18} />
    </motion.span>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────

export function PhilanthropySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Breathing, rotating paw watermark
  const pawScale = useTransform(scrollYProgress, [0.05, 0.5], [0.75, 1.05]);
  const pawOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75], [0, 1, 0]);
  const pawRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  // Scroll-linked stat label fade
  const statProgress = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);

  const { t, isRTL } = useLanguage();

  return (
    <section
      id="philanthropy"
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Warm amber radial gradient behind card area */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(197,149,107,0.04) 0%, rgba(197,149,107,0.01) 50%, transparent 70%)',
        }}
      />

      {/* Giant SVG paw watermark — rotates and breathes */}
      <motion.div
        style={{ scale: pawScale, opacity: pawOpacity, rotate: pawRotate }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none w-[280px] h-[280px] md:w-[520px] md:h-[520px]"
        aria-hidden="true"
      >
        <PawPrint size={520} opacity={0.065} className="w-full h-full" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className={`mb-20 md:mb-28 ${isRTL ? 'text-right' : ''}`}
        >
          <span className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.5em] uppercase text-rose-gold/40 block mb-4">
            {t.philanthropy.label}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-light text-cream">
            {t.philanthropy.title}{' '}
            <span className="text-rose-gradient italic">
              {t.philanthropy.titleAccent}
            </span>
          </h2>
        </motion.div>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={`font-[family-name:var(--font-serif)] text-xl md:text-2xl text-cream/40 leading-relaxed max-w-3xl mb-20 ${isRTL ? 'mr-0 ml-auto' : ''}`}
        >
          {t.philanthropy.intro}
        </motion.p>

        {/* Dog welfare card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <PerspectiveCard>
            <div className="group relative border border-[#C5956B]/[0.08] hover:border-[#C5956B]/25 transition-all duration-700 overflow-hidden magnetic-glow">

              {/* Amber hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 50%, rgba(197,149,107,0.07) 0%, rgba(197,120,60,0.03) 40%, transparent 70%)',
                }}
              />

              {/* Inner ambient glow edges */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                style={{
                  boxShadow:
                    'inset 0 1px 40px rgba(197,149,107,0.05), inset 0 -1px 40px rgba(197,149,107,0.03)',
                }}
              />

              <div className="relative grid md:grid-cols-12 gap-8 p-8 md:p-14">

                {/* Icon column */}
                <div className="md:col-span-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="mb-6 inline-block"
                    style={{
                      filter:
                        'drop-shadow(0 0 24px rgba(197,149,107,0.18)) drop-shadow(0 0 50px rgba(197,149,107,0.06))',
                    }}
                  >
                    <DogSilhouette className="w-48 h-28 md:w-64 md:h-40" />
                  </motion.div>

                  <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-rose-gold-light/80 italic mb-2">
                    {t.philanthropy.dogTitle}
                  </h3>

                  {/* Scroll-driven stat */}
                  <div className="flex items-center gap-4 mt-6">
                    <motion.span
                      className="font-[family-name:var(--font-display)] text-4xl md:text-5xl italic group-hover:text-rose-gold/70 transition-colors duration-700"
                      style={{ color: 'rgba(197,149,107,0.3)' }}
                      whileInView={{ color: 'rgba(197,149,107,0.55)' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.4 }}
                    >
                      {t.philanthropy.dogStat}
                    </motion.span>
                    <motion.span
                      className="font-[family-name:var(--font-sans)] text-[9px] tracking-[0.25em] uppercase text-cream/20"
                      style={{ opacity: statProgress }}
                    >
                      {t.philanthropy.dogStatLabel}
                    </motion.span>
                  </div>
                </div>

                {/* Body text column */}
                <div className="md:col-span-8">
                  <p
                    className={`font-[family-name:var(--font-serif)] text-base md:text-lg text-cream/40 leading-relaxed group-hover:text-cream/65 transition-colors duration-600 mb-10 ${isRTL ? 'text-right' : ''}`}
                  >
                    {t.philanthropy.dogBody}
                  </p>

                  {/* Ornament divider with animated spark */}
                  <div className="ornament max-w-lg mb-8">
                    <motion.span
                      aria-hidden="true"
                      animate={{ opacity: [0.2, 0.65, 0.2] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {/* Four-pointed star in SVG — replaces ✦ emoji */}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="font-[family-name:var(--font-serif)]"
                      >
                        <path
                          d="M6 0 C6 0 6.4 4 6 6 C5.6 8 6 12 6 12 C6 12 5.6 8 6 6 C6.4 4 6 0 6 0 Z"
                          fill="#C5956B"
                          opacity="0.7"
                        />
                        <path
                          d="M0 6 C0 6 4 5.6 6 6 C8 6.4 12 6 12 6 C12 6 8 6.4 6 6 C4 5.6 0 6 0 6 Z"
                          fill="#C5956B"
                          opacity="0.7"
                        />
                        <path
                          d="M1.76 1.76 C1.76 1.76 4.24 4.59 6 6 C7.76 7.41 10.24 10.24 10.24 10.24 C10.24 10.24 7.76 7.41 6 6 C4.24 4.59 1.76 1.76 1.76 1.76 Z"
                          fill="#C5956B"
                          opacity="0.35"
                        />
                        <path
                          d="M10.24 1.76 C10.24 1.76 7.41 4.24 6 6 C4.59 7.76 1.76 10.24 1.76 10.24 C1.76 10.24 4.59 7.76 6 6 C7.41 4.24 10.24 1.76 10.24 1.76 Z"
                          fill="#C5956B"
                          opacity="0.35"
                        />
                      </svg>
                    </motion.span>
                  </div>

                  {/* Gandhi quote */}
                  <blockquote className="relative">
                    {/* Large decorative quotation mark */}
                    <span
                      className={`absolute -top-4 font-[family-name:var(--font-display)] text-6xl md:text-7xl leading-none pointer-events-none select-none ${isRTL ? '-right-2' : '-left-2'}`}
                      style={{ color: 'rgba(197,149,107,0.15)' }}
                      aria-hidden="true"
                    >
                      &ldquo;
                    </span>
                    <p
                      className={`font-[family-name:var(--font-serif)] text-base md:text-lg text-cream/30 italic leading-relaxed pl-6 group-hover:text-cream/45 transition-colors duration-700 ${isRTL ? 'text-right pr-6 pl-0' : ''}`}
                    >
                      {t.philanthropy.quote}
                    </p>
                  </blockquote>
                </div>
              </div>

              {/* Hover shimmer line */}
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full shimmer transition-all duration-1000" />
            </div>
          </PerspectiveCard>
        </motion.div>

        {/* Walking paw prints trail */}
        <div className="flex items-end justify-center gap-3 md:gap-5 mt-16" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <WalkingPaw key={i} index={i} total={5} />
          ))}
        </div>

      </div>
    </section>
  );
}
