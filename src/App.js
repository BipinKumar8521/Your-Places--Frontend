import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./User/pages/Users";
import NewPlace from "./Places/pages/NewPlace";
import MainNavigation from "./Shared/components/Navigation/MainNavigation";
import UserPlaces from "./Places/pages/UserPlaces";
import UpdatePlace from "./Places/pages/UpdatePlace";

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/places/new" element={<NewPlace />} />
          <Route path="/places/:placeId" element={<UpdatePlace />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route path="*" element={<Users />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
