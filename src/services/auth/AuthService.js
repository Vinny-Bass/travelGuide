import 'dotenv/config'
import UserAlreadyExistsError from '../../util/errors/authClientAlreadyExistsError.js'
import UserNotExistsError from '../../util/errors/authClientNotExistsError.js'
export default class AuthService {
  constructor({ authProvider, passwordEncrypter, tokenHandler }) {
    this.provider = authProvider
    this.passwordEncrypter = passwordEncrypter
    this.tokenHandler = tokenHandler
  }

  async login(email, password) {
    const encryptedPassword = await this.passwordEncrypter.encrypt(password)
    const authId = await this.provider.findByCredentials(email, encryptedPassword)

    if (!authId) {
      throw new UserNotExistsError(email)
    }

    const token = this.tokenHandler.generateToken({ authId, email })
    return token
  }

  async signUp(email, password) {
    const authClient = await this.provider.findByEmail(email)

    if (authClient) {
      throw new UserAlreadyExistsError(email)
    }

    const encryptedPassword = await this.passwordEncrypter.encrypt(password)
    const authId = await this.provider.create(email, encryptedPassword)

    const token = this.tokenHandler.generateToken({ authId, email })
    return { token, authId }
  }
}