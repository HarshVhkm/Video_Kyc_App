import React, { useState, useEffect } from 'react';
import { fetchDashboardData } from "../api/dashboard.api";
import { 
  Box, 
  Card, 
  CardContent, 
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ArrowDropDown as ChevronDown } from '@mui/icons-material';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatsChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Today");
  const [chartValues, setChartValues] = useState({
    approved: 0,
    rejected: 0,
    discrepancy: 0,
  });


  useEffect(() => {
  const loadDashboard = async () => {
    try {
      const map = {
        Today: "today",
        "This Week": "week",
        "This Month": "month",
          All: "all",
      };

      const range = map[selectedOption] || "today";

      const res = await fetchDashboardData(range);

   setChartValues({
  approved: Number(res?.data?.approved) || 0,
  rejected: Number(res?.data?.rejected) || 0,
  discrepancy: Number(res?.data?.discrepancy) || 0,
});

    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  loadDashboard();
}, [selectedOption]);

  const chartData = {
    labels: ["Approved", "Rejected", "Discrepancy"],
    datasets: [{
      data: [
        chartValues.approved,
        chartValues.rejected,
        chartValues.discrepancy
      ],
      backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
      borderWidth: 0,
      hoverOffset: 0
    }]
  };

  const total = chartData.datasets[0].data.reduce(
    (sum, item) => sum + item,
    0
  );

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectOption = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  return (
    <Card sx={{ 
      height: '100%',
      boxShadow: 'none',
      border: '1px solid #e0e0e0',
      borderRadius: '8px'
    }}>
      <CardContent sx={{ padding: '16px' }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '16px'
        }}>
          <Box component="h5" sx={{ 
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: 500,
            color: '#212529'
          }}>
            Work Dashboard
          </Box>

          <Box sx={{ position: 'relative' }}>
            <button 
              onClick={toggleDropdown}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid #dee2e6',
                background: 'transparent',
                padding: '0.25rem 0.75rem',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              {selectedOption}
              <ChevronDown fontSize="small" />
            </button>

            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                minWidth: '120px',
                backgroundColor: '#fff',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                marginTop: '4px',
                zIndex: 10
              }}>
                {["Today", "This Week", "This Month", "All"].map(option => (
                  <button
                    key={option}
                    onClick={() => selectOption(option)}
                    style={{
                      width: '100%',
                      padding: '0.5rem 1rem',
                      textAlign: 'left',
                      border: 'none',
                      background: selectedOption === option ? '#f8f9fa' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </Box>
        </Box>

        <hr style={{ marginBottom: '16px' }} />

        {/* Pie Chart */}
         <Box sx={{ height: isMobile ? '220px' : '280px', position: 'relative' }}>
          <Pie
            data={chartData}
            options={{
              maintainAspectRatio: false,
              cutout: isMobile ? '60%' : '50%',
              plugins: {
                legend: { display: false },
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: (context) => `${context.label}: ${context.parsed}`
                  }
                }
              }
            }}
          />

          {/* Center text */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <h2 style={{ margin: 0 }}>{total}</h2>
            <small>{selectedOption}</small>
          </div>
        </Box> 

        {/* ✅ FOOTER (Approved / Rejected / Discrepancy) */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid #e0e0e0',
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          gap: isMobile ? '8px' : 0
        }}>
          {chartData.labels.map((label, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: chartData.datasets[0].backgroundColor[index],
                marginRight: '8px'
              }} />
              <small style={{ marginRight: '4px' }}>{label}:</small>
              <small style={{ fontWeight: 'bold' }}>
                {chartData.datasets[0].data[index]}
              </small>
            </Box>
          ))}
        </Box>

      </CardContent>
    </Card>
  );
};

export default StatsChart;
