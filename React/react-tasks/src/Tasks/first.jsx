import React, { useState } from 'react'

function First() {
    const [count, setCount] = useState(0);
    function Increment() {
        setCount(count + 1)
    }
    function Decrement() {
        setCount(count - 1)
    }

    return (
        <>
            <button onClick={Increment}>+</button>
            {count}
            <button onClick={Decrement}>-</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </>
    )
}

export default First