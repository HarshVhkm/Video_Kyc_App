// import { Chip, Box } from '@mui/material';

// const StatusIndicator = ({ status }) => {
//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "live":
//         return "success";
//       case "waiting":
//         return "warning";
//       case "completed":
//         return "info";
//       default:
//         return "default";
//     }
//   };

//   const colorMap = {
//     success: '#2e7d32',
//     warning: '#ed6c02',
//     info: '#0288d1',
//     default: '#757575'
//   };
  
//   const color = colorMap[getStatusColor(status)] || colorMap.default;

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

//         <Box
//         sx={{
//           width: 16,
//           height: 16,
//           borderRadius: '50%',
//           border: `2px solid ${color}`,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}
//         >
//         <Box
//           sx={{
//             width: 8,
//             height: 8,
//             borderRadius: '50%',
//             backgroundColor: color
//           }}
//         />
//       </Box>
//       <Chip
//       className='fw-bold'
//         label={status}
//         variant='plain'
//         sx={{
//           color: color,
//           backgroundColor: 'transparent',
//           '& .MuiChip-label': {
//             paddingLeft: '8px',
//             paddingRight: '4px'
//           }
//         }}
//         size="small"
//       />

//     </Box>
//   );
// };

// export default StatusIndicator;


// import { Chip, Box, Typography } from '@mui/material';

// const StatusIndicator = ({ status }) => {
//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "live":
//         return "success";
//       // case "waiting":
//       //   return "warning";
//       // case "completed":
//       //   return "info";
//       case "scheduled":
//         return "scheduled";
//       default:
//         return "default";
//     }
//   };

//   const colorMap = {
//     success: '#2e7d32',
//     warning: '#ed6c02',
//     info: '#0288d1',
//     scheduled: 'rgba(28, 67, 166, 1)',
//     default: '#757575'
//   };
  
//   const color = colorMap[getStatusColor(status)] || colorMap.default;

//   // Static date and time for scheduled status
//   const staticDate = "10 Apr 2025";
//   const staticTime = "11:00am to 11:10am";

//   return (
//     <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
//       <Box
//         sx={{
//           width: 16,
//           height: 16,
//           borderRadius: '50%',
//           border: `2px solid ${color}`,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           marginTop: status.toLowerCase() === "scheduled" ? '4px' : '0'
//         }}
//       >
//         <Box
//           sx={{
//             width: 8,
//             height: 8,
//             borderRadius: '50%',
//             backgroundColor: color
//           }}
//         />
//       </Box>
      
//       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//         <Box sx={{ 
//           display: 'flex', 
//           alignItems: 'center',
//           minHeight: status.toLowerCase() === "scheduled" ? '24px' : '24px'
//         }}>
//           <Chip
//             className='fw-bold'
//             label={status}
//             variant='plain'
//             sx={{
//               color: color,
//               backgroundColor: 'transparent',
//               '& .MuiChip-label': {
//                 paddingLeft: '2px',
//                 paddingRight: '4px'
//               },
//               height: '20px',
//               alignSelf: 'flex-start'
//             }}
//             size="small"
//           />
//         </Box>
        
//         {/* Show static date and time in two lines only for scheduled status */}
//         {status.toLowerCase() === "scheduled" && (
//           <Box sx={{ mt: 0.5 }}>
//             <Typography 
//               variant="body2" 
//               sx={{ 
//                 color: 'text.primary',
//                 fontSize: '0.85rem',
//                 lineHeight: 1.3,
//                 display: 'block',
//                 fontWeight: 800,

//               }}
//             >
//               {staticDate}
//             </Typography>
//             <Typography 
//               variant="body2" 
//               sx={{ 
//                 color: 'text.primary',
//                 fontSize: '0.85rem',
//                 lineHeight: 1.3,
//                 display: 'block',
//                 fontWeight: 800
//               }}
//             >
//               {staticTime}
//             </Typography>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default StatusIndicator;


import { Chip, Box, Typography } from '@mui/material';

const StatusIndicator = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "live":
        return "success";
      case "waiting":
        return "warning";
      case "completed":
        return "info";
      case "scheduled":
        return "scheduled";
      case "missed call":
        return "error";
      default:
        return "default";
    }
  };

  const colorMap = {
    success: '#2e7d32',
    warning: '#dc3545',
    info: '#0288d1',
    scheduled: 'rgba(28, 67, 166, 1)',
    error: '#dc3545',
    default: '#757575'
  };
  
  const color = colorMap[getStatusColor(status)] || colorMap.default;

  // Static date and time for scheduled status
  // const staticDate = "10 Apr 2025";
  // const staticTime = "11:00am to 11:10am";

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
      <Box
        sx={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: `2px solid ${color}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: status.toLowerCase() === "scheduled" ? '4px' : '0'
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: color
          }}
        />
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          minHeight: status.toLowerCase() === "scheduled" ? '24px' : '24px'
        }}>
          <Chip
            className='fw-bold'
            label={status}
            variant='plain'
            sx={{
              color: color,
              backgroundColor: 'transparent',
              '& .MuiChip-label': {
                paddingLeft: '2px',
                paddingRight: '4px'
              },
              height: '24px',
              alignSelf: 'flex-start'
            }}
            size="small"
          />
        </Box>
        
        {/* Show static date and time in two lines only for scheduled status */}
        {/* {status.toLowerCase() === "scheduled" && (
          <Box sx={{ mt: 0.5 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.primary',
                fontSize: '0.85rem',
                lineHeight: 1.3,
                display: 'block',
                fontWeight: 800
              }}
            >
              {staticDate}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.primary',
                fontSize: '0.85rem',
                lineHeight: 1.3,
                display: 'block',
                fontWeight: 800
              }}
            >
              {staticTime}
            </Typography>
          </Box>
        )} */}
      </Box>
    </Box>
  );
};

export default StatusIndicator;