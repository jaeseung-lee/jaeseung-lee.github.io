import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

const IndexPage = React.lazy(() => import("./page/indexPage/IndexPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<React.Fragment />}>
        <Routes>
          <Route path="/" element={<IndexPage />}></Route>
          <Route path=":pathId" element={<IndexPage />}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
