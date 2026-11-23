import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { getJwtSecret, signAuthToken } from '../utils/jwt.js'

const publicUser = (user) => ({
  id: user._id,
  fullName: user.fullName,
  email: user.email,
  phone: user.phone,
  avatar: user.avatar,
  role: user.role,
})

const sendAuthResponse = (res, user, status = 200) =>
  res.status(status).json({
    success: true,
    token: signAuthToken(user),
    user: publicUser(user),
  })

export const register = async (req, res, next) => {
  try {
    getJwtSecret()
    const { fullName, email, phone = '', password, role = 'student' } = req.body
    const normalizedEmail = String(email || '').trim().toLowerCase()

    if (!String(fullName || '').trim() || !normalizedEmail || !password) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and password are required.',
      })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ success: false, message: 'Enter a valid email address.' })
    }
    if (String(password).length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain at least 8 characters.',
      })
    }
    if (!['student', 'tutor'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be student or tutor.',
      })
    }

    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email is already registered.' })
    }

    const passwordHash = await bcrypt.hash(String(password), 12)
    const user = await User.create({
      fullName: String(fullName).trim(),
      email: normalizedEmail,
      phone: String(phone).trim(),
      passwordHash,
      role,
    })

    return sendAuthResponse(res, user, 201)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email is already registered.' })
    }
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    getJwtSecret()
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      })
    }

    const user = await User.findOne({ email }).select('+passwordHash')
    if (!user || !user.passwordHash || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ success: false, message: 'Email or password is incorrect.' })
    }

    return sendAuthResponse(res, user)
  } catch (error) {
    next(error)
  }
}

export const getCurrentUser = (req, res) =>
  res.status(200).json({ success: true, user: publicUser(req.user) })


