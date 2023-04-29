
module.exports = function (req, res, next) { 
    // 401 Unauthorized
    // 403 Forbidden 
    
    if (req.user.role != "author") return res.status(403).send('Access denied Author');
  
    next();
  }