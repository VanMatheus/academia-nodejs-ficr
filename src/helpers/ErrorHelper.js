class ErrorHandle extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

const errorHandle = (err, res) => {
  const { statusCode, message, lineNumber } = err

  return res.status(statusCode).json({
    error: 'error',
    statusCode,
    message,
    lineNumber
  })
}

module.exports = {
  errorHandle,
  ErrorHandle
}