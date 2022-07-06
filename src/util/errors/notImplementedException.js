export default class NotImplementedException extends Error {
  constructor(message) {
    super(`The ${message} method was not implemented`)
    this.name = "NotImplementedException"
  }
}