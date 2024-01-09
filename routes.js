const express = require('express');
const router = new express.Router();
let items = require('./fakeDb')

router.get('', (request, response, next) => {
    return response.json({items})
})

router.post('', (request, response, next) => {
    const newItem = {name:request.body.name, price:request.body.price}
    items.push(newItem)
    return response.json({added:{newItem}})
})

router.get('/:name', (request, response, next) => {
    const item = items.find(it => it.name === request.params.name)
    if(item === null){
        throw{message:"Not Found", status:404}
    }
    return response.json({item})
})

router.patch('/:name', (request, response, next) => {
    const editItem = items.find(it => it.name === request.params.name)
    if(editItem === null){
        throw{message:"Not Found", status:404}
    }
    editItem.name = request.body.name
    editItem.price = request.body.price
    return response.json({editItem})

})

router.delete('/:name', (request, response, next) => {
    const itemIdx = items.findIndex(it => it.name === request.params.name)
    if(itemIdx === -1){
        throw{message:"Not Found", status:404}
    }
    items.splice(itemIdx,1)
    return response.json({message: "Deleted"})
})

module.exports = router;