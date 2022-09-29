const express = require("express");
const {getAllProduct, createProduct, updateProduct, deleteProduct, getOneProduct 
 } = require("../controllers/product-controllers");
const router = express.Router();

//this is just an example
router.post('/:id', createProduct);
router.delete('/:id',  deleteProduct);
router.patch('/:id', updateProduct);
router.route('/:id', itemFour)
router.get('/:id',getOneProduct)
router.route('/', getAllProduct)

module.exports = router;
