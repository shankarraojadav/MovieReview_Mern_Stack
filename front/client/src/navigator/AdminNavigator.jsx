import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard";
import Movies from "../components/admin/Movies";
import Actors from "../components/admin/Actors";
import NotFound from "../components/user/NotFound";
import AdminNavbar from "../components/admin/AdminNavbar";
import ".././css/navbar.css";


function AdminNavigator() {
  return (
    <Box sx={{ display: "flex", flexGrow: 1, p: 1, marginTop: "8vh" }}>
      <AdminNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default AdminNavigator;
