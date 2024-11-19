import Product from '../models/productModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// Crear un nuevo producto
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, category, styles, price, discount, stock, images } = req.body;

    if (!name || !description || !category || !styles || !price) {
        throw new Error("Please provide all required product details.");
    }

    const newProduct = new Product({
        name,
        description,
        category,
        styles,
        price,
        discount: discount || 0,
        stock: stock || 0,
        images: images || []
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400);
        throw new Error("Invalid product data");
    }
});

// Obtener todos los productos
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Obtener un producto por ID
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

// Actualizar un producto por ID
const updateProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.category = req.body.category || product.category;
        product.styles = req.body.styles || product.styles;
        product.price = req.body.price || product.price;
        product.discount = req.body.discount !== undefined ? req.body.discount : product.discount;
        product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
        product.images = req.body.images || product.images;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

// Eliminar un producto por ID
const deleteProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
};