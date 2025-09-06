'use client'

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Gallery() {
  const [selectedMeme, setSelectedMeme] = useState<number | null>(null)

  // Your meme collection
  const memes = [
    {
      id: 1,
      title: "Breath in Boi",
      description: "The original meme that started it all",
      image: "/gallery/sponegbob.jpg",
      date: "2024"
    },
    {
      id: 2,
      title: "Meme 1",
      description: "Another breath in boi classic",
      image: "/gallery/meme1.jpg",
      date: "2024"
    },
    {
      id: 3,
      title: "Meme 2", 
      description: "More breath in boi energy",
      image: "/gallery/meme2.jpg",
      date: "2024"
    },
    {
      id: 4,
      title: "Meme 3",
      description: "Breath in boi vibes",
      image: "/gallery/mem3.jpg",
      date: "2024"
    },
    {
      id: 5,
      title: "Meme 4",
      description: "The breath in boi collection grows",
      image: "/gallery/meme4.jpg",
      date: "2024"
    }
  ]

  return (
    <>
      <Head>
        <title>Gallery - Breath in Boi</title>
        <meta name="description" content="Gallery of breath in boi memes and content" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-yellow-400">
          <Link 
            href="/"
            className="bg-gradient-to-br from-yellow-300 to-yellow-600 text-black px-6 py-3 rounded-full font-bold hover:from-yellow-200 hover:to-yellow-500 transition-all duration-300 shadow-xl hover:scale-110 border-2 border-yellow-800 hover:border-yellow-900 transform hover:-translate-y-1"
            style={{ 
              boxShadow: '0 8px 20px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            }}
          >
            ← Back to Home
          </Link>
          <h1 className="text-2xl font-bold" style={{ color: '#fbbf24' }}>
            Meme Gallery
          </h1>
          <div></div> {/* Spacer for centering */}
        </div>

        {/* Gallery Grid */}
        <div className="p-8">
          {memes.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl mb-4" style={{ color: '#fbbf24' }}>
                More memes coming soon!
              </h2>
              <p className="text-gray-400">
                Check back later for more breath in boi content
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {memes.map((meme) => (
                <div 
                  key={meme.id}
                  className="bg-gray-900 rounded-lg p-2"
                >
                  <img 
                    src={meme.image} 
                    alt={meme.title}
                    className="w-full h-80 object-contain rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal for selected meme */}
        {selectedMeme && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMeme(null)}
          >
            <div 
              className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold" style={{ color: '#fbbf24' }}>
                  {memes.find(m => m.id === selectedMeme)?.title}
                </h2>
                <button 
                  onClick={() => setSelectedMeme(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <img 
                src={memes.find(m => m.id === selectedMeme)?.image} 
                alt={memes.find(m => m.id === selectedMeme)?.title}
                className="w-full rounded-lg mb-4"
              />
              <p className="text-gray-300">
                {memes.find(m => m.id === selectedMeme)?.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
