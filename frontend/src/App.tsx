import React, { useEffect, useState } from "react";
import "./App.css";
import { IApiResponse } from "./types";

function App() {
  const [message, setMessage] = useState("not set");
  useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data: IApiResponse<{ message: string }>) => {
        if (data.data) {
          console.log(data.data.message);
        }
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Message from backend /test</p>
        <p>
          <i>{message ?? "Nothing :("}</i>
        </p>
      </header>
    </div>
  );
}

export default App;
