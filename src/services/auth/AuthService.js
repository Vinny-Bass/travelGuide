import 'dotenv/config'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export default class AuthService {
  constructor({ authProvider }) {
    this.provider = authProvider
  }

  static generateAuthToken(authId, email) {
    return jwt.sign(
      { authId, email },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: '2h' }
    )
  }

  async login(email, password) {
    const encryptedPassword = await bcrypt.hash(password, 10)
    const authId = this.provider.findByCredentials(email, encryptedPassword)

    const token = AuthService.generateAuthToken(authId, email)
    return token
  }

  async register(email, password) {
    const encryptedPassword = await bcrypt.hash(password, 10)
    const authId = await this.provider.register(email, encryptedPassword)

    const { token } = AuthService.generateAuthToken(authId, email)
    return { token, authId }
  }
}