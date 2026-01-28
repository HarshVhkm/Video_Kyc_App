const getUserId = (req) => req.user?.id;

const getPagination = (req) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 10);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

module.exports = {
  getUserId,
  getPagination,
};
