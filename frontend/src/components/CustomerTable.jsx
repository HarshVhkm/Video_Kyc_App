import { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  Groups,
  History,
  EditNote,
  Search,
} from "@mui/icons-material";

import ActionButtons from "../components/ActionButtons";
import LiveScheduleTable from "./LiveScheduleTable";
import MissedCallsTable from "../components/MissedCallsTable";
import Pagination from "../components/Pagination";

// ---------- debounce ----------
const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

const CustomerTable = () => {
  const [activeTab, setActiveTab] = useState("Video KYC Waitlist");
  const [activeView, setActiveView] = useState("live");
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [loading, setLoading] = useState(false);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const API_BASE = "http://localhost:5000/api/kyc";

  // ---------- fetch data ----------
  const fetchData = async () => {
    setLoading(true);
    try {
      let url = "";

      if (debouncedSearch) {
        url = `${API_BASE}/search?q=${debouncedSearch}`;
      } else if (activeView === "live") {
        url = `${API_BASE}/live-schedule`;
      } else {
        url = `${API_BASE}/missed`;
      }

      const res = await fetch(url);
      const json = await res.json();

      setCustomers(json.data || []);
      setCurrentPage(1); // reset pagination
    } catch (err) {
      console.error(err);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeView, debouncedSearch]);

  // ---------- slice customers ----------
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = customers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="card">
      <div className="card-body">
        {/* Tabs */}
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
          <Tab value="Video KYC Waitlist" label="Video KYC Waitlist" icon={<Groups />} />
          <Tab value="Past KYC Calls" label="Past KYC Calls" icon={<History />} />
          <Tab value="Draft List" label="Draft List" icon={<EditNote />} />
        </Tabs>

        {activeTab === "Video KYC Waitlist" && (
          <>
            {/* Buttons + Search */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
              mt={3}
            >
              <ActionButtons
                activeView={activeView}
                onViewChange={(v) => {
                  setSearch("");
                  setActiveView(v);
                }}
                liveCount={activeView === "live" ? customers.length : 0}
                missedCount={activeView === "missed" ? customers.length : 0}
                onRefresh={fetchData}
              />

              <TextField
                size="small"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box mt={2} />

            {/* Tables */}
            {loading ? (
              <Typography align="center">Loading...</Typography>
            ) : activeView === "live" ? (
              <LiveScheduleTable customers={paginatedCustomers} />
            ) : (
              <MissedCallsTable customers={paginatedCustomers} />
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalItems={customers.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerTable;
