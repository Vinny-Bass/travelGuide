import 'dotenv/config'
import server from './infra/server.js'
import { logger } from './infra/utils.js'

server.listen(process.env.APPLICATION_PORT).on(
  'listening', () => logger.info(`server running on port ${process.env.APPLICATION_PORT}`)
)