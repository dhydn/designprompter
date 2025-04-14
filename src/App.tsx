import { useState } from 'react'
import './App.css'

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="app-container">
      <div className="content-container">
        <h1 className="title">Design Prompter</h1>
        <button onClick={() => setCount(count => count + 1)}>
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
