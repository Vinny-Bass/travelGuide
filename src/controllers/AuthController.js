import AuthFactory from "../factories/AuthFactory.js"

export default class AuthController {
  async handle(email, password) {
    try {
      const authService = await AuthFactory.createInstance()
      const token = await authService.authenticate(email, password)
      return token
    } catch (err) {
      console.log(err)
    }
  }
}