import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { MainLayout } from '../layout/index';

export const Navigation = () => {
  return (
    <Suspense fallback={<span> Loading </span>} >
      <BrowserRouter>

        <MainLayout>
          <Routes>
            {
              routes.map(({path, Component}) => (
                <Route 
                  key={path} 
                  path={path} 
                  element={<Component />} 
                />
              ))
            }

            {/* Redirect */}
            <Route path="/*" element={ <Navigate to={routes[0].to} replace /> } />
          </Routes>
        </MainLayout>

      </BrowserRouter>
    </Suspense>
  )
}
