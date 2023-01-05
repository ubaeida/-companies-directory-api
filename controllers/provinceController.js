const models = require('../models')
const { getInstanceById } = require('../services/modelService')
const { validateName } = require('../services/validationService')

const store = async (req, res, next) => {
    const result = {
        success: true,
        data: null,
        messages: []
    }
    const { name = '' } = req.body
    // Validation
    if (!validateName(name)) {
        result.success = false
        result.messages.push('Please enter a valid province name')
    }
    if (!result.success) {
        // validation failed
        res.send(result)
        return
    }
    const province = await models.Province.create({
        name
    })
    if (province) {
        result.data = province
        result.messages.push('Province created successfully')
    } else {
        result.success = false
        result.messages.push('Please try again later')
    }
    return res.send(result)
}
const index = async (req, res, next) => {
    const result = {
        success: true,
        data: null,
        messages: []
    }
    const provinces = await models.Province.findAll({
        // eager loading: bring all data together (province + its cities)
        include: [
            models.City
        ]
    })
    result.data = provinces
    return res.send(result)
}
const show = async (req, res, next) => {
    const result = {
        success: false,
        data: null,
        messages: []
    }
    const item = await getInstanceById(req.params.id, 'Province')
    if (item.success) {
        result.success = true
        result.data = item.instance.dataValues
        // lazy load cities from province instance
        result.data.Cities = await item.instance.getCities({raw: true})
        
    }
    result.messages = [...item.messages]
    res.status(item.status)
    return res.send(result)
}
const update = async (req, res, next) => {
    const result = {
        success: false,
        data: null,
        messages: []
    }
    const { name = '' } = req.body
    const item = await getInstanceById(req.params.id, 'Province')
    if (item.success) {
        if (!validateName(name)) {
            result.messages.push('Please enter a valid province name')
        } else {
            result.success = true
            await item.instance.update({
                name
            })
            result.data = item.instance
            result.messages.push('Province updated successfully')
        }
    } else {
        result.messages = [...item.messages]
    }
    
    res.status(item.status)
    return res.send(result)
}
/*
const destroy = async (req, res, next) => {
    const result = {
        success: true,
        data: null,
        messages: []
    }
    const id = +req.params.id
    if (typeof id === 'number' && id > 0) {
        const province = await models.Province.findByPk(id)
        if (province) {
            await province.destroy()
            result.messages.push('Province deleted successfully')
        } else {
            res.status(404)
            result.success = false
            result.messages.push('Province not found')
        }
    } else {
        res.status(422)
        result.success = false
        result.messages.push('Please provide a valid id')
    }
    return res.send(result)
}
*/

const destroy = async (req, res, next) => {
    const result = {
        success: false,
        data: null,
        messages: []
    }
    const item = await getInstanceById(req.params.id, 'Province')
    if (item.success) {
        result.success = true
        await item.instance.destroy()
        result.messages.push('Province deleted successfully')
    } else {
        result.messages = [...item.messages]
    }
    res.status(item.status)
    return res.send(result)
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}