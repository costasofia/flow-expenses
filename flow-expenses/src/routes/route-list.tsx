import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Expenses from "../pages/expenses/expenses";
function RouteList() {
  
  function ProtectedRoute({ children }: { children: JSX.Element }) {
    const idUser = localStorage.getItem("idUser");
    return idUser ? children : <Navigate to="/login" />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
         <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default RouteList;
