import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: "flex" }}>
    <Navbar />

    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Sidebar />

      {children}
    </Box>
  </Box>
);

export default Layout;
