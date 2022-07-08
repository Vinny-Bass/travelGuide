import 'dotenv/config'

export default class AuthService {
  constructor({ authProvider, passwordEncrypter, tokenHandler }) {
    this.provider = authProvider
    this.passwordEncrypter = passwordEncrypter
    this.tokenHandler = tokenHandler
  }

  async login(email, password) {
    const encryptedPassword = await passwordEncrypter.encrypt(password)
    const authId = this.provider.findByCredentials(email, encryptedPassword)

    const token = this.tokenHandler.generateToken({ authId, email })
    return token
  }

  async register(email, password) {
    const encryptedPassword = await passwordEncrypter.encrypt(password)
    const authId = await this.provider.register(email, encryptedPassword)

    const { token } = this.tokenHandler.generateToken({ authId, email })
    return { token, authId }
  }
}