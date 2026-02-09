import React, { useState } from 'react'

function Second() {
    const [show, setShow] = useState(false);
    return (
        <>
            <input type={show ? "text" : "password"} />
            <button onClick={() => setShow(!show)}>Show/Hide</button>
        </>
    )
}

export default Second

// show and hide the password using input