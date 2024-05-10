import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './user.model.js';


// Register a new user
export const register = async (req, res, next) => {
    const { username, email, password , token } = req.body;
  
    try {
      const user1 = await User.findOne({ username });
      if (user1) {
        return res.status(400).json({ message: 'Username already exists' });
      } 

      const useremail = await User.findOne({ email });
      if (useremail) {
        return res.status(400).json({ message: 'email already exists' });
      } 
      if(token!==process.env.SECRET_KEY){
        return res.status(400).json({ message: 'Invalid Token' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      console.log(user);
      res.json({ message: 'Registration successful' });
    } catch (error) {
      next(error);
    }
  };
  
  // Login with an existing user
  export const login = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }  


      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {

        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1 hour'
      });
      res.json({ token,user });
    } catch (error) {
      next(error);
    }
  };
  
