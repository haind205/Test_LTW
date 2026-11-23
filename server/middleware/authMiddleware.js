import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { getJwtSecret } from '../utils/jwt.js'

export const authenticate = async (req, res, next) => {
  const authorization = req.headers.authorization || ''
  const match = authorization.match(/^Bearer\s+(.+)$/i)

  if (!match) {
    return res.status(401).json({ success: false, message: 'Authentication token is required.' })
  }

  try {
    const payload = jwt.verify(match[1], getJwtSecret())
    const user = await User.findById(payload.sub)
    if (!user) {
      return res.status(401).json({ success: false, message: 'Account no longer exists.' })
    }
    req.user = user
    return next()
  } catch (error) {
    if (error.statusCode) return next(error)
    return res.status(401).json({ success: false, message: 'Authentication token is invalid or expired.' })
  }
}

export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication is required.' })
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'You do not have permission to do this.' })
  }
  return next()
}
