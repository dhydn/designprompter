import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <div className="app-container">
      {/* Background blobs using Framer Motion */}
      <motion.div
        className="blob"
        style={{
          width: '60vmax',
          height: '60vmax',
          background: 'radial-gradient(circle, rgba(255, 182, 193, 0.5) 0%, rgba(255, 182, 193, 0) 70%)',
          top: '-20%',
          left: '-20%',
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -50, 20, 0],
          rotate: [0, 120, 240, 360],
          scale: [1, 1.1, 1, 1.1],
          opacity: [0.5, 0.8, 0.5, 0.8],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="blob"
        style={{
          width: '60vmax',
          height: '60vmax',
          background: 'radial-gradient(circle, rgba(173, 216, 230, 0.5) 0%, rgba(173, 216, 230, 0) 70%)',
          top: '60%',
          left: '60%',
        }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -20, 0],
          rotate: [0, -120, -240, -360],
          scale: [1, 1.1, 1, 1.1],
          opacity: [0.5, 0.8, 0.5, 0.8],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="blob"
        style={{
          width: '60vmax',
          height: '60vmax',
          background: 'radial-gradient(circle, rgba(144, 238, 144, 0.5) 0%, rgba(144, 238, 144, 0) 70%)',
          top: '30%',
          left: '40%',
        }}
        animate={{
          x: [0, 20, -30, 0],
          y: [0, 40, -30, 0],
          rotate: [0, 90, 180, 270],
          scale: [1, 1.1, 1, 1.1],
          opacity: [0.5, 0.8, 0.5, 0.8],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <button className="idea-button">
        spark a new idea
      </button>
      <div className="attribution">
        created by <a href="https://www.devinhayden.com" target="_blank" rel="noopener noreferrer">Devin Hayden</a>
      </div>
    </div>
  )
}

export default App
