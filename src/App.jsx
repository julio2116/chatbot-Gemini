import { GoogleGenAI } from "@google/genai";
import './App.css'
import { useEffect, useState } from "react";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

function App() {
  const [response, setResponse] = useState("")
  const [message, setMessage] = useState("")

  useEffect(()=>{
    (async function(){
      await main()
    })()
  }, [message])

  async function main() {
    if (!message) return;
  
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message
    });

    setResponse(response.text)
  }

  function handleConversation(event){
    event.preventDefault()
    const message = event.target.querySelector("#message").value
    setMessage(message)
  }

  return (
    <>
      <form onSubmit={handleConversation}>
        <label htmlFor="message"></label>
        <input type="text" id="message" />
        <button>submit</button>
      </form>
      {response ?? (response || "carregando...")}
    </>
  )
}

export default App
