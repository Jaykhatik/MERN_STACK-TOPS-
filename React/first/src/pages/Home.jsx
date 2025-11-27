import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'

function Home() {
  return (
<><div>
    <Header/>
  <div className="container p-5 my-5 border">
    <h1>My First Bootstrap Page</h1>
    <p>This container has a border and some extra padding and margins.</p>
  </div>
  <div className="container p-5 my-5 bg-dark text-white">
    <h1>My First Bootstrap Page</h1>
    <p>This container has a dark background color and a white text, and some extra padding and margins.</p>
  </div>
  <div className="container p-5 my-5 bg-primary text-white">
    <h1>My First Bootstrap Page</h1>
    <p>This container has a blue background color and a white text, and some extra padding and margins.</p>
  </div>
</div>


<Footer/>

</>
  )
}

export default Home