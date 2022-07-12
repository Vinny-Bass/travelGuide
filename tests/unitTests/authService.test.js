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

    jest.spyOn(
      authService.provider,
      'findByEmail'
    ).mockResolvedValue()

    jest.spyOn(
      authService.provider,
      'create'
    ).mockResolvedValue(authClientMockData.id)

    jest.spyOn(
      authService.tokenHandler,
      'generateToken'
    ).mockReturnValue('valid token')

    const { authId, token } = await authService.signUp(email, password)

    expect(authId).toBe(authClientMockData.id)
    expect(token).not.toBe(null)
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

    jest.spyOn(
      authService.tokenHandler,
      'generateToken'
    ).mockReturnValue('valid token')

    const token = await authService.login(authClientMockData.email, authClientMockData.password)

    expect(token).not.toBe(null)
  })
})