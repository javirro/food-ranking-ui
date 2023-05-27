import { PositionError, PriceError } from "./CustomizeError"

export const validatePosition = (position) => {
  const numberPattern = /^\d+$/ // Regex to know if the variable is a number
  if (!numberPattern.test(position)) throw new PositionError("Position must be a number")
}

export const validatePrice = (price) => {
  if (price) {
    const decimalNumberPatter = /^-?\d+(\.\d+)?$/ // Regex to know if the variable is a decimal number
    if (!decimalNumberPatter.test(price)) throw new PriceError("Price must be a  decimal number")
  }

}