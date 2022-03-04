import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";

export const Navigation = () => (
  <Routes>
    {routes.map(({path, Component}) => (
      <Route 
        key={path} 
        path={path} 
        element={<Component />} 
      />
    ))}

    {/* Redirect */}
    <Route path="/*" element={ <Navigate to={routes[0].to} replace /> } />
  </Routes>
)
