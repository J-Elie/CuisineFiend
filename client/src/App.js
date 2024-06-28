import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext.js";
import Navbar from "./components/util/Navbar.js";
// import LoginForm from "./components/util/LoginForm.js"
// import RegisterForm from "./components/util/RegisterForm.js";
import LoginPage from "././components/pages/LoginPage.js";
import RegisterPage from "././components/pages/RegisterPage.js";
import HomePage from "././components/pages/HomePage.js";
import ProfilePage from "././components/pages/ProfliePage.js";
function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<HomePage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
