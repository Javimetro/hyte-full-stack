import jwt from 'jsonwebtoken';
import 'dotenv/config'; //This line imports the dotenv library and immediately invokes its config method. dotenv is used to load environment variables from a .env file into process.env.

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization']; //It first extracts the Authorization header from the incoming request
  const token = authHeader && authHeader.split(' ')[1]; //The Authorization header typically follows the format Bearer <token>. The function splits the header value by space (authHeader.split(' ')[1]) to extract the token part.
  console.log('tokeeen', token);
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); //If a token is found, the function attempts to verify it using jwt.verify(). This method decodes the token and checks its signature to ensure it hasn't been tampered with. The process.env.JWT_SECRET is the secret key used to verify the token's signature. If the token is valid, jwt.verify() returns the payload of the token, which is then attached to the req.user property. This allows subsequent middleware functions and route handlers to access the authenticated user's data.
    next(); //The next() function is called to pass control to the next middleware function in the stack.
  } catch (err) {
    res.status(401).send({message: 'invalid token'});
  }
};

export {authenticateToken};
