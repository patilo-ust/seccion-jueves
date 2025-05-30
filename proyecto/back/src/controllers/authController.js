import { createUser, findUserByEmail, comparePasswords } from '../services/authService.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await createUser(name, email, password);
    const token = generateToken(user.id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !(await comparePasswords(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    const token = generateToken(user.id);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
