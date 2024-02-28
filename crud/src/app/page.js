import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);


  useEffect(() => {
    fetch("http://localhost:8080/api/produtos").then(
      res => {
        setProducts(res);
      }
    );
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
        throw new Error(`Erro ao criar produto: ${await response.text()}`);
      }

      setProducts([...products, newProduct]);
      //clean older values
      setNewProductName('');
      setNewProductPrice('');
      setNewProductStock('');
    } catch (error) {
      console.error(error);

    }
  };

  const handleGetProduct = async (codigo) => {
    try {
      const response = await fetch(`/api/produtos/${codigo}`);
      const data = await response.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) {
      //if nothing is selected you cant update
      return;
    }

    const { codigo, ...updatedProduct } = selectedProduct;

    try {
      const response = await fetch(`/api/produtos/${codigo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar: ${await response.text()}`);
      }

      const updatedProducts = products.map(product => (
        product.codigo === codigo ? { ...product, ...updatedProduct } : product
      ));
      setProducts(updatedProducts);
      setSelectedProduct(null); // Clear selected product after update
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (codigo) => {
    try {
      const response = await fetch(`/api/produtos/${codigo}`, {
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
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
