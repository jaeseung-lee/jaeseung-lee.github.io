import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./component/layout/MainLayout";
import React, { Suspense } from "react";

const IndexPage = React.lazy(() => import("./page/indexPage/IndexPage"));

function App() {
  return (
    <MainLayout>
      <BrowserRouter>
        <Suspense fallback={<React.Fragment />}>
          <Routes>
            <Route path="/" element={<IndexPage />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MainLayout>
  );
}

export default App;
