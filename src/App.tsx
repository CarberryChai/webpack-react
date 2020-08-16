import React, { useState, useEffect } from 'react'
import './app.less'

export default function App(): JSX.Element {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = 'React App'
  }, [])
  return (
    <div>
      <p>{count}</p>
      <button type='button' className='btn' onClick={() => setCount(count + 1)}>
        Click
      </button>
    </div>
  )
}
