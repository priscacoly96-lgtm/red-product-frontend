import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from "./pages/ResetPassword";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/reset-password/:uid/:token" element={<ResetPassword />} /><Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;