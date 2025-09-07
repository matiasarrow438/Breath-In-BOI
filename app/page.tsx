'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Home() {
  const [deployedGifs, setDeployedGifs] = useState<Array<{id: number, x: number, y: number}>>([])
  const [gifKey, setGifKey] = useState(0)
  const [contractCopied, setContractCopied] = useState(false)
  const [soundIndex, setSoundIndex] = useState(0)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [showTikTokPopup, setShowTikTokPopup] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const contractAddress = "7BMgK7wAmWwbRHU1WYRLcmkvp5Qa5vS744eajycbpump"
  const soundEffects = ['/soundeffects/boom.mp3', '/soundeffects/BOI.m4a']

  // Force GIFs to reload and sync
  useEffect(() => {
    const timer = setTimeout(() => {
      setGifKey(prev => prev + 1)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Show TikTok popup randomly after 3-8 seconds
  useEffect(() => {
    const randomDelay = Math.random() * 5000 + 3000 // 3-8 seconds
    const timer = setTimeout(() => {
      setShowTikTokPopup(true)
      // Auto dismiss after 10 seconds
      setTimeout(() => {
        setShowTikTokPopup(false)
      }, 10000)
    }, randomDelay)
    return () => clearTimeout(timer)
  }, [])

  const handleScreenClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newGif = {
      id: Date.now(),
      x: x,
      y: y
    }
    
    setDeployedGifs(prev => [...prev, newGif])
    setClickCount(prev => prev + 1)
    
    // Stop current audio if playing
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }
    
    // Play new alternating sound effect
    const audio = new Audio(soundEffects[soundIndex])
    audio.volume = 0.3
    setCurrentAudio(audio)
    
    audio.play().catch(() => {
      // Ignore errors if audio can't play (user hasn't interacted yet)
    })
    
    // Alternate to next sound
    setSoundIndex(prev => (prev + 1) % soundEffects.length)
  }

  const copyContract = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setContractCopied(true)
      setTimeout(() => setContractCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }


  return (
    <>
      <Head>
        <title>Breath in Boi</title>
        <meta name="description" content="breath in boi - The most legendary memecoin inspired by Spongebob Squarepants" />
      </Head>

                   {/* TikTok Popup */}
             {showTikTokPopup && (
               <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 animate-slideInRight">
                 <div className="bg-black bg-opacity-90 backdrop-blur-sm border border-yellow-400 p-4 sm:p-6 rounded-lg max-w-md mx-auto sm:mx-0 shadow-xl">
                   <div className="text-yellow-100">
                     <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-yellow-400">TikTok Viral</h3>
                     <p className="text-sm sm:text-base leading-relaxed">
                       You can't go on TikTok without seeing breath in boi memes in the comments!
                     </p>
                   </div>
                 </div>
               </div>
             )}

             {/* Gallery Button */}
             <div className="fixed top-4 left-4 z-50">
               <a 
                 href="/gallery"
                 className="bg-gradient-to-br from-yellow-300 to-yellow-600 text-black px-6 py-3 rounded-full font-bold hover:from-yellow-200 hover:to-yellow-500 transition-all duration-300 shadow-xl hover:scale-110 flex items-center gap-3 border-2 border-yellow-800 hover:border-yellow-900 transform hover:-translate-y-1"
                 style={{ 
                   boxShadow: '0 8px 20px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                 }}
               >
                 <img 
                   key={`gallery-gif-${gifKey}`}
                   src={`/assets/spongebod.gif?t=${gifKey}`} 
                   alt="Spongebob" 
                   className="w-7 h-7 cool-gif"
                 />
                 <span className="text-base font-bold">Gallery</span>
               </a>
             </div>

             <main 
               className="min-h-screen flex flex-col items-center justify-center p-4 cursor-pointer relative select-none"
               onClick={handleScreenClick}
               style={{
                 WebkitUserSelect: 'none',
                 MozUserSelect: 'none',
                 msUserSelect: 'none',
                 userSelect: 'none',
                 WebkitTouchCallout: 'none',
                 WebkitTapHighlightColor: 'transparent'
               }}
             >
        {/* Deployed GIFs */}
        {deployedGifs.map((gif) => (
          <div
            key={gif.id}
            className="absolute pointer-events-none"
            style={{
              left: gif.x - 50,
              top: gif.y - 50,
              zIndex: 10,
            }}
          >
            <img 
              key={`deployed-gif-${gif.id}-${gifKey}`}
              src={`/assets/spongebod.gif?t=${gifKey}`} 
              alt="Spongebob" 
              className="w-24 h-24 cool-gif"
            />
          </div>
        ))}

        {/* Main Content */}
        <div className="text-center relative z-0">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 flex items-center justify-center gap-4">
              <img 
                key={`gif-left-${gifKey}`}
                src={`/assets/spongebod.gif?t=${gifKey}`} 
                alt="Spongebob" 
                className="w-24 h-24 cool-gif"
              />
              <span className="bubble-font">
                Breath in Boi
              </span>
              <img 
                key={`gif-right-${gifKey}`}
                src={`/assets/spongebod.gif?t=${gifKey}`} 
                alt="Spongebob" 
                className="w-24 h-24 cool-gif"
              />
            </h1>
                               <p className="text-lg md:text-xl text-yellow-200 max-w-2xl mx-auto mb-4 description-outline">
                     Breath in boi started as a Spongebob meme that was so stupid it was funny. 
                     People never forgot it and they never will.
                   </p>
            <p className={`font-bold mb-8 click-anywhere-text ${clickCount >= 10 ? 'text-sm md:text-base' : 'text-lg md:text-xl'}`} style={{ color: '#fbbf24' }}>
              [CLICK ANYWHERE]
            </p>
          </div>

        </div>

        {/* Contract Info */}
        <div className="max-w-2xl w-full text-center">
          <div 
            className="p-4 rounded-2xl font-mono text-sm break-all cursor-pointer transition-colors"
            style={{ backgroundColor: '#fbbf24', color: '#000' }}
            onClick={(e) => {
              e.stopPropagation()
              copyContract()
            }}
          >
            {contractAddress}
          </div>
          <p className="mt-4 text-sm" style={{ color: '#fbbf24' }}>
            {contractCopied ? "Copied!" : "Click to copy"}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 mt-8">
          <a 
            href="https://x.com/i/communities/1964455966180856057" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-black">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a 
            href="https://dexscreener.com/solana/7BMgK7wAmWwbRHU1WYRLcmkvp5Qa5vS744eajycbpump" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img 
              src="/assets/dexscreenericon.png" 
              alt="DexScreener" 
              className="w-8 h-8"
            />
          </a>
        </div>

      </main>
    </>
  )
}
