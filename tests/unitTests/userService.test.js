import 'dotenv/config'
import { jest, expect, describe, test, beforeEach, beforeAll } from '@jest/globals'
import UserService from '../../src/services/user/UserService'
import UnexistentAuthIDError from '../../src/util/errors/unexistentAuthIDError'
import UnexistentUserError from '../../src/util/errors/unexistentUserError'

const userMockData = {
  id: 1,
  authId: 1,
  firstName: 'Vinicius',
  lastName: 'Bass',
  age: 22
}

describe('User service suite case', () => {
  let userService = {}

  beforeAll(() => {
    userService = new UserService({
      authProvider: {
        findById: jest.fn()
      },
      userProvider: {
        create: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
      }
    })
  })

  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test('Create - should throw unexistentAuthIDError when try to create a user with an inexistent authId', async () => {
    jest.spyOn(
      userService.authProvider,
      'findById'
    ).mockResolvedValue()

    await expect(async () => {
      await userService.create(userMockData)
    }).rejects.toBeInstanceOf(UnexistentAuthIDError)
  })

  test('Create - should create a new user', async () => {
    jest.spyOn(
      userService.authProvider,
      'findById'
    ).mockResolvedValue(userMockData.authId)

    jest.spyOn(
      userService.provider,
      'create'
    ).mockResolvedValue(userMockData.id)

    const userId = await userService.create(userMockData)

    expect(userId).toBe(userMockData.id)
  })

  test('Update - should throw UnexistentUserError when try to update an inexistent user', async () => {
    jest.spyOn(
      userService.provider,
      'findById'
    ).mockResolvedValue()

    await expect(async () => {
      await userService.update(userMockData.id, userMockData)
    }).rejects.toBeInstanceOf(UnexistentUserError)
  })

  test('Update - should be able to update user data by id', async () => {
    jest.spyOn(
      userService.provider,
      'findById'
    ).mockResolvedValue(userMockData)

    jest.spyOn(
      userService.provider,
      'update'
    ).mockResolvedValue(1)

    const rowsAffected = await userService.update(userMockData.id, userMockData)
    expect(rowsAffected).toBe(1)
  })

  test('Get - should return null when try to get data from unexistent user', async () => {
    jest.spyOn(
      userService.provider,
      'findById'
    ).mockResolvedValue()

    const user = await userService.get(userMockData.id)
    expect(user).toBe(undefined)
  })

  test('Get - should be able to get user data by id', async () => {
    jest.spyOn(
      userService.provider,
      'findById'
    ).mockResolvedValue(userMockData)

    const result = await userService.get(userMockData.id)
    expect(result).toBe(userMockData)
  })

  test('Delete - should throw UnexistentUserError when try to delete an unexistent user', async () => {
    jest.spyOn(
      userService.provider,
      'findById'
    ).mockResolvedValue()

    jest.spyOn(
      userService.provider,
      'delete'
    ).mockResolvedValue(1)

    await expect(async () => {
      await userService.delete(userMockData.id)
    }).rejects.toBeInstanceOf(UnexistentUserError)
  })

  test('Delete - should be able to delete user data by id', async () => {
    jest.spyOn(
      userService.provider,
      'findById'
    ).mockResolvedValue(userMockData.id)

    const rowsAffected = await userService.delete(userMockData.id)
    expect(rowsAffected).toBe(1)
  })

})