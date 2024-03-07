const fs = require("fs");

class ProductManager {
    static lastId = 0;
    constructor() {
        this.products = [];
        this.path = "./productManager.json";
    }


    async addProduct(title, description, price, img, code, stock) {
        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Favor llenar todos los campos");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El código debe ser único");
            return;
        }

        const newProduct = {
            id: ++ProductManager.lastId,
            title,
            description,
            price,
            img,
            code,
            stock,
        };

        this.products.push(newProduct);

        const guardarArchivos = async () => {
            try {
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
                console.log("Producto agregado correctamente");
            } catch (error) {
                console.error("Error al guardar archivos:", error);
            }
        }
        await guardarArchivos();        
    }


    getProducts = async () => {
        try {
            const respuesta = await fs.promises.readFile(this.path, "utf-8");
            let products = JSON.parse(respuesta);
            console.log(products)
        }
        catch (error) {
            console.error("Error:", error);
            return [];
        }
    }


    getProductById = async (id) => {
        try {
            const respuesta = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(respuesta);
            const product = products.find(item => item.id === id);
            if (!product) {
                console.log("Producto no encontrado");
            } else {
                console.log("Producto encontrado:", product);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }


    updateProduct = async (id, updatedFields) => {
        try {
            const respuesta = await fs.promises.readFile(this.path, "utf-8");
            let products = JSON.parse(respuesta);
            const index = products.findIndex(item => item.id === id);
            if (index === -1) {
                console.log("Producto no encontrado");
                return;
            }
            products[index] = { ...products[index], ...updatedFields };
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            console.log("Producto actualizado correctamente");
        } catch (error) {
            console.error("Error:", error);
        }
    }


    deleteProduct = async (id) => {
        try {
            const respuesta = await fs.promises.readFile(this.path, "utf-8");
            let products = JSON.parse(respuesta);
            const index = products.findIndex(item => item.id === id);
            if (index === -1) {
                console.log("Producto no encontrado");
                return;
            }
            products.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            console.log("Producto eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    }
}


//Testing

//Instancia de la clase “ProductManager”
const testing = new ProductManager("./productManager.json");

//getProducts - Devuelve arreglo vacío
//testing.getProducts();

//add product - Se agrega producto 
//testing.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

//getProducts - Aparece producto recién agregado
//testing.getProducts();

//getProductById - Devuelve producto por ID
//console.log(testing.getProductById(2));

//updateProduct - Modifica producto
//testing.updateProduct(1, { price: 250000 });

//eleteProduct - Elimina producto
//console.log(testing.deleteProduct(1));

