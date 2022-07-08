import bcrypt from "bcryptjs"

export default class PasswordEncrypter {
  async encrypt(password) {
    return bcrypt.hash(password, 10)
  }
}