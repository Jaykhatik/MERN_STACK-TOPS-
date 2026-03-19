import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount } from './redux/slices/counterSlice'

function App() {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value)
  const [num, setNum] = useState(0);
  return (
    <>
      <div className="container">
        <div className="card">
          <h2 className="title">Redux Counter</h2>
          <h1 className="count">{count}</h1>

          <div className="btn-group">
            <button className="btn" onClick={() => dispatch(increment())}>
              + Increment
            </button>

            <button className="btn danger" onClick={() => dispatch(decrement())}>
              - Decrement
            </button>
            <input type="number"
              value={num}
              onChange={(e) => {
                setNum(e.target.value)
              }} />
            <button className="btn success" onClick={() => dispatch(incrementByAmount(Number(num)))}>
             Increment By Selected Value 
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App