// import React from 'react';
// import { Button } from '@mui/material';
// import { Phone, MessageCircle } from 'lucide-react';
// import StatusIndicator from '../components/StatusIndicator';

// const MissedCallsTable = ({ customers, onInitiateCall }) => {
//   return (
//     <div className="table-responsive">
//       <table className="table table-hover">
//         <thead className="table-light">
//           <tr>
//             <th>Customer Name</th>
//             <th>Client Name</th>
//             <th>VCP ID</th>
//             <th>Date & Time</th>
//             <th>Customer Status</th>
//             <th>Notification Tab</th>
//             <th>Call Status</th>
//             <th>Remark</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map((customer) => (
//             <tr key={customer.id}>
//               <td className="fw-bold" style={{ verticalAlign: 'top', paddingTop: '16px' }}>
//                 {customer.customerName}
//               </td>
//               <td className="fw-bold" style={{ verticalAlign: 'top', paddingTop: '16px' }}>
//                 {customer.clientName}
//               </td>
//               <td className="fw-bold" style={{ verticalAlign: 'top', paddingTop: '16px' }}>
//                 {customer.vcpId}
//               </td>
//               <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
//                 <div className="fw-bold">{customer.date}</div>
//                 <div className="fw-bold">{customer.time}</div>
//               </td>
//               <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
//                 <StatusIndicator status={customer.customerStatus} />
//                 <div className="mt-1">
//                   <small className="text-danger fw-bold">{customer.phoneNumber}</small>
//                 </div>
//               </td>
//               <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
//                 <Button
//                   variant="contained"
//                   size="small"
//                   startIcon={<MessageCircle size={16} />}
//                   sx={{
//                     backgroundColor: 'rgba(28, 67, 166, 0.1)',
//                     color: '#1C43A6',
//                     '&:hover': {
//                       backgroundColor: 'rgba(28, 67, 166, 0.2)',
//                     },
//                     textTransform: 'none',
//                     fontWeight: 500,
//                     boxShadow: 'none',
//                     '& .MuiButton-startIcon': {
//                       marginRight: '6px',
//                       '& svg': {
//                         color: '#1C43A6'
//                       }
//                     }
//                   }}
//                 >
//                   Send Message
//                 </Button>
//               </td>
//               <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
//                 <Button
//                   variant="contained"
//                   size="small"
//                   startIcon={<Phone size={16} />}
//                   sx={{
//                     backgroundColor: 'rgba(28, 67, 166, 0.1)',
//                     color: '#1C43A6',
//                     '&:hover': {
//                       backgroundColor: 'rgba(28, 67, 166, 0.2)',
//                     },
//                     textTransform: 'none',
//                     fontWeight: 500,
//                     boxShadow: 'none',
//                     '& .MuiButton-startIcon': {
//                       marginRight: '6px',
//                       '& svg': {
//                         color: '#1C43A6'
//                       }
//                     }
//                   }}
//                   onClick={() => onInitiateCall(customer)}
//                 >
//                   Initiate Call
//                 </Button>
//               </td>
//               <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
//                 <span className="text-muted">{customer.remark}</span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MissedCallsTable;

import { Button } from "@mui/material";
import { Phone, MessageCircle } from "lucide-react";
import StatusIndicator from "./StatusIndicator";

const MissedCallsTable = ({ customers }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Customer Name</th>
            <th>Client Name</th>
            <th>VCP ID</th>
            <th>Date & Time</th>
            <th>Customer Status</th>
            <th>Notification Tab</th>
            <th>Call Status</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.MissedId}>
              <td className="fw-bold">{c.CustomerName}</td>
              <td className="fw-bold">{c.ClientName}</td>
              <td className="fw-bold">{c.VcipId}</td>
              <td>
                <div className="fw-bold">
                  {new Date(c.CreatedAt).toLocaleDateString()}
                </div>
                <div className="fw-bold">
                  {new Date(c.CreatedAt).toLocaleTimeString()}
                </div>
              </td>
              <td>
                <StatusIndicator status="Missed Call" />
                <div>
                  <small className="text-danger fw-bold">
                    +91 {c.MobileNumber}
                  </small>
                </div>
              </td>
              <td>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<MessageCircle size={16} />}
                  sx={{
                    backgroundColor: "rgba(28,67,166,0.1)",
                    color: "#1C43A6",
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  Send Message
                </Button>
              </td>
              <td>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Phone size={16} />}
                  sx={{
                    backgroundColor: "rgba(28,67,166,0.1)",
                    color: "#1C43A6",
                    textTransform: "none",
                    boxShadow: "none",
                  }}
                >
                  Initiate Call
                </Button>
              </td>
              <td>
                <span className="text-muted">{c.Remark}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MissedCallsTable;
