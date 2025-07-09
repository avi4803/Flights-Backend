const statusCodes = require('http-status-codes');

const info = (req , res) => {
    return res.status(statusCodes.MULTI_STATUS).json({
        success: true,
        message: "API working fine",
        error: {},
        data: {} 

    })
}

module.exports = {
   info
} 