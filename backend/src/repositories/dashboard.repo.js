const db = require("../config/db");

exports.getAllCounts = async () => {
  const [rows] = await db.query(`
    SELECT
      SUM(CallStatus = 'Approved') AS approved,
      SUM(CallStatus = 'Rejected') AS rejected,
      SUM(CallStatus = 'Discrepancy') AS discrepancy
    FROM Past_Kyc_Calls
  `);

  return rows[0];
};

exports.getCountsByDate = async (start, end) => {
  const [rows] = await db.query(
    `
    SELECT
      SUM(CallStatus = 'Approved') AS approved,
      SUM(CallStatus = 'Rejected') AS rejected,
      SUM(CallStatus = 'Discrepancy') AS discrepancy
    FROM Past_Kyc_Calls
    WHERE CreatedAt BETWEEN ? AND ?
    `,
    [start, end]
  );

  return rows[0];
};
