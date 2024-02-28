import React, { useState, useEffect } from 'react';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductStock, setNewProductStock] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/produtos');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error(error);
                
            }
        };

        fetchProducts();
    }, []);

    const handleNewProductSubmit = async (e) => {
      e.preventDefault();

      const newProduct = {
          nome: newProductName,
          preco: parseFloat(newProductPrice),
          estoque: parseInt(newProductStock),
      };

      try {
          const response = await fetch('/api/produtos', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newProduct)
          });

          if (!response.ok) {
              throw new Error(`Error creating product: ${await response.text()}`);
          }

          setProducts([...products, newProduct]);
          setNewProductName('');
          setNewProductPrice('');
          setNewProductStock('');
      } catch (error) {
          console.error(error);
         
      }
  };

  const handleGetProduct = async (coding) => {
      try {
          const response = await fetch(`/api/produtos/${coding}`);
          const data = await response.json();
          setSelectedProduct(data);
      } catch (error) {
          console.error(error);
       
      }
  };

  const handleUpdateProduct = async () => {
      if (!selectedProduct) {
          return; 
      }

      const { coding, ...updatedProduct } = selectedProduct;

      try {
          const response = await fetch(`/api/produtos/${coding}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedProduct)
          });

          if (!response.ok) {
              throw new Error(`Error updating product: ${await response.text()}`);
          }

          const updatedProducts = products.map(product => (
              product.coding === coding ? { ...product, ...updatedProduct } : product
          ));
          setProducts(updatedProducts);
          setSelectedProduct(null); // 
      } catch (error) {
          console.error(error);
        
      }
  };

  const handleDeleteProduct = async (coding) => {
      try {
          const response = await fetch(`/api/produtos/${coding}`, {
              method: 'DELETE',
          });

          if (!response.ok) {
              throw new Error(`Error deleting product: ${await response.text()}`);
          }

          const updatedProducts = products.filter(product => product.coding !== coding);
          setProducts(updatedProducts);
      } catch (error) {
          console.error(error);
      }
  };

    return (
        <div className="products-container">
            <h1>Products</h1>

            {/* Display existing products */}
            <ul className="products-list">
                {products.map((product) => (
                    <li key={product.coding} className="product-item">
                        <div>
                            <h3>{product.nome}</h3>
                            <p>Price: R$ {product.preco.toFixed(2)}</p>
                            <p>Stock: {product.estoque}</p>
                        </div>
                        <div className="product-actions">
                            <button onClick={() => handleGetProduct(product.coding)}>Edit</button>
                            <button onClick={() => handleDeleteProduct(product.coding)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Create new product form */}
            <h2>Create New Product</h2>
            <form onSubmit={handleNewProductSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    required
                />
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(e.target.value)}
                    required
                />
                <label htmlFor="stock">Stock:</label>
                <input
                    type="number"
                    id="stock"
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(e.target.value)}
                    required
                />
                <button type="submit">Create Product</button>
            </form>

            {/* Edit product form (conditionally rendered) */}
            {selectedProduct && (
                <>
                    <h2>Edit Product</h2>
                    <form onSubmit={handleUpdateProduct}>
                        <label htmlFor="edit-name">Name:</label>
                        <input
                            type="text"
                            id="edit-name"
                            value={selectedProduct.nome}
                            onChange={(e) => {
                                setSelectedProduct({ ...selectedProduct, nome: e.target.value });
                            }}
                            required
                        />
                        <label htmlFor="edit-price">Price:</label>
                        <input
                            type="number"
                            id="edit-price"
                            value={selectedProduct.preco}
                            onChange={(e) => {
                                setSelectedProduct({ ...selectedProduct, preco: parseFloat(e.target.value) });
                            }}
                            required
                        />
                        <label htmlFor="edit-stock">Stock:</label>
                        <input
                            type="number"
                            id="edit-stock"
                            value={selectedProduct.estoque}
                            onChange={(e) => {
                                setSelectedProduct({ ...selectedProduct, estoque: parseInt(e.target.value) });
                            }}
                            required
                        />
                        <button type="submit">Update Product</button>
                    </form>
                    <button onClick={() => setSelectedProduct(null)}>Cancel Edit</button>
                </>
            )}
        </div>
    );
};

export default ProductsPage;
