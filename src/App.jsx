import Daftar from "./Pages/Daftar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Sewa from "./Pages/Sewa";
import Profil from "./Pages/Profil";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Parent } from "./Context/Context";
import Verifikasi from "./Pages/Verifikasi";

import Dashboard from "./Pages/Dashboard";

import BuatTim from "./Pages/BuatTim";
import EditPemain from "./Pages/EditPemain";
import KelolaUser from "./Pages/KelolaUser";
import Perizinan from "./Pages/Perizinan";
import KelolaWasit from "./Pages/KelolaWasit";

import DetailTim from "./Pages/DetailTim";
import Tombol from "./Pages/Test";
import KelolaTim from "./Pages/KelolaTim";
import JadwalPemakaian from "./Pages/JadwalPemakaian";
import BlacklistTim from "./Pages/BlacklistTim";
import KelolaFotographer from "./Pages/KelolaFotographer";
import TentangKami from "./Pages/TentangKami";
import KelolaJamMain from "./Pages/KelolaJamMain";
import DataLibur from "./Pages/DataLibur";
import NotFound from "./Pages/NotFound";
import ResetPassword from "./Pages/ResetPassword";
import LupaPassword from "./Pages/LupaPassword";

function App() {
  return (
    <BrowserRouter>
      <Parent>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<TentangKami />} path="/tentangkami" />
          <Route element={<Sewa />} path="/sewa" />
          <Route element={<Login />} path="/login" />
          <Route element={<Daftar />} path="/daftar" />
          <Route element={<Profil />} path="/profile/:id" />
          {/* history pertandingan kemungkinan tidak digunakan */}

          <Route element={<BuatTim />} path="/buattim/:id" />
          <Route element={<EditPemain />} path="/profile/pemain/:id" />

          <Route element={<Verifikasi />} path="/verifikasi/:id" />
          <Route element={<ResetPassword/>} path="/resetpassword/:id" />
          <Route element={<LupaPassword/>} path="/lupapassword" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<KelolaUser />} path="/dashboard/user" />
          <Route element={<JadwalPemakaian />} path="/dashboard/jadwal" />

          <Route element={<Perizinan />} path="/dashboard/reservasi" />
          <Route element={<KelolaWasit />} path="/dashboard/kelolawasit" />
          <Route element={<KelolaFotographer />} path="/dashboard/kelolafotographer"/>
          <Route element={<KelolaJamMain />} path="/dashboard/kelolajammain" />
          <Route element={<DetailTim />} path="/profile/tim/:id" />
          <Route element={<KelolaTim />} path="/dashboard/tim" />
          <Route element={<BlacklistTim />} path="/dashboard/tim/blacklist" />
          <Route element={<DataLibur />} path="/dashboard/datalibur" />
          <Route element={<NotFound />} path="/*" />


          <Route element={<Tombol />} path="/test" />
        </Routes>
      </Parent>
    </BrowserRouter>
  );
}

export default App;
