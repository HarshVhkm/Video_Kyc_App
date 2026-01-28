const kycRepo = require("../repositories/kyc.repo");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

/* =========================
   WAITLIST
========================= */
exports.getVideoKycWaitlist = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 10);

  const result = await kycRepo.getVideoKycWaitlist(page, limit);

  res.status(200).json({
    success: true,
    message: "Video KYC waitlist fetched",
    meta: result.meta,
    data: result.data,
  });
});

/* =========================
   SEARCH MISSED
========================= */
exports.searchMissedKyc = asyncHandler(async (req, res) => {
  const query = (req.query.q || "").trim();

  if (query.length < 2) {
    return res.status(200).json({ success: true, data: [] });
  }

  const data = await kycRepo.searchMissedKyc(query);

  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
});

/* =========================
   LIVE + SCHEDULED
========================= */
exports.getLiveScheduleKyc = asyncHandler(async (req, res) => {
  const data = await kycRepo.getLiveScheduleKyc();

  res.status(200).json({
    success: true,
    message: "Live & Scheduled calls fetched",
    data,
  });
});

/* =========================
   MISSED CALLS
========================= */
exports.getMissedCallsKyc = asyncHandler(async (req, res) => {
  const data = await kycRepo.getMissedCallsKyc();

  res.status(200).json({
    success: true,
    message: "Missed calls fetched",
    data,
  });
});

/* =========================
   SEARCH (LIVE / MISSED)
========================= */
exports.searchKyc = asyncHandler(async (req, res) => {
  const query = (req.query.q || "").trim();
  const view = req.query.view || "live";

  if (query.length < 2) {
    return res.status(200).json({ success: true, data: [] });
  }

  const data =
    view === "live"
      ? await kycRepo.searchLiveKyc(query)
      : await kycRepo.searchMissedKyc(query);

  res.status(200).json({
    success: true,
    message: "Search results",
    count: data.length,
    data,
  });
});

/* =========================
   REFRESH DASHBOARD
========================= */
exports.refreshDashboard = asyncHandler(async (req, res) => {
  const waitlist = await kycRepo.getVideoKycWaitlist(1, 10);
  const live = await kycRepo.getLiveScheduleKyc();
  const missed = await kycRepo.getMissedCallsKyc();

  res.status(200).json({
    success: true,
    message: "Dashboard refreshed",
    data: {
      waitlist: waitlist.data,
      live,
      missed,
    },
  });
});

/* =========================
   SEARCH PAST KYC
========================= */
exports.searchPastKyc = asyncHandler(async (req, res) => {
  const q = (req.query.q || "").trim();

  if (q.length < 2) {
    return res.status(200).json({
      success: true,
      data: [],
    });
  }

  const data = await kycRepo.searchPastKyc(q);

  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
});
