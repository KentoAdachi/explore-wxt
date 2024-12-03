import { useState, useEffect } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./App.css";
import { fetchChat } from "./Chat";
import { storage } from "wxt/storage";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [baseURL, setBaseURL] = useState("");

  useEffect(() => {
    storage.getItem("local:key").then((storedApiKey) => {
      if (storedApiKey) {
        setApiKey(storedApiKey as string);
      }
    });
    storage.getItem("local:baseURL").then((storedBaseURL) => {
      if (storedBaseURL) {
        setBaseURL(storedBaseURL as string);
      }
    });
  }, []);

  const handleMessageClick = async () => {
    const msg = await fetchChat(apiKey, baseURL);
    setMessage(msg ?? "no message");
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    storage.setItem("local:key", e.target.value);
  };

  const handleBaseURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaseURL(e.target.value);
    storage.setItem("local:baseURL", e.target.value);
  };

  return (
    <>
      <div>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <input
          type="text"
          placeholder="Enter API Key"
          value={apiKey}
          onChange={handleApiKeyChange}
        />
        <input
          type="text"
          placeholder="https://api.openai.com/v1"
          value={baseURL}
          onChange={handleBaseURLChange}
        />
        <button onClick={handleMessageClick}>Message: {message}</button>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p>
    </>
  );
}

export default App;
