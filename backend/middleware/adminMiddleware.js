const adminMiddleware = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      message: "Forbidden. Super Ultra Mega Villain Lord access only.",
    });
  }

  next();
};

module.exports = adminMiddleware;