class NotFoundError extends Error
{
  constructor(message)
  {
    super(message || 'Requested data was not found')
    this.name = 'NotFoundError'
  }
}

module.exports = NotFoundError
