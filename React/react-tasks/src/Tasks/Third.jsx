import React, { useState } from 'react'

function Third() {
    const [input, setInput] = useState("");

    const [show, setShow] = useState("");

    function handleClick() {
        setShow(input)
    }
    function hideClick() {
        setShow(!input);
    }

    return (
        <>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleClick}>Click</button>
            <button onClick={hideClick}>Hide</button>
            <p>{show}</p>
        </>
    )
}

export default Third

//show and hide the input field on clicking of buttons