import { useEffect, useState } from 'react';
import './App.css'
import axios from "axios";

const BACKEND_URL = 'http://localhost:8000'

function App() {
  const [greeting, setGreeting] = useState("")
  const fetchGreeting = async() => {
    const response =  await axios.get(`${BACKEND_URL}/api/hello`)
    console.log(response.data)
    setGreeting(response.data)
  }
  useEffect(() => {
    fetchGreeting()
  }, [])
  
  return (
    <div>
      Docker Sample
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <p>{greeting.message}</p>
    </div>
  )
}

export default App
