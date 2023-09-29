const {auth} = require("express-oauth2-jwt-bearer");

const jwtCheck = auth({
    audience: "http://localhost:8000",
    issuerBaseURL: "https://dev-5peayd318egx6dk8.us.auth0.com",
    tokenSigningAlg: "RS256"
});

module.exports = jwtCheck;