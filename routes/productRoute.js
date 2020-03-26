const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const Product = require('../models/productModel');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png' || ext !== '.jpeg') {
      return cb(null, false);
    }
    return cb(null, true);
  },
});

const upload = multer({ storage }).single('productImage');


//  upload product
//  api/product/uploadproduct

router.post('/uploadproduct', upload, async (req, res) => {
  console.log(req.body);
  try {
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      productImage: req.file.path,
    });
    const newProduct = await product.save();
    res.status(200).json({ msg: 'Product Upload Succesfully', newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json('server error');
  }
});


//  getAll product
//  api/product/getallProduct

router.get('/getallProduct', async (req, res) => {
  try {
    const { page, perPage } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(perPage, 10) || 10,
    };
    const getAllProduct = await Product.paginate({}, options);
    if (!getAllProduct) {
      return res.status(404).json({ msg: 'Product Not Found' });
    }
    res.status(200).json(getAllProduct);
  } catch (error) {
    res.status(500).json('Server Error');
  }
  return 0;
});

//  get single product
//  api/product/getproduct/:id

router.get('/getproduct/:id', async (req, res) => {
  try {
    const getProduct = await Product.findById(req.params.id);
    if (!getProduct) {
      return res.status(404).json({ message: 'Product Not Found' });
    }
    res.status(200).json(getProduct);
  } catch (error) {
    res.status(500).json(error);
  }
  return 0;
});

//  update product by product id
//  api/product/updateproduct/:id

// router.put('/updateproduct/:id', async (req, res) => {
//   try {
//     const updateProduct = await
//     Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json({ message: 'Product Update Succesfully ', updateProduct });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

//  delete  product by product id
//  api/product//deleteproduct/:id

router.delete('/deleteproduct/:id', async (req, res) => {
  try {
    const deleteProduct = await
    Product.findByIdAndRemove(req.params.id);
    res.status(200).json({ msg: 'Product Delete Succesfully Deleted', deleteProduct });
  } catch (error) {
    res.status(500).json('Server Error');
  }
});

module.exports = router;
