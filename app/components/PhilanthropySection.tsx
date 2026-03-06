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
// Lifelike 3D-depth, luxury brand register. ViewBox 0 0 240 140.

function DogSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <defs>
        {/* ── Shared filters ── */}
        <filter id="duo-soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="duo-glow-halo" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="5" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* ── Shared ground glow ── */}
        <radialGradient id="duo-ground-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C5956B" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#C5956B" stopOpacity="0" />
        </radialGradient>

        {/* ── AMSTAFF gradients (sand/fawn, light from upper-left) ── */}
        <linearGradient id="duo-am-body" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#E8CDB5" />
          <stop offset="40%" stopColor="#D4A574" />
          <stop offset="75%" stopColor="#C5956B" />
          <stop offset="100%" stopColor="#A0754E" />
        </linearGradient>
        <linearGradient id="duo-am-body-side" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A574" />
          <stop offset="60%" stopColor="#C5956B" />
          <stop offset="100%" stopColor="#7A5535" />
        </linearGradient>
        <linearGradient id="duo-am-chest" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#E8CDB5" />
          <stop offset="50%" stopColor="#D4A574" />
          <stop offset="100%" stopColor="#A0754E" />
        </linearGradient>
        <radialGradient id="duo-am-chest-vol" cx="45%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#E8CDB5" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#C5956B" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7A5535" stopOpacity="0.5" />
        </radialGradient>
        <linearGradient id="duo-am-head" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#E8CDB5" />
          <stop offset="50%" stopColor="#D4A574" />
          <stop offset="100%" stopColor="#A0754E" />
        </linearGradient>
        <linearGradient id="duo-am-muzzle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A574" />
          <stop offset="100%" stopColor="#A0754E" />
        </linearGradient>
        <linearGradient id="duo-am-ear" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5956B" />
          <stop offset="100%" stopColor="#7A5535" />
        </linearGradient>
        <linearGradient id="duo-am-leg" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#D4A574" />
          <stop offset="100%" stopColor="#A0754E" />
        </linearGradient>
        <linearGradient id="duo-am-haunch" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5956B" />
          <stop offset="100%" stopColor="#7A5535" />
        </linearGradient>

        {/* ── AKITA gradients (white/cream, light from upper-left) ── */}
        <linearGradient id="duo-ak-body" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#F5F0E8" />
          <stop offset="70%" stopColor="#E8DFD0" />
          <stop offset="100%" stopColor="#D4C4B0" />
        </linearGradient>
        <linearGradient id="duo-ak-body-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8DFD0" />
          <stop offset="60%" stopColor="#D4C4B0" />
          <stop offset="100%" stopColor="#B8A890" />
        </linearGradient>
        <radialGradient id="duo-ak-chest-vol" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#F5F0E8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4C4B0" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id="duo-ak-head" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F5F0E8" />
          <stop offset="100%" stopColor="#D4C4B0" />
        </linearGradient>
        <linearGradient id="duo-ak-ruff" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F5F0E8" />
          <stop offset="100%" stopColor="#D4C4B0" />
        </linearGradient>
        <linearGradient id="duo-ak-ear" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E8" />
          <stop offset="100%" stopColor="#B8A890" />
        </linearGradient>
        <linearGradient id="duo-ak-tail" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F5F0E8" />
          <stop offset="100%" stopColor="#D4C4B0" />
        </linearGradient>
        <linearGradient id="duo-ak-leg" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="#F5F0E8" />
          <stop offset="100%" stopColor="#D4C4B0" />
        </linearGradient>
        <linearGradient id="duo-ak-haunch" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8DFD0" />
          <stop offset="100%" stopColor="#B8A890" />
        </linearGradient>
      </defs>

      {/* ════════════════════════════════════════════════════════════
          GROUND PLANE
          ════════════════════════════════════════════════════════════ */}
      {/* Shared ground glow */}
      <ellipse cx="120" cy="133" rx="90" ry="7" fill="url(#duo-ground-glow)" />
      {/* Amstaff ground shadow */}
      <ellipse cx="78" cy="134" rx="30" ry="3.5" fill="#A0754E" opacity="0.10" />
      {/* Akita ground shadow */}
      <ellipse cx="162" cy="134" rx="36" ry="4" fill="#B8A890" opacity="0.09" />

      {/* ════════════════════════════════════════════════════════════
          AMSTAFF — sand/fawn — sits LEFT, faces slightly right
          Head ~y=35, ground y=130
          ════════════════════════════════════════════════════════════ */}

      {/* Rear haunches / rump mass */}
      <path
        d="M48 130 C44 118 40 104 44 93 C47 84 56 80 63 83 C68 86 69 94 67 104 C65 113 62 122 60 130 Z"
        fill="url(#duo-am-haunch)"
        opacity="0.78"
        filter="url(#duo-soft-shadow)"
      />
      {/* Left haunch outer curve */}
      <path
        d="M48 130 C45 120 43 108 46 98 C48 91 54 87 60 89 C63 91 64 97 63 106 C61 115 58 124 56 130 Z"
        fill="url(#duo-am-body-side)"
        opacity="0.65"
      />

      {/* Main torso — broad muscular chest */}
      <path
        d="M63 83 C65 73 66 62 68 55 C70 48 74 44 79 44 C85 44 89 49 90 57 C91 65 89 74 86 82 C83 89 77 93 71 93 C65 93 62 89 63 83 Z"
        fill="url(#duo-am-chest-vol)"
        opacity="0.90"
      />
      {/* Chest highlight band */}
      <path
        d="M68 60 C69 53 72 48 77 47 C82 46 87 50 88 57 C87 52 83 48 79 48 C74 48 70 53 68 60 Z"
        fill="#E8CDB5"
        opacity="0.35"
      />

      {/* Shoulder muscle definition — left */}
      <path
        d="M63 83 C62 76 63 68 66 62 C68 57 71 54 74 54"
        fill="none"
        stroke="#E8CDB5"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.18"
      />
      {/* Shoulder muscle — right */}
      <path
        d="M86 81 C88 74 89 66 88 59 C87 54 85 50 82 49"
        fill="none"
        stroke="#E8CDB5"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.14"
      />

      {/* Left front leg */}
      <path
        d="M66 93 C65 97 64 104 64 112 C64 120 65 126 66 130 L71 130 C71 124 71 116 71 108 C71 100 71 93 69 91 Z"
        fill="url(#duo-am-leg)"
        opacity="0.80"
      />
      {/* Right front leg */}
      <path
        d="M80 91 C79 95 78 102 78 111 C78 119 79 125 80 130 L85 130 C85 124 85 116 84 108 C83 100 83 94 82 91 Z"
        fill="url(#duo-am-leg)"
        opacity="0.76"
      />
      {/* Leg inner shadow — left */}
      <path
        d="M69 93 C68 98 68 106 68 114 C68 122 68 127 69 130"
        fill="none"
        stroke="#7A5535"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.12"
      />

      {/* Neck — thick, muscular */}
      <path
        d="M70 55 C68 48 68 41 70 36 C72 32 75 30 78 31 C81 32 82 36 81 41 C80 47 78 52 75 56 Z"
        fill="url(#duo-am-body)"
        opacity="0.88"
      />
      {/* Neck highlight */}
      <path
        d="M72 53 C70 47 70 41 72 37"
        fill="none"
        stroke="#E8CDB5"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.20"
      />

      {/* Head — wide skull, broad cheeks */}
      <ellipse
        cx="82"
        cy="28"
        rx="13"
        ry="11.5"
        fill="url(#duo-am-head)"
        opacity="0.92"
        filter="url(#duo-soft-shadow)"
      />
      {/* Cheek mass — right (facing right) */}
      <ellipse
        cx="91"
        cy="30"
        rx="5.5"
        ry="5"
        fill="url(#duo-am-head)"
        opacity="0.70"
      />
      {/* Skull highlight */}
      <ellipse
        cx="78"
        cy="23"
        rx="5"
        ry="3.5"
        fill="#E8CDB5"
        opacity="0.28"
      />

      {/* Muzzle — short, wide, strong jaw */}
      <path
        d="M72 30 C70 31 69 33 70 36 C71 38 74 40 78 40 C82 40 86 39 87 37 C88 35 87 32 85 31 C82 29 76 29 72 30 Z"
        fill="url(#duo-am-muzzle)"
        opacity="0.82"
      />
      {/* Muzzle highlight */}
      <path
        d="M74 31 C72 32 71 34 72 36"
        fill="none"
        stroke="#E8CDB5"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.22"
      />
      {/* Nose */}
      <ellipse cx="76" cy="35" rx="3" ry="2" fill="#3A2A1A" opacity="0.60" />
      {/* Nose highlight */}
      <ellipse cx="74.8" cy="34.2" rx="0.8" ry="0.5" fill="#E8CDB5" opacity="0.22" />
      {/* Jaw line */}
      <path
        d="M70 36 C70 38 72 40 76 41 C80 41 84 40 86 38"
        fill="none"
        stroke="#7A5535"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.18"
      />

      {/* Ear — rose / half-pricked, left ear */}
      <path
        d="M74 20 C73 14 74 9 71 7 C68 5 65 9 65 14 C65 18 67 22 70 23 C72 24 74 22 74 20 Z"
        fill="url(#duo-am-ear)"
        opacity="0.82"
      />
      {/* Ear inner shadow */}
      <path
        d="M73 19 C73 14 73 10 71 8 C69 9 67 13 67 17 C67 20 69 22 71 22 Z"
        fill="#7A5535"
        opacity="0.28"
      />
      {/* Right ear (tip visible) */}
      <path
        d="M90 19 C91 14 92 10 90 8 C88 7 85 10 85 15 C85 18 87 21 89 21 Z"
        fill="url(#duo-am-ear)"
        opacity="0.68"
      />

      {/* Eye — wide-set, right eye (dominant, facing right) */}
      <ellipse cx="87" cy="27" rx="2.2" ry="2" fill="#3A2A1A" opacity="0.65" />
      <ellipse cx="87.8" cy="26.2" rx="0.7" ry="0.65" fill="#FFFFFF" opacity="0.55" />
      {/* Left eye (partially visible) */}
      <ellipse cx="76" cy="27" rx="1.8" ry="1.6" fill="#3A2A1A" opacity="0.45" />
      <ellipse cx="76.5" cy="26.4" rx="0.5" ry="0.5" fill="#FFFFFF" opacity="0.30" />

      {/* Short tail — low-set, slightly curved */}
      <path
        d="M48 103 C42 99 38 94 38 88 C38 84 40 82 43 83 C45 84 46 88 47 93 C48 98 48 103 48 103"
        fill="none"
        stroke="url(#duo-am-body)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.70"
      />
      <path
        d="M48 101 C43 97 40 92 40 87"
        fill="none"
        stroke="#E8CDB5"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.22"
      />

      {/* Amstaff fur texture hints — chest + shoulder */}
      <path d="M70 68 C72 64 76 62 80 63" fill="none" stroke="#E8CDB5" strokeWidth="0.6" strokeLinecap="round" opacity="0.15" />
      <path d="M69 76 C72 72 77 71 81 72" fill="none" stroke="#E8CDB5" strokeWidth="0.6" strokeLinecap="round" opacity="0.12" />
      <path d="M71 84 C74 81 78 80 82 81" fill="none" stroke="#E8CDB5" strokeWidth="0.5" strokeLinecap="round" opacity="0.10" />
      <path d="M72 58 C74 54 78 52 82 53" fill="none" stroke="#E8CDB5" strokeWidth="0.5" strokeLinecap="round" opacity="0.14" />

      {/* ════════════════════════════════════════════════════════════
          AMERICAN AKITA — white/cream — sits RIGHT, faces slightly left
          Head ~y=22, ground y=130 (taller than Amstaff)
          ════════════════════════════════════════════════════════════ */}

      {/* Rear haunches — large, powerful */}
      <path
        d="M188 130 C192 118 196 103 192 90 C188 79 178 74 170 77 C164 80 162 89 163 100 C164 110 166 121 168 130 Z"
        fill="url(#duo-ak-haunch)"
        opacity="0.78"
        filter="url(#duo-soft-shadow)"
      />
      {/* Right haunch outer */}
      <path
        d="M188 130 C191 119 194 105 190 93 C187 84 180 79 174 82 C169 85 168 93 169 103 C170 113 172 122 174 130 Z"
        fill="url(#duo-ak-body-shadow)"
        opacity="0.60"
      />

      {/* Main torso — large, fluffy body */}
      {/* Wavy/fluffy silhouette for the right side */}
      <path
        d="M163 100 C161 90 160 78 161 67 C162 57 165 50 170 46 C175 42 182 41 188 44 C194 47 197 54 197 63 C197 72 194 82 190 90 C186 97 178 100 170 100 Z"
        fill="url(#duo-ak-chest-vol)"
        opacity="0.88"
      />
      {/* Fluffy body edge — left side wavy */}
      <path
        d="M161 68 C159 65 157 61 158 57 C159 54 162 52 164 54 C162 58 161 63 161 68 Z"
        fill="url(#duo-ak-ruff)"
        opacity="0.40"
      />
      {/* Chest highlight */}
      <path
        d="M168 52 C170 46 175 43 180 43 C185 43 190 47 192 53"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* Neck ruff — layered fur shapes (signature Akita) */}
      <path
        d="M162 75 C157 71 153 65 154 59 C155 54 159 51 163 52 C161 57 160 63 162 69 Z"
        fill="url(#duo-ak-ruff)"
        opacity="0.55"
      />
      <path
        d="M163 70 C158 66 156 60 157 55 C158 51 162 49 165 50 C163 55 162 62 163 68 Z"
        fill="url(#duo-ak-ruff)"
        opacity="0.50"
      />
      <path
        d="M165 67 C161 63 160 57 161 53 C162 50 165 48 168 49 C166 53 165 60 165 66 Z"
        fill="#FFFFFF"
        opacity="0.25"
      />
      {/* Ruff highlight stroke */}
      <path
        d="M158 65 C156 60 156 55 158 51"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.30"
      />

      {/* Left front leg */}
      <path
        d="M163 98 C161 103 160 111 160 119 C160 125 161 128 162 130 L168 130 C167 125 167 117 167 109 C167 101 167 95 165 94 Z"
        fill="url(#duo-ak-leg)"
        opacity="0.82"
      />
      {/* Right front leg */}
      <path
        d="M179 95 C178 100 177 108 177 117 C177 124 178 127 179 130 L185 130 C185 125 184 117 184 109 C184 101 184 96 182 94 Z"
        fill="url(#duo-ak-leg)"
        opacity="0.78"
      />
      {/* Leg shadow */}
      <path
        d="M165 96 C164 102 164 110 164 120 C164 126 164 129 165 130"
        fill="none"
        stroke="#B8A890"
        strokeWidth="1.0"
        strokeLinecap="round"
        opacity="0.14"
      />

      {/* Neck — thick */}
      <path
        d="M165 52 C163 45 163 37 165 31 C167 26 171 23 175 23 C179 23 182 27 182 33 C182 39 179 46 176 51 Z"
        fill="url(#duo-ak-body)"
        opacity="0.86"
      />

      {/* Head — broad, bear-like */}
      <ellipse
        cx="167"
        cy="18"
        rx="15"
        ry="13"
        fill="url(#duo-ak-head)"
        opacity="0.93"
        filter="url(#duo-soft-shadow)"
      />
      {/* Forehead highlight */}
      <ellipse
        cx="162"
        cy="12"
        rx="6"
        ry="4"
        fill="#FFFFFF"
        opacity="0.30"
      />
      {/* Cheek mass — left (facing left) */}
      <ellipse
        cx="157"
        cy="21"
        rx="5"
        ry="4.5"
        fill="url(#duo-ak-head)"
        opacity="0.65"
      />

      {/* Muzzle — shorter, broad */}
      <path
        d="M154 19 C152 20 151 22 152 25 C153 28 156 30 160 30 C164 30 168 28 169 26 C170 23 168 20 166 19 C163 18 157 18 154 19 Z"
        fill="url(#duo-ak-body-shadow)"
        opacity="0.75"
      />
      {/* Nose */}
      <ellipse cx="160" cy="24" rx="3.2" ry="2.2" fill="#3A2A1A" opacity="0.65" />
      <ellipse cx="158.8" cy="23.2" rx="0.9" ry="0.6" fill="#FFFFFF" opacity="0.25" />
      {/* Jaw */}
      <path
        d="M152 25 C153 27 156 29 160 30 C164 30 168 28 169 26"
        fill="none"
        stroke="#B8A890"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.16"
      />

      {/* Ears — small, triangular, erect */}
      {/* Left ear */}
      <path
        d="M157 9 C156 4 157 0 160 0 C163 0 163 4 162 9 C161 11 159 12 158 11 Z"
        fill="url(#duo-ak-ear)"
        opacity="0.85"
      />
      {/* Left ear inner */}
      <path
        d="M158 9 C157 5 158 2 160 1 C162 2 162 5 161 9 Z"
        fill="#B8A890"
        opacity="0.30"
      />
      {/* Right ear */}
      <path
        d="M172 8 C172 3 173 0 176 0 C179 0 179 4 178 9 C177 11 174 12 173 11 Z"
        fill="url(#duo-ak-ear)"
        opacity="0.80"
      />
      {/* Right ear inner */}
      <path
        d="M173 8 C173 4 174 2 176 1 C178 2 178 5 177 8 Z"
        fill="#B8A890"
        opacity="0.25"
      />

      {/* Eyes — small, deep-set, triangular shape */}
      {/* Left eye (dominant — facing left) */}
      <ellipse cx="157" cy="17" rx="2.2" ry="1.8" fill="#3A2A1A" opacity="0.68" />
      <ellipse cx="156.2" cy="16.3" rx="0.65" ry="0.6" fill="#FFFFFF" opacity="0.55" />
      {/* Right eye */}
      <ellipse cx="175" cy="17" rx="2" ry="1.8" fill="#3A2A1A" opacity="0.48" />
      <ellipse cx="175.6" cy="16.4" rx="0.55" ry="0.55" fill="#FFFFFF" opacity="0.35" />

      {/* Curled tail — signature Akita, rests over back */}
      {/* Tail base arc */}
      <path
        d="M188 80 C194 72 200 62 200 54 C200 47 197 42 193 41 C189 40 185 44 183 50 C181 55 181 62 183 67 C185 73 186 77 186 80"
        fill="none"
        stroke="url(#duo-ak-tail)"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.70"
      />
      {/* Tail curl top */}
      <path
        d="M183 50 C182 45 183 41 186 40 C189 39 192 42 193 46"
        fill="none"
        stroke="url(#duo-ak-tail)"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.60"
      />
      {/* Tail highlight stripe */}
      <path
        d="M189 78 C195 70 200 60 199 52 C198 47 196 43 193 42"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.28"
      />
      {/* Tail shadow edge */}
      <path
        d="M186 79 C192 72 197 63 197 55 C197 49 195 44 192 43"
        fill="none"
        stroke="#B8A890"
        strokeWidth="1.0"
        strokeLinecap="round"
        opacity="0.18"
      />

      {/* Akita fur texture hints — ruff, body, tail */}
      {/* Ruff lines */}
      <path d="M157 60 C159 56 163 54 166 55" fill="none" stroke="#FFFFFF" strokeWidth="0.7" strokeLinecap="round" opacity="0.18" />
      <path d="M156 66 C158 62 163 60 167 61" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeLinecap="round" opacity="0.14" />
      <path d="M158 71 C161 67 166 66 170 67" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeLinecap="round" opacity="0.12" />
      {/* Tail fluff */}
      <path d="M190 72 C194 67 197 60 197 54" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeLinecap="round" opacity="0.15" />
      <path d="M187 72 C191 67 194 59 194 53" fill="none" stroke="#F5F0E8" strokeWidth="0.5" strokeLinecap="round" opacity="0.20" />
      {/* Body chest fluff */}
      <path d="M167 72 C170 68 175 66 180 67" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeLinecap="round" opacity="0.13" />
      <path d="M165 80 C169 76 174 75 179 76" fill="none" stroke="#FFFFFF" strokeWidth="0.5" strokeLinecap="round" opacity="0.10" />
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
