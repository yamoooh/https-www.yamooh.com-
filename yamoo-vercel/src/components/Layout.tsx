import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import AnnouncementBar from "./AnnouncementBar";
import BackButton from "./BackButton";

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <AnnouncementBar />
    <Navbar />
    <main className="flex-1 pt-28">
      <div className="container-tight pb-2"><BackButton /></div>
      <Outlet />
    </main>
    <Footer />
    <WhatsAppFloat />
  </div>
);

export default Layout;
