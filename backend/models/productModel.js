import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true // Elimina espacios en blanco innecesarios
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        styles: {
            type: [String], // Array de strings para representar los estilos (e.g., ["mariposa", "vaca", "floral"])
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0 // Para asegurar que no se ingrese un valor negativo
        },
        discount: {
            type: Number,
            default: 0, // El valor por defecto es 0 (sin descuento)
            min: 0,
            max: 100 // Descuento máximo de 100%
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0 // Valor por defecto de 0 para manejar inventario inicial
        },
        images: {
            type: [String], // URLs de las imágenes del producto
            validate: [arrayLimit, 'Exceeds the limit of 5 images'] // Validador para permitir un máximo de 5 imágenes
        },
        isFeatured: {
            type: Boolean,
            default: false // Indica si el producto es destacado o no
        }
    },
    { timestamps: true }
);

// Validador de la cantidad máxima de imágenes
function arrayLimit(val) {
    return val.length <= 5;
}

// Crear y exportar el modelo de Mongoose
const Product = mongoose.model('Product', productSchema);
export default Product;