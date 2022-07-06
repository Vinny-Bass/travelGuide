import { logger } from "./utils.js";
import { once } from 'events'
import AuthController from '../controllers/AuthController.js'
import UserController from '../controllers/UserController.js'

async function routes(request, response) {
  // Falta fazer a validacao de parametros e um roteamento decente
  // Resolver imports com .js automatico
  const { method, url } = request

  if (method === 'POST' && url === '/user/auth') {
    const data = await once(request, 'data')
    const { email, password } = JSON.parse(data)
    const authController = new AuthController()
    const token = await authController.handle(email, password)
    return response.end({ token })
  }

  if (method === 'POST' && url === '/user/register') {
    const data = await once(request, 'data')
    const { email, password, firstName, lastName, age } = JSON.parse(data)
    const userController = new UserController()
    const token = await userController.register(email, password, firstName, lastName, age)
    return response.end(JSON.stringify({ token }))
  }

  if (method === 'GET' && url === '/') {
    return response.end('Hello World')
  }

  response.writeHead(404)
  return response.end()
}

function handleError(error, response) {
  const message = `error on API: ${error.stack}`
  logger.warn(message)
  response.writeHead(500)
  return response.end(message)
}

function handler(request, response) {
  return routes(request, response).catch(error => handleError(error, response))
}

export default handler