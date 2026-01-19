import { Box, Divider, Typography, useTheme, useMediaQuery } from "@mui/material";
import logo from "../assets/Logo.png";
import UserMenu from "../components/UserMenu";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const agentName = localStorage.getItem("agentName") || "Agent";
  const agentEmail = localStorage.getItem("agentEmail") || "example@email.com";

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        py: 2,
        px: 3,
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1830px",
          mx: "auto",
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box component="img" src={logo} alt="DigiKhata Logo" sx={{ height: 32 }} />

          {!isMobile && (
            <>
              <Divider orientation="vertical" flexItem sx={{ height: 24 }} />
              <Typography variant="h6" component="h5" sx={{ whiteSpace: "nowrap" }}>
                Hello, {agentName} 👋
              </Typography>
            </>
          )}
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 1 : 3,
          }}
        >
          {/* 🔵 REPLACED MUI Avatar with your UserMenu */}
          <UserMenu agentName={agentName} agentEmail={agentEmail} />

          {/* SHOW name + role only on desktop */}
          {!isMobile && (
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {agentName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Agent
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
