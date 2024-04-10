import { useState } from 'react'
import './App.css'


function App() {
  const header = Header();
  const footer = Footer();
  return (
    <Header />,
    <Footer />
  )
}

function Header() {
  const [count, setCount] = useState(0)

  return (
    <>
      <head>
      <meta charset="utf-8"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <title>Create your haircut</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
      <link href="style.css"></link>
    </head>
    </>
  )
}

function Main() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    </>
  )
}

function Footer() {
  const [count, setCount] = useState(0)

  return (
    <>
      <footer>
        <span class="text-reset">Vincent Reiley</span>
        <br />
        <a href="https://github.com/reileyvs/startup">GitHub</a>
      </footer>
    </>
  )
}

function NewElement() {
  
}

export default App
