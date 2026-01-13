// import { Button } from "@mui/material";
// import VideocamIcon from '@mui/icons-material/Videocam';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import { MissedVideoCall } from "@mui/icons-material";

// const ActionButtons = () => {
//   return (
//     <div className="d-flex gap-3 my-3">
//       {/* Live & Schedule Button */}
//       <Button 
//         variant="contained" 
//         startIcon={<VideocamIcon sx={{ color: 'white' }} />}
//         size="medium"
//         sx={{ 
//           color: 'white',
//           backgroundColor: '#1C43A6',
//           padding: '8px 16px',
//           minWidth: '160px',
//           fontSize: '0.875rem',
//           '&:hover': {
//             backgroundColor: '#15317D', // Darker shade for hover
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

//       {/* Add Customer Button */}
//       <Button 
//         variant="contained" 
//         size="medium"
//         startIcon={<MissedVideoCall fontSize="medium" sx={{ color: 'white' }} />}
//         sx={{
//           color: 'white',
//           backgroundColor: '#F12B01',
//           padding: '8px 16px',
//           minWidth: '140px',
//           fontSize: '0.875rem',
//           '&:hover': {
//             // borderColor: '#15317D',
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

// export default ActionButtons;


import { Button } from "@mui/material";
import VideocamIcon from '@mui/icons-material/Videocam';
import { MissedVideoCall } from "@mui/icons-material";

const ActionButtons = ({ onViewChange }) => {
  return (
    <div className="d-flex gap-3 my-3">
      {/* Live & Schedule Button */}
      <Button 
        variant="contained" 
        startIcon={<VideocamIcon sx={{ color: 'white' }} />}
        size="medium"
        onClick={() => onViewChange("live")}
        sx={{ 
          color: 'white',
          backgroundColor: '#1C43A6',
          padding: '8px 16px',
          minWidth: '160px',
          fontSize: '0.875rem',
          '&:hover': {
            backgroundColor: '#15317D',
          },
          '& .MuiButton-startIcon': {
            marginRight: '8px'
          },
          textTransform: 'none',
          boxShadow: 'none'
        }}
      >
        Live & Schedule (1)
      </Button>

      {/* Missed Calls Button */}
      <Button 
        variant="contained" 
        size="medium"
        startIcon={<MissedVideoCall fontSize="medium" sx={{ color: 'white' }} />}
        onClick={() => onViewChange("missed")}
        sx={{
          color: 'white',
          backgroundColor: '#F12B01',
          padding: '8px 16px',
          minWidth: '140px',
          fontSize: '0.875rem',
          '&:hover': {
            backgroundColor: '#e42803ff',
          },
          '& .MuiButton-startIcon': {
            marginRight: '8px'
          },
          textTransform: 'none'
        }}
      >
        Missed Calls (5)
      </Button>
    </div>
  );
};

export default ActionButtons;