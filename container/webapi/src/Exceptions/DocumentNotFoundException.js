class DocumentNotFoundException extends Error
{
  constructor(message)
  {
    super(message || 'Requested document was not found')
    this.name = 'DocumentNotFound'
  }
}

module.exports = DocumentNotFoundException
