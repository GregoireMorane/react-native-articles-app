const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET;

// Exported functions
module.exports = {
  generateToken: userData => {
    return jwt.sign(
      {
        id: userData.id,
        pseudo: userData.pseudo
      },
      JWT_SIGN_SECRET
    );
  },
  getUserId: token => {
    let id = null;
    if (token != null) {
      let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
      if (jwtToken != null) id = jwtToken.id;
    }
    return id;
  }
};
