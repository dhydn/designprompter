import { useState } from 'react'

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Design Prompter
        </h1>
        <button
          onClick={() => setCount(count => count + 1)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
