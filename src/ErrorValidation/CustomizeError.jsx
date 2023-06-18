export class InputError extends Error {
  constructor(message) {
    super(message)
    this.name = "InputError"
  }
}

const createErrorFactory = function (name) {
  return class InputError extends Error {
    constructor(message) {
      super(message)
      this.name = name
    }
  }
}

export const PositionError = createErrorFactory("PositionError")
export const PriceError = createErrorFactory("PriceError")
export const UserError = createErrorFactory("UserError")
export const AuthError = createErrorFactory("AuthError")
