import React, { useState, useEffect } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inputValue, setInputValue] = useState('');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/produtos');
        const data = await response.json();
        setProducts(data);
        console.log(data)
      } catch (error) {
        console.error(error);

      }
    };

    fetchProducts();
  }, []);

  const handleChangeName = (event) => {
    setNewProductName(event.target.value);
  };
  const handleChangePrice = (event) => {
    setNewProductPrice(event.target.value);
  };
  const handleChangeStock = (event) => {
    setNewProductStock(event.target.value);
  };

  const handleNewProductSubmit = async (e) => {
    e.preventDefault();
    let code = generateRandomNumericId(4);
    const newProduct = {
      codigo: code,
      nome: newProductName,
      preco: parseFloat(newProductPrice),
      estoque: parseInt(newProductStock),
    };

    console.log(JSON.stringify(newProduct));

    try {
      const response = await fetch('http://localhost:8080/api/produtos', {
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


  const handleUpdateProduct = async () => {
    if (!selectedProduct) {
      return;
    }

    const { codigo, ...updatedProduct } = selectedProduct;

    try {
      const response = await fetch(`http://localhost:8080/api/produtos/${codigo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });

      if (!response.ok) {
        throw new Error(`Error updating product: ${await response.text()}`);
      }

      const updatedProducts = products.map(product => (
        product.codigo === codigo ? { ...product, ...updatedProduct } : product
      ));
      setProducts(updatedProducts);
      setSelectedProduct(null); // 
    } catch (error) {
      console.error(error);

    }
  };

  const handleDeleteProduct = async (codigo) => {
    try {
      console.log(codigo)
      const response = await fetch(`http://localhost:8080/api/produtos/${codigo}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error deleting product: ${await response.text()}`);
      }

      const updatedProducts = products.filter(product => product.codigo !== codigo);
      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  function generateRandomNumericId(length) {
    let result = 0;
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * charactersLength);
    }
    return result;
  }

  function openModal(edit = false, index = 0) {
    const modal = document.querySelector('.modal-container')
    const sNome = document.querySelector('#m-nome')
    const sFuncao = document.querySelector('#m-funcao')
    const sSalario = document.querySelector('#m-salario')
    const btnSalvar = document.querySelector('#btnSalvar')

    modal.classList.add('active')

    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }

    if (edit) {
      sNome.value = ""
      sFuncao.value = ""
      sSalario.value = ""
      // id = 
    } else {
      sNome.value = ''
      sFuncao.value = ''
      sSalario.value = ''
    }
  }

  return (
    // <div className="products-container">
    //     <h1>Products</h1>

    //     {/* Display existing products */}
    //     <ul className="products-list">
    //         {products.map((product) => (
    //             <li key={product.codigo} className="product-item">
    //                 <div>
    //                     <h3>{product.nome}</h3>
    //                     <p>Price: R$ {product.preco.toFixed(2)}</p>
    //                     <p>Stock: {product.estoque}</p>
    //                 </div>
    //                 <div className="product-actions">
    //                     <button onClick={() => handleGetProduct(product.codigo)}>Edit</button>
    //                     <button onClick={() => handleDeleteProduct(product.codigo)}>Delete</button>
    //                 </div>
    //             </li>
    //         ))}
    //     </ul>

    //     {/* Create new product form */}
    //     <h2>Create New Product</h2>
    //     <form onSubmit={handleNewProductSubmit}>
    //         <label htmlFor="name">Name:</label>
    //         <input
    //             type="text"
    //             id="name"
    //             value={newProductName}
    //             onChange={(e) => setNewProductName(e.target.value)}
    //             required
    //         />
    //         <label htmlFor="price">Price:</label>
    //         <input
    //             type="number"
    //             id="price"
    //             value={newProductPrice}
    //             onChange={(e) => setNewProductPrice(e.target.value)}
    //             required
    //         />
    //         <label htmlFor="stock">Stock:</label>
    //         <input
    //             type="number"
    //             id="stock"
    //             value={newProductStock}
    //             onChange={(e) => setNewProductStock(e.target.value)}
    //             required
    //         />
    //         <button type="submit">Create Product</button>
    //     </form>

    //     {/* Edit product form (conditionally rendered) */}
    //     {selectedProduct && (
    //         <>
    //             <h2>Edit Product</h2>
    //             <form onSubmit={handleUpdateProduct}>
    //                 <label htmlFor="edit-name">Name:</label>
    //                 <input
    //                     type="text"
    //                     id="edit-name"
    //                     value={selectedProduct.nome}
    //                     onChange={(e) => {
    //                         setSelectedProduct({ ...selectedProduct, nome: e.target.value });
    //                     }}
    //                     required
    //                 />
    //                 <label htmlFor="edit-price">Price:</label>
    //                 <input
    //                     type="number"
    //                     id="edit-price"
    //                     value={selectedProduct.preco}
    //                     onChange={(e) => {
    //                         setSelectedProduct({ ...selectedProduct, preco: parseFloat(e.target.value) });
    //                     }}
    //                     required
    //                 />
    //                 <label htmlFor="edit-stock">Stock:</label>
    //                 <input
    //                     type="number"
    //                     id="edit-stock"
    //                     value={selectedProduct.estoque}
    //                     onChange={(e) => {
    //                         setSelectedProduct({ ...selectedProduct, estoque: parseInt(e.target.value) });
    //                     }}
    //                     required
    //                 />
    //                 <button type="submit">Update Product</button>
    //             </form>
    //             <button onClick={() => setSelectedProduct(null)}>Cancel Edit</button>
    //         </>
    //     )}
    // </div>

    <main className="body">
      <div className="container">
        <div className="header">
          <span>Cadastro de Produto</span>
          <button onClick={openModal} id="new">Incluir</button>
        </div>

        <div className="divTable">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th className="acao">Editar</th>
                <th className="acao">Excluir</th>
              </tr>
              {products ? <>
                {products.map((prd) => (
                  <tr key={prd.key}>
                    <td>{prd.nome}</td>
                    <td>{prd.preco}</td>
                    <td>{prd.estoque}</td>
                    <td><button onClick={() => { 
                      setSelectedProduct(prd);
                       openModal(true);
                       setNewProductName(prd.nome);
                       setNewProductPrice(prd.preco);
                       setNewProductStock(prd.estoque);
                       }}>Editar</button></td>
                    <td><button onClick={() => { handleDeleteProduct(prd.codigo) }}>Excluir</button></td>
                  </tr>
                ))}
              </> : <></>}
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>

        <div class="modal-container">
          <div class="modal">
            <form onSubmit={selectedProduct? handleUpdateProduct: handleNewProductSubmit}>
              <label for="m-nome">Nome</label>
              <input id="m-nome" type="text" value={newProductName}
                onChange={handleChangeName}
                required />

              <label for="m-funcao">Preço</label>
              <input id="m-funcao" type="number" value={newProductPrice}
                onChange={handleChangePrice} required />

              <label for="m-salario">Estoque</label>



              <input id="m-salario" type="number" value={newProductStock}
                onChange={handleChangeStock} required />


              <button id="btnSalvar">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
