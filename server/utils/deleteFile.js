const fs = require('fs/promises'); // Using promises for cleaner async/await syntax

const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error deleting file:', error);
    // Handle errors appropriately (e.g., log the error and send an error response)
  }
}

module.exports = deleteFile;