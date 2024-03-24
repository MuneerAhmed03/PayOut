import { Signup } from "./pages/signUp";
import { Signin } from "./pages/signIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SendMoney } from "./pages/sendMoney";
import { Dashboard } from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route
            path="/"
            element={<PublicRoute element={<Signin  />} />}
          />
          <Route
            path="/signup"
            element={<PublicRoute element={<Signup />} />}
          />
          <Route
            path="/signin"
            element={<PublicRoute element={<Signin  />} />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/send"
            element={<ProtectedRoute element={<SendMoney />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
