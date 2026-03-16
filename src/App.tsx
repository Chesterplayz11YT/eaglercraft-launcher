/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Gamepad2, 
  Shield, 
  Settings, 
  Info, 
  ExternalLink, 
  X, 
  Maximize2, 
  Minimize2, 
  Zap, 
  Ghost,
  ChevronRight,
  Monitor,
  Download,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GameVersion {
  id: string;
  name: string;
  description: string;
  url: string;
  category: '1.8.8' | 'Classic' | 'Beta/Alpha' | 'Special';
  tags?: string[];
}

const GAME_VERSIONS: GameVersion[] = [
  {
    id: '1.8.8-normal',
    name: 'Eaglercraft 1.8.8 Normal',
    description: 'The standard vanilla experience for 1.8.8.',
    url: 'https://raw.githubusercontent.com/SharpAIDeepCameraTeam/silicon-eaglercraft-launcher/main/eagler/EaglercraftX_1.8_u44_Offline_Signed.html',
    category: '1.8.8',
    tags: ['Vanilla', 'Stable']
  },
  {
    id: '1.8.8-mega',
    name: 'Mega Client',
    description: 'Standard client with basic features and optimizations.',
    url: 'https://raw.githubusercontent.com/SharpAIDeepCameraTeam/silicon-eaglercraft-launcher/main/eagler/mega.html',
    category: '1.8.8',
    tags: ['Optimized']
  },
  {
    id: '1.8.8-arch',
    name: 'Arch Client',
    description: 'Special launcher with access to unique clients.',
    url: 'https://raw.githubusercontent.com/SharpAIDeepCameraTeam/silicon-eaglercraft-launcher/main/eagler/arch.html',
    category: '1.8.8',
    tags: ['Feature Rich']
  },
  {
    id: '1.8.8-wasm',
    name: 'EaglercraftX WASM-GC',
    description: 'High performance version using WASM-GC. Requires JSPI flag in Chrome.',
    url: 'https://raw.githubusercontent.com/SharpAIDeepCameraTeam/silicon-eaglercraft-launcher/main/eagler/EaglercraftX_1.8_WASM-GC_Offline_Download.html',
    category: '1.8.8',
    tags: ['Experimental', 'High Perf']
  },
  {
    id: '1.5.2-classic',
    name: 'Eaglercraft 1.5.2',
    description: 'Classic Minecraft 1.5.2 experience.',
    url: 'https://raw.githubusercontent.com/SharpAIDeepCameraTeam/silicon-eaglercraft-launcher/main/eagler/Eaglercraft-1.5.2-Offline.html',
    category: 'Classic',
    tags: ['Classic', 'Lightweight']
  },
  {
    id: '1.2.5-vintage',
    name: 'Eaglercraft 1.2.5',
    description: 'Vintage Minecraft 1.2.5 gameplay.',
    url: 'https://raw.githubusercontent.com/SharpAIDeepCameraTeam/silicon-eaglercraft-launcher/main/eagler/Eaglercraft-1.2.5-Offline.html',
    category: 'Classic'
  },
  {
    id: 'beta-1.7.3',
    name: 'Beta 1.7.3',
    description: 'The legendary Beta 1.7.3 version.',
    url: 'https://raw.githubusercontent.com/SharpAIDeepCameraTeam/silicon-eaglercraft-launcher/main/eagler/Eaglercraft-Beta-1.7.3-Offline.html',
    category: 'Beta/Alpha'
  },
  {
    id: 'indev',
    name: 'Indev',
    description: 'Early development version of Minecraft.',
    url: 'https://raw.githubusercontent.com/SharpAIDeepCameraTeam/silicon-eaglercraft-launcher/main/eagler/Eaglercraft-Indev-Offline.html',
    category: 'Beta/Alpha'
  },
  {
    id: 'resent-4.0',
    name: 'Resent Client 4.0',
    description: 'Feature-rich client with modern UI.',
    url: 'https://raw.githubusercontent.com/SharpAIDeepCameraTeam/silicon-eaglercraft-launcher/main/eagler/Resent-Signed.html',
    category: 'Special',
    tags: ['Modern UI']
  }
];

const SERVERS = [
  "LampLifesteal", "ZythMC", "Clever Teaching", "Asspixel Network", 
  "VanillaMC", "TimeLegacy", "HollowNet", "Rice Network", 
  "Thanatos-Network", "WebMC OneBlock", "CarrotCraft Network", 
  "Ethereal", "SealCraft", "Zentic Network", "Hyper Network", 
  "AnarchMC", "CommunistMC", "Cheeseburger Network", "GalaxyPrisons"
];

const TEXTURE_PACKS = [
  { name: "Fullbright 1.8", description: "Full visibility in dark areas." },
  { name: "Scope 32x", description: "Enhanced 32x resolution textures." },
  { name: "Zerocraft Magic", description: "Magical themed visuals." },
  { name: "Aquari", description: "Ocean-themed underwater textures." }
];

export default function App() {
  const [activeGame, setActiveGame] = useState<GameVersion | null>(null);
  const [showDirections, setShowDirections] = useState(false);

  const panic = useCallback(() => {
    // Stealth feature: close tab or redirect
    window.location.href = 'https://www.google.com';
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`') {
        panic();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [panic]);

  const handleCloak = () => {
    // about:blank cloaking logic
    const win = window.open('about:blank', '_blank');
    if (win) {
      const iframe = win.document.createElement('iframe');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.position = 'fixed';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.src = window.location.href;
      win.document.body.appendChild(iframe);
      win.document.body.style.margin = '0';
      win.document.body.style.padding = '0';
      win.document.title = 'Google Docs'; // Stealth title
    } else {
      alert('Please allow popups for cloaking to work!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Marquee Header */}
      <div className="marquee-container border-b-2 border-black">
        <div className="marquee-content">
          <span className="mx-4">SILICON LAUNCHER 🚀 PLAY MINECRAFT ANYWHERE</span>
          <span className="mx-4">PRESS ` TO PANIC</span>
          <span className="mx-4">STEALTH MODE ACTIVE</span>
          <span className="mx-4">CLOAKING ENABLED</span>
          <span className="mx-4">SILICON LAUNCHER 🚀 PLAY MINECRAFT ANYWHERE</span>
          <span className="mx-4">PRESS ` TO PANIC</span>
          <span className="mx-4">STEALTH MODE ACTIVE</span>
          <span className="mx-4">CLOAKING ENABLED</span>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="p-6 border-b-2 border-black flex flex-wrap items-center justify-between gap-4 bg-white sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 neon-bg border-2 border-black flex items-center justify-center brutal-border">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter">Silicon Launcher</h1>
            <p className="text-xs font-mono uppercase opacity-60">Eaglercraft Web Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowDirections(true)}
            className="p-3 brutal-border bg-white flex items-center gap-2 font-bold uppercase text-sm"
          >
            <Info className="w-4 h-4" />
            Directions
          </button>
          <button 
            onClick={handleCloak}
            className="p-3 brutal-border bg-white flex items-center gap-2 font-bold uppercase text-sm"
          >
            <Ghost className="w-4 h-4" />
            Cloak
          </button>
          <button 
            onClick={panic}
            className="p-3 brutal-border bg-red-500 text-white flex items-center gap-2 font-bold uppercase text-sm"
          >
            <Zap className="w-4 h-4 fill-current" />
            Panic (`)
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Game Grid */}
          <div className="lg:col-span-2 space-y-12">
            {(['1.8.8', 'Classic', 'Beta/Alpha', 'Special'] as const).map((cat) => (
              <section key={cat}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-4xl font-black uppercase italic">{cat}</h2>
                  <div className="flex-1 h-0.5 bg-black opacity-10"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {GAME_VERSIONS.filter(v => v.category === cat).map((game) => (
                    <motion.div
                      key={game.id}
                      whileHover={{ scale: 1.02 }}
                      className="brutal-border bg-white p-6 flex flex-col justify-between group cursor-pointer"
                      onClick={() => setActiveGame(game)}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold leading-tight group-hover:underline">{game.name}</h3>
                          <Monitor className="w-5 h-5 opacity-20" />
                        </div>
                        <p className="text-sm text-gray-600 mb-4 font-medium">{game.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {game.tags?.map(tag => (
                            <span key={tag} className="text-[10px] font-mono uppercase bg-black text-white px-2 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-widest flex items-center gap-1">
                          Play Now <ChevronRight className="w-3 h-3" />
                        </span>
                        <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            <div className="brutal-border neon-bg p-6">
              <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Stealth Tips
              </h3>
              <ul className="space-y-4 text-sm font-bold">
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-black text-white flex items-center justify-center shrink-0">01</span>
                  <p>Press the backtick (`) key anytime to instantly close the game and redirect to Google.</p>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-black text-white flex items-center justify-center shrink-0">02</span>
                  <p>Use the "Cloak" button to open the launcher in an about:blank tab, hiding it from history.</p>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-black text-white flex items-center justify-center shrink-0">03</span>
                  <p>Always allow popups for the best stealth experience.</p>
                </li>
              </ul>
            </div>

            <div className="brutal-border bg-white p-6">
              <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                <Monitor className="w-6 h-6" />
                Featured Servers
              </h3>
              <div className="flex flex-wrap gap-2">
                {SERVERS.map(server => (
                  <span key={server} className="text-[10px] font-bold uppercase border border-black px-2 py-1 bg-gray-50">
                    {server}
                  </span>
                ))}
              </div>
              <p className="text-[10px] mt-4 opacity-60 italic font-mono uppercase">Connect via Multiplayer menu in-game</p>
            </div>

            <div className="brutal-border bg-white p-6">
              <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Texture Packs
              </h3>
              <div className="space-y-3">
                {TEXTURE_PACKS.map(pack => (
                  <div key={pack.name} className="border-b border-black/5 pb-2 last:border-0">
                    <p className="text-sm font-bold">{pack.name}</p>
                    <p className="text-[10px] opacity-60">{pack.description}</p>
                  </div>
                ))}
              </div>
              <a 
                href="https://github.com/SharpAIDeepCameraTeam/silicon-eaglercraft-launcher/tree/main/texture-packs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-black uppercase text-[10px] underline"
              >
                Download Packs <Download className="w-3 h-3" />
              </a>
            </div>

            <div className="brutal-border bg-black text-white p-6">
              <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                Note
              </h3>
              <p className="text-sm opacity-80 leading-relaxed italic">
                This is an offline-capable launcher. All game files are served directly from the official repository. No installation or server required.
              </p>
            </div>

            <div className="brutal-border bg-white p-6">
              <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                <Download className="w-6 h-6" />
                Source
              </h3>
              <p className="text-sm mb-4">Want to host this yourself or see the source code?</p>
              <a 
                href="https://github.com/SharpAIDeepCameraTeam/silicon-eaglercraft-launcher" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-black uppercase text-xs underline"
              >
                GitHub Repository <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Game Modal */}
      <AnimatePresence>
        {activeGame && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col"
          >
            <div className="p-4 flex items-center justify-between bg-white border-b-2 border-black">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 neon-bg border-2 border-black flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <h2 className="font-black uppercase tracking-tight">{activeGame.name}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setActiveGame(null)}
                  className="p-2 brutal-border bg-white hover:bg-red-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-black relative">
              <iframe 
                src={activeGame.url} 
                className="w-full h-full border-none"
                title={activeGame.name}
                allow="autoplay; fullscreen; keyboard"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Directions Modal */}
      <AnimatePresence>
        {showDirections && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              className="bg-white brutal-border max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
            >
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-4xl font-black uppercase italic">Getting Started</h2>
                <button onClick={() => setShowDirections(false)} className="p-2 brutal-border">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-black uppercase mb-4 underline decoration-neon-green decoration-4 underline-offset-4">1. Installation</h3>
                  <p className="text-gray-700 leading-relaxed">
                    This launcher is completely web-based. No download is required to play. Simply select a version from the grid and start playing instantly.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-black uppercase mb-4 underline decoration-neon-green decoration-4 underline-offset-4">2. Launching</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Select your preferred Minecraft version. For the best performance, use Chrome and enable the <strong>WASM-GC</strong> version if you have the JSPI flag enabled.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-black uppercase mb-4 underline decoration-neon-green decoration-4 underline-offset-4">3. Resource Packs</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Access built-in texture packs through the in-game menu. You can also upload your own .zip resource packs in the game settings.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-black uppercase mb-4 underline decoration-neon-green decoration-4 underline-offset-4">4. Controls</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Standard Minecraft controls apply. Use <strong>WASD</strong> to move, <strong>Space</strong> to jump, and <strong>Left Click</strong> to mine.
                  </p>
                </section>

                <div className="p-4 bg-yellow-100 border-2 border-black font-bold text-sm">
                  ⚠️ NOTE: If the game doesn't load, try disabling your ad-blocker or checking your internet connection. Some school/work networks may block the raw GitHub URLs.
                </div>
              </div>

              <button 
                onClick={() => setShowDirections(false)}
                className="mt-12 w-full p-4 brutal-border bg-black text-white font-black uppercase tracking-widest"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="p-6 border-t-2 border-black bg-white flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-mono uppercase opacity-60">© 2026 Silicon Launcher Portal • Built for Speed & Stealth</p>
        <div className="flex gap-6">
          <a href="#" className="text-xs font-black uppercase hover:underline">Privacy</a>
          <a href="#" className="text-xs font-black uppercase hover:underline">Terms</a>
          <a href="#" className="text-xs font-black uppercase hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
}
