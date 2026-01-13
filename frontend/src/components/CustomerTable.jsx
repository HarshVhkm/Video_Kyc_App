// import React, { useState } from 'react';
// import CustomerTableHeader from './CustomerTableHeader';
// import Pagination from './Pagination';
// import CallInitiationModal from './CallInitiationModal';
// import CallEndModal from './CallEndModal';
// import CustomerDataTable from './CustomerDataTable';

// const CustomerTable = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [initiationModalOpen, setInitiationModalOpen] = useState(false);
//   const [endModalOpen, setEndModalOpen] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   const customers = [
//     {
//       id: 1,
//       customerName: "Rohit Tushar Hait",
//       clientName: "DigiKhata",
//       language: "English",
//       vcpId: "255511",
//       waitingSince: "00:03:50",
//       customerStatus: "Live",
//       callStatus: "Initiate Call",
//     },
//     {
//       id: 2,
//       customerName: "Riddhi Jani",
//       clientName: "DigiKhata",
//       language: "English",
//       vcpId: "255512",
//       waitingSince: "00:03:50",
//       customerStatus: "Scheduledx",
//       callStatus: "Initiate Call",
//     },
//   ];

//   const handleOpenInitiationModal = (customer) => {
//     setSelectedCustomer(customer);
//     setInitiationModalOpen(true);
//   };

//   const handleCloseInitiationModal = () => {
//     setInitiationModalOpen(false);
//   };

//   const handleCloseIconClick = () => {
//     setInitiationModalOpen(false);
//     setEndModalOpen(true);
//   };

//   const handleStartCall = () => {
//     console.log("Call started with customer:", selectedCustomer);
//     // Add your call initiation logic here
//   };

//   const handleEndCall = (selectedOptions, remark) => {
//     console.log("Call ended with options:", selectedOptions, "Remark:", remark);
//     setEndModalOpen(false);
//     // Add your call ending logic here
//   };

//   return (
//     <div className="card">
//       <div className="card-body">
//         <CustomerTableHeader />
        
//         <CustomerDataTable 
//           customers={customers} 
//           onInitiateCall={handleOpenInitiationModal} 
//         />

//         <Pagination 
//           currentPage={currentPage}
//           totalItems={200}
//           itemsPerPage={25}
//           onPageChange={(page) => setCurrentPage(page)}
//         />

//         {/* Call Initiation Modal */}
//         {selectedCustomer && (
//           <CallInitiationModal 
//             open={initiationModalOpen}
//             onClose={handleCloseInitiationModal}
//             onCloseIconClick={handleCloseIconClick}
//             customer={{
//               vcpId: selectedCustomer.vcpId,
//               customerName: selectedCustomer.customerName
//             }}
//             onStartCall={handleStartCall}
//           />
//         )}

//         {/* Call End Modal */}
//         <CallEndModal
//           open={endModalOpen}
//           onClose={() => setEndModalOpen(false)}
//           onConfirm={handleEndCall}
//         />
//       </div>
//     </div>
//   );
// };

// export default CustomerTable;

import { useState } from "react";
import { 
  Box, 
  Tabs, 
  Tab, 
  useMediaQuery, 
  useTheme, 
  InputAdornment, 
  TextField,
  Typography
} from "@mui/material";
import { 
  Groups as GroupsIcon, 
  History as HistoryIcon, 
  EditNote as EditNoteIcon, 
  Search as SearchIcon 
} from "@mui/icons-material";
import ActionButtons from "../components/ActionButtons";
import LiveScheduleTable from "./LiveScheduleTable";
import MissedCallsTable from "../components/MissedCallsTable";
import Pagination from "../components/Pagination";
import CallInitiationModal from "../components/CallInitiationModal";
import CallEndModal from "../components/CallEndModal";

const CustomerTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState("Video KYC Waitlist");
  const [currentPage, setCurrentPage] = useState(1);
  const [initiationModalOpen, setInitiationModalOpen] = useState(false);
  const [endModalOpen, setEndModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeView, setActiveView] = useState("live"); // Default to "live"

  const tabs = [
    { 
      id: "Video KYC Waitlist", 
      label: "Video KYC Waitlist",
      icon: <GroupsIcon fontSize="small" sx={{ 
        color: activeTab === "Video KYC Waitlist" ? '#1C43A6' : 'inherit' 
      }} />
    },
    { 
      id: "Past KYC Calls", 
      label: "Past KYC Calls",
      icon: <HistoryIcon fontSize="small" sx={{ color: 'inherit' }} />
    },
    { 
      id: "Draft List", 
      label: "Draft List",
      icon: <EditNoteIcon fontSize="small" sx={{ color: 'inherit' }} />
    },
  ];

  // Mock data for Live & Scheduled view
  const liveCustomers = [
    {
      id: 1,
      customerName: "Rohit  Hait",
      clientName: "DigiKhata",
      language: "English",
      vcpId: "255511",
      waitingSince: "00:03:50",
      customerStatus: "Live",
      callStatus: "Initiate Call",
    },
    {
      id: 2,
      customerName: "Riddhi Jani",
      clientName: "DigiKhata",
      language: "English",
      vcpId: "255512",
      waitingSince: "00:03:50",
      customerStatus: "Live",
      callStatus: "Initiate Call",
    },
    {
      id: 3,
      customerName: "Riddhi Jani",
      clientName: "DigiKhata",
      language: "English",
      vcpId: "255513",
      waitingSince: "00:00:00",
      customerStatus: "Scheduled",
      callStatus: "Initiate Call",
      scheduleDate: "10 Apr 2025",
      scheduleTime: "12:00am to 12:10am"
    }
  ];

  // Mock data for Missed Calls view
  const missedCallCustomers = [
    {
      id: 1,
      customerName: "Rohit Tushar Hait",
      clientName: "DigiKhata",
      vcpId: "255511",
      date: "10 Apr 2025",
      time: "11:00am",
      phoneNumber: "+91 9565856567",
      customerStatus: "Missed Call",
      callStatus: "Initiate Call",
      remark: "1. Not Contactable"
    },
    {
      id: 2,
      customerName: "Riddhi Jani",
      clientName: "DigiKhata",
      vcpId: "255512",
      date: "10 Apr 2025",
      time: "11:00am",
      phoneNumber: "+91 9565856567",
      customerStatus: "Missed Call",
      callStatus: "Initiate Call",
      remark: "1. Not Contactable"
    },
    {
      id: 3,
      customerName: "Riddhi Jani",
      clientName: "DigiKhata",
      vcpId: "255513",
      date: "10 Apr 2025",
      time: "11:00am",
      phoneNumber: "+91 9565856567",
      customerStatus: "Missed Call",
      callStatus: "Initiate Call",
      remark: "1. Not Contactable"
    }
  ];

  const handleOpenInitiationModal = (customer) => {
    setSelectedCustomer(customer);
    setInitiationModalOpen(true);
  };

  const handleCloseInitiationModal = () => {
    setInitiationModalOpen(false);
  };

  const handleCloseIconClick = () => {
    setInitiationModalOpen(false);
    setEndModalOpen(true);
  };

  const handleStartCall = () => {
    console.log("Call started with customer:", selectedCustomer);
  };

  const handleEndCall = (selectedOptions, remark) => {
    console.log("Call ended with options:", selectedOptions, "Remark:", remark);
    setEndModalOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Reset to live view when switching to Video KYC Waitlist tab
    if (newValue === "Video KYC Waitlist") {
      setActiveView("live");
    }
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  // Get current customers based on active view
  const getCurrentCustomers = () => {
    return activeView === "live" ? liveCustomers : missedCallCustomers;
  };

  // Get total items count based on active view
  const getTotalItems = () => {
    return activeView === "live" ? liveCustomers.length : missedCallCustomers.length;
  };

  // Render the appropriate table based on active view
  const renderTable = () => {
    if (activeView === "live") {
      return (
        <LiveScheduleTable 
          customers={getCurrentCustomers()} 
          onInitiateCall={handleOpenInitiationModal} 
        />
      );
    } else {
      return (
        <MissedCallsTable 
          customers={getCurrentCustomers()} 
          onInitiateCall={handleOpenInitiationModal} 
        />
      );
    }
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Video KYC Waitlist":
        return (
          <>
            {/* Action Buttons and Search - Responsive */}
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 },
              mb: 3
            }}>
              <Box sx={{ 
                display: 'flex',
                gap: '8px',
                width: { xs: '100%', sm: 'auto' },
                justifyContent: { xs: 'center', sm: 'flex-start' }
              }}>
                <ActionButtons 
                  activeView={activeView}
                  onViewChange={handleViewChange}
                />
              </Box>
              
              <Box sx={{ 
                width: { xs: '100%', sm: '240px' }
              }}>
                <TextField
                  variant="outlined"
                  placeholder="Search customers..."
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: '#6c757d' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      height: '40px',
                      '& input': {
                        padding: '8px 8px 8px 0',
                        fontSize: '14px'
                      }
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      paddingLeft: '12px',
                      '& fieldset': {
                        borderColor: '#dee2e6',
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    }
                  }}
                />
              </Box>
            </Box>

            {renderTable()}

            <Pagination 
              currentPage={currentPage}
              totalItems={getTotalItems()}
              itemsPerPage={25}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        );

      case "Past KYC Calls":
        return (
          <Box sx={{ mt: 2, p: 3, textAlign: 'center' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Past KYC Calls
            </Typography>
            <Typography color="textSecondary">
              This page is under development. Coming soon!
            </Typography>
          </Box>
        );

      case "Draft List":
        return (
          <Box sx={{ mt: 2, p: 3, textAlign: 'center' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Draft List
            </Typography>
            <Typography color="textSecondary">
              This page is under development. Coming soon!
            </Typography>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        {/* Navigation Tabs - Responsive */}
        <Box sx={{ 
          mb: 3,
          overflow: 'auto'
        }}>
          <Tabs 
            value={activeTab}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons="auto"
            sx={{
              minHeight: 'auto',
              '& .MuiTab-root': {
                minHeight: 'auto',
                padding: '8px 12px',
                minWidth: 'auto',
                fontSize: '14px',
                textTransform: 'none',
                flexDirection: 'row',
                gap: '8px'
              }
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                value={tab.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {tab.icon}
                    {tab.label}
                  </Box>
                }
                sx={{
                  color: activeTab === tab.id ? '#1C43A6' : 'inherit',
                  opacity: 1,
                  '&.Mui-selected': {
                    color: '#1C43A6'
                  }
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Separator Line */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 0, mb: 3 }} />   

        {/* Dynamic Content based on active tab */}
        {renderTabContent()}

        {/* Call Initiation Modal */}
        {selectedCustomer && (
          <CallInitiationModal 
            open={initiationModalOpen}
            onClose={handleCloseInitiationModal}
            onCloseIconClick={handleCloseIconClick}
            customer={{
              vcpId: selectedCustomer.vcpId,
              customerName: selectedCustomer.customerName
            }}
            onStartCall={handleStartCall}
          />
        )}

        {/* Call End Modal */}
        <CallEndModal
          open={endModalOpen}
          onClose={() => setEndModalOpen(false)}
          onConfirm={handleEndCall}
        />
      </div>
    </div>
  );
};

export default CustomerTable;