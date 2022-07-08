import jwt from 'jsonwebtoken'

export default class TokenHandler {
  generateToken(data) {
    return jwt.sign(
      data,
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: '2h' }
    )
  }
}