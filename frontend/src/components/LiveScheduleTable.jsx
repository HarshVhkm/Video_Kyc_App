import React from 'react';
import { Button } from '@mui/material';
import { Phone } from 'lucide-react';
import StatusIndicator from './StatusIndicator';

const LiveScheduleTable = ({ customers, onInitiateCall }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Customer Name</th>
            <th>Client Name</th>
            <th>VCIP ID</th>
            <th>Waiting Since</th>
            <th>Customer Status</th>
            <th>Call Status</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} style={{ 
              height: customer.customerStatus?.toLowerCase() === "scheduled" ? 'auto' : 'auto',
              minHeight: customer.customerStatus?.toLowerCase() === "scheduled" ? '80px' : 'auto'
            }}>
              <td className="fw-bold" style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                {customer.customerName}
              </td>
              <td className="fw-bold" style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                {customer.clientName}
              </td>
              <td className="fw-bold" style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                {customer.vcpId}
              </td>
              <td className="text-danger fw-bold" style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                {customer.waitingSince}
              </td>
              <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                <StatusIndicator status={customer.customerStatus} />
                {customer.scheduleTime && (
                  <div className="mt-1">
                    <small className="fw-bold d-block">{customer.scheduleDate}</small>
                    <small className="fw-bold">{customer.scheduleTime}</small>
                  </div>
                )}
              </td>
              <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Phone size={16} />}
                  sx={{
                    backgroundColor: 'rgba(28, 67, 166, 0.1)',
                    color: '#1C43A6',
                    '&:hover': {
                      backgroundColor: 'rgba(28, 67, 166, 0.2)',
                    },
                    textTransform: 'none',
                    fontWeight: 500,
                    boxShadow: 'none',
                    '& .MuiButton-startIcon': {
                      marginRight: '6px',
                      '& svg': {
                        color: '#1C43A6'
                      }
                    },
                    marginTop: customer.customerStatus?.toLowerCase() === "scheduled" ? '4px' : '0'
                  }}
                  onClick={() => onInitiateCall(customer)}
                >
                  {customer.callStatus}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveScheduleTable;