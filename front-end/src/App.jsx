import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from "react-hot-toast";
import TestPage from "./pages/TestPage";
import ClientPage from "./pages/client/ClientPage";
import Forget from "./pages/client/Forget";

const clientId = "989136870072-8dt6vqf0106tobie6qnjndb3u78f8lj8.apps.googleusercontent.com" ;

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId}>
        <div className="w-full h-screen justify-center">
          <Toaster position="top-right" />
          <Routes path="/">
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/forget" element={<Forget />} />
            <Route path="/*" element={<ClientPage />} />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
