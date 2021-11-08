let fs = require('fs');

module.exports = (req, res, next) => {
  if (!req.user) {
   return  res.status(403).json("<html> <head>server Response</head><body><h1> Forbidden action</p></h1></body></html>");
  }

  next();
};
