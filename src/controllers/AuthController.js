import AuthFactory from "../factories/AuthFactory.js"

export default class AuthController {
  async login(email, password) {
    try {
      const authService = await AuthFactory.createInstance()
      const token = await authService.login(email, password)
      return token
    } catch (err) {
      console.log(err)
    }
  }
}