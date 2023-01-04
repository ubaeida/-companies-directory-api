const { validateName, validateEmail, validatePassword } = require("../services/validationService")

const store = (req, res, next) => {
    const result = {
        success: true,
        data: null,
        messages: []
    }
    const { name = '', email = '', password = '' } = req.body
    // Validation
    if (!validateName(name)) {
        result.success = false
        result.messages.push('Please enter a valid name')
    }
    if (!validateEmail(email)) {
        result.success = false
        result.messages.push('Please enter a valid email')
    }
    if (!validatePassword(password)) {
        result.success = false
        result.messages.push('Please enter a valid password')
    }
    if (!result.success) {
        // validation failed
        res.send(result)
        return
    }
    return res.send(result)
    // Store in database

    // Send response
}

module.exports = {
    store
}