import 'dotenv/config'
import { jest, expect, describe, test, beforeEach, beforeAll } from '@jest/globals'
import AuthClientAlredyExixtsError from '../../src/util/errors/authClientAlreadyExistsError'
import AuthClientNotExistsError from '../../src/util/errors/authClientNotExistsError'
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
        findByCredentials: jest.fn(),
        findByEmail: jest.fn()
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

  test('SignUp - Should return an AuthClientAlredyExixts error if user email already exists', async () => {
    jest.spyOn(
      authService.provider,
      'findByEmail'
    ).mockResolvedValue(authClientMockData)

    await expect(async () => {
      await authService.signUp(authClientMockData.email, authClientMockData.password)
    }).rejects.toBeInstanceOf(AuthClientAlredyExixtsError)
  })

  test('SignUp - Should generate a valid jwt token when register', async () => {
    const email = 'teste@teste.com'
    const password = '123456'
    const authId = authClientMockData.id

    jest.spyOn(
      authService.provider,
      'findByEmail'
    ).mockResolvedValue()

    jest.spyOn(
      authService.provider,
      'create'
    ).mockResolvedValue(authId)

    jest.spyOn(
      authService.tokenHandler,
      'generateToken'
    ).mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOjEsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tIiwiaWF0IjoxNjU3NTQ4NDk2LCJleHAiOjE2NTc1NTU2OTZ9.mgfPO32sbC6KHU3tSbrC8_7PtGExwWHi8tM-iaXIYsk')

    const { token } = await authService.signUp(email, password)
    const tokenData = jwt.verify(token, process.env.JWT_TOKEN_SECRET)

    expect(tokenData.authId).toBe(authId)
    expect(tokenData.email).toBe(email)
  })

  test('Login - Should return an AuthClientNotExists error when user not exists', async () => {
    jest.spyOn(
      authService.provider,
      'findByCredentials'
    ).mockResolvedValue()

    await expect(async () => {
      await authService.login(authClientMockData.email, authClientMockData.password)
    }).rejects.toBeInstanceOf(AuthClientNotExistsError)
  })

  test('Login - Should return a valid jwt token when user exists', async () => {
    jest.spyOn(
      authService.provider,
      'findByCredentials'
    ).mockResolvedValue(authClientMockData.id)

    const token = await authService.login(authClientMockData.email, authClientMockData.password)
    const tokenData = jwt.verify(token, process.env.JWT_TOKEN_SECRET)

    expect(tokenData.authId).toBe(authClientMockData.id)
    expect(tokenData.email).toBe(authClientMockData.email)
  })
})