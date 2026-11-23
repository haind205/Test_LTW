import jwt from 'jsonwebtoken'

export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length < 32 || secret === 'your_jwt_secret_key_here' || secret.includes('REPLACE_WITH')) {
    const error = new Error('Set JWT_SECRET to a random value of at least 32 characters in server/.env.')
    error.statusCode = 500
    throw error
  }
  return secret
}

export const signAuthToken = (user) =>
  jwt.sign({ sub: user._id.toString() }, getJwtSecret(), { expiresIn: '7d' })

