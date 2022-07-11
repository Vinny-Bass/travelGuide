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
        create: jest.fn(),
        findByCredentials: jest.fn()
      },
      passwordEncrypter: {
        encrypt: jest.fn()
      },
      tokenHandler: {
        generateToken: jest.fn()
      }
    })
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('Register - Should generate a valid jwt token when register', async () => {
    const email = 'teste@teste.com'
    const password = '123456'
    const authId = authClientMockData.id

    jest.spyOn(
      authService.provider,
      'create'
    ).mockResolvedValue(authId)

    jest.spyOn(
      authService.tokenHandler,
      'generateToken'
    ).mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOjEsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tIiwiaWF0IjoxNjU3NTQ4NDk2LCJleHAiOjE2NTc1NTU2OTZ9.mgfPO32sbC6KHU3tSbrC8_7PtGExwWHi8tM-iaXIYsk')

    const { token } = await authService.register(email, password)
    const tokenData = jwt.verify(token, process.env.JWT_TOKEN_SECRET)

    expect(tokenData.authId).toBe(authId)
    expect(tokenData.email).toBe(email)
  })

  test.todo('Authenticate - Should return a valid token when user exists')

  test.todo('Authenticate - Should return an jwt invalid token error when user not exists')
})