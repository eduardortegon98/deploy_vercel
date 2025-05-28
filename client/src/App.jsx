// App.jsx
import { useState } from "react";
import ChatbotContainer from "./components/ChatbotContainer";

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-8">
       <ChatbotContainer />
    </div>
  );
}

export default App;