import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./User/pages/Users";
import NewPlace from "./Places/pages/NewPlace";
import MainNavigation from "./Shared/components/Navigation/MainNavigation";
import UserPlaces from "./Places/pages/UserPlaces";
import UpdatePlace from "./Places/pages/UpdatePlace";
import Auth from "./User/pages/Auth";

import { AuthContext } from "./Shared/context/auth-context";
import { useAuth } from "./Shared/hooks/auth-hook";

function App() {
  const { login, loggedInUserId, logout, token } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="*" element={<Users />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, login, logout, loggedInUserId }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
