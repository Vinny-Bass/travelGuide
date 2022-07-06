import 'dotenv/config'
import { jest, expect, describe, test, beforeEach, beforeAll } from '@jest/globals'
import bcrypt from 'bcryptjs/dist/bcrypt'
import jwt from 'jsonwebtoken'
import AuthService from '../../src/services/auth/AuthService.js'

const authClientMockData = {
  id: 1,
  email: 'teste@teste.com',
  password: '123456'
}

describe('Auth Service Suite Tests', () => {
  let authService = {}

  beforeAll(() => {
    authService = new AuthService({
      authProvider: {
        register: jest.fn(),
        findByCredentials: jest.fn()
      }
    })
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('Register - Should criptography the password and generate a valid jwt token when register', async () => {
    const email = 'teste@teste.com'
    const password = '123456'
    const authId = authClientMockData.id

    jest.spyOn(
      bcrypt,
      'hash'
    )

    jest.spyOn(
      authService.provider,
      'register'
    ).mockResolvedValue(authId)

    const { token } = await authService.register(email, password)

    expect(bcrypt.hash).toBeCalledTimes(1)
    expect(bcrypt.hash).toBeCalledWith(password, 10)

    //Validar a chamada da funcao estatica generateAuthToken
  })

  test.todo('Authenticate - Should return a valid token when user exists')

  test.todo('Authenticate - Should return an jwt invalid token error when user not exists')
})