import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./routes/Home";
import Movies from "./routes/Movies";
import Login from "./routes/Login";


export default function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="movies" element={<Movies />} />

        <Route path="*" element={<NoMatch />} />
        
      </Routes>
    </div>
  );
}




function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
