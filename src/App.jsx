import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./component/Home";
import Submissions from "./component/Submissions";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/submissions"
          element={<Submissions />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
