const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'No token provided. Unauthorized'
    });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'bazmaSecretKey', (error, decoded) => { // Mengubah parameter 'docoded' menjadi 'decoded'
    if (error) {
      return res.status(403).json({
        message: 'Invalid token. Permission denied'
      });
    }
    req.user = decoded; // Mengubah 'user' menjadi 'decoded'
    next();
  });
};

module.exports = verifyToken;