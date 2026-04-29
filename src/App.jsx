import './App.css'
import Home  from './pages/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./pages/cart.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";

const ProtectedRoute = ({children}) => {
  const { token } = useSelector((state) => state.auth);
  if (!token) {
    return <Navigate to="/login" />; // ← redirect to login if not logged in
  }
  return children;

}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />

        {/* ── Protected Routes ── */}
        {/* <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />}></Route>
//         <Route path="/cart" element={<Cart />}></Route>
//       </Routes>
//       {/* <Home /> */}
//     </BrowserRouter>
//   );
// }

export default App
