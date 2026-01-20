// import { Button } from "@mui/material";
// import VideocamIcon from '@mui/icons-material/Videocam';
// import { MissedVideoCall } from "@mui/icons-material";

// const ActionButtons = ({ onViewChange }) => {
//   return (
//     <div className="d-flex gap-3 my-3">
//       {/* Live & Schedule Button */}
//       <Button 
//         variant="contained" 
//         startIcon={<VideocamIcon sx={{ color: 'white' }} />}
//         size="medium"
//         onClick={() => onViewChange("live")}
//         sx={{ 
//           color: 'white',
//           backgroundColor: '#1C43A6',
//           padding: '8px 16px',
//           minWidth: '160px',
//           fontSize: '0.875rem',
//           '&:hover': {
//             backgroundColor: '#15317D',
//           },
//           '& .MuiButton-startIcon': {
//             marginRight: '8px'
//           },
//           textTransform: 'none',
//           boxShadow: 'none'
//         }}
//       >
//         Live & Schedule (1)
//       </Button>

//       {/* Missed Calls Button */}
//       <Button 
//         variant="contained" 
//         size="medium"
//         startIcon={<MissedVideoCall fontSize="medium" sx={{ color: 'white' }} />}
//         onClick={() => onViewChange("missed")}
//         sx={{
//           color: 'white',
//           backgroundColor: '#F12B01',
//           padding: '8px 16px',
//           minWidth: '140px',
//           fontSize: '0.875rem',
//           '&:hover': {
//             backgroundColor: '#e42803ff',
//           },
//           '& .MuiButton-startIcon': {
//             marginRight: '8px'
//           },
//           textTransform: 'none'
//         }}
//       >
//         Missed Calls (5)
//       </Button>
//     </div>
//   );
// };

// made responsive 

import { Button } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import { MissedVideoCall, Refresh } from "@mui/icons-material";

const ActionButtons = ({
  activeView,
  onViewChange,
  liveCount,
  missedCount,
  onRefresh,
}) => {
  return (
    <div
      className="d-flex gap-3 my-3"
      style={{
        flexWrap: "wrap",
      }}
    >
      <Button
        variant="contained"
        startIcon={<VideocamIcon />}
        onClick={() => onViewChange("live")}
        sx={{
          backgroundColor: activeView === "live" ? "#1C43A6" : "#9bb0e8",
          textTransform: "none",
          padding: "8px 16px",
          minWidth: "140px",
          width: { xs: "100%", sm: "auto" }, 
          fontSize: "0.875rem",
          "&:hover": {
            backgroundColor: "#1C43A6",
          },
          "& .MuiButton-startIcon": {
            marginRight: "8px",
          },
        }}
      >
        Live & Schedule ({liveCount})
      </Button>

      <Button
        variant="contained"
        startIcon={<MissedVideoCall />}
        onClick={() => onViewChange("missed")}
        sx={{
          backgroundColor: activeView === "missed" ? "#F12B01" : "#f5a08c",
          textTransform: "none",
          padding: "8px 16px",
          minWidth: "140px",
          width: { xs: "100%", sm: "auto" }, 
          fontSize: "0.875rem",
          "&:hover": {
            backgroundColor: "#e42803ff",
          },
          "& .MuiButton-startIcon": {
            marginRight: "8px",
          },
        }}
      >
        Missed Calls ({missedCount})
      </Button>

      <Button
        variant="outlined"
        startIcon={<Refresh />}
        onClick={onRefresh}
        sx={{
          color: "#1C43A6",
          textTransform: "none",
          padding: "8px 16px",
          minWidth: "140px",
          width: { xs: "100%", sm: "auto" }, 
          fontSize: "0.875rem",
          "&:hover": {
            backgroundColor: "#7c8cba",
            color: "white",
          },
          "& .MuiButton-startIcon": {
            marginRight: "8px",
          },
        }}
      >
        Refresh
      </Button>
    </div>
  );
};

export default ActionButtons;

