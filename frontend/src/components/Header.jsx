import { Bell } from "lucide-react";
import { Avatar, Badge, Box, Divider, IconButton, Typography,useTheme,useMediaQuery} from "@mui/material";
import logo from '../assets/Logo.png';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      component="header"
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        py: 2,
        px: 3,
        width: '100%'
      }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1830px',
        mx: 'auto'
      }}>
        {/* Left-aligned content (logo + greeting on desktop) */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Box 
            component="img"
            src={logo} 
            alt="Digi Khata Logo" 
            sx={{ height: 32 }} 
          />
          {!isMobile && (
            <>
              <Divider orientation="vertical" flexItem sx={{ height: 24 }} />
              <Typography variant="h6" component="h5" sx={{ whiteSpace: 'nowrap' }}>
                Hello, Riddhi Jani 👋
              </Typography>
            </>
          )}
        </Box>

        {/* Right-aligned content */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 1 : 3
        }}>
          {/* <IconButton>
            <Badge badgeContent={4} color="error">
              <Bell size={20} color={theme.palette.text.secondary} />
            </Badge>
          </IconButton> */}
          
          <Avatar sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: "primary.main",
            fontSize: '0.875rem'
          }}>
            RJ
          </Avatar>

          {/* Show name and role only on desktop */}
          {!isMobile && (
            <Box>
              <Typography variant="body2" fontWeight="medium">
                Riddhi Jani
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