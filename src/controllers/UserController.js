import AuthFactory from '../factories/AuthFactory.js'
import UserFactory from '../factories/UserFactory.js'

export default class UserController {
  async register(email, password, firstName, lastName, age) {
    try {
      const authService = await AuthFactory.createInstance()
      const { token, authId } = await authService.register(email, password)

      const userService = await UserFactory.createInstance()
      await userService.register({
        authId,
        firstName,
        lastName,
        age
      })

      return token
    } catch (err) {
      console.log(err)
    }
  }
}