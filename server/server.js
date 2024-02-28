const mysql = require('mysql2/promise'); // Using promise-based approach
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = 8080;

const pool = mysql.createPool({
    host: 'mysql834.umbler.com',
    user: 'alunopuc',
    password:'engenharia',
    database: 'agenda',
    port:'41890'
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

// Route to get all products
app.get('/api/produtos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM produto');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao pegar produtos' });
    }
});

// Route to create a new product
app.post('/api/produtos', async (req, res) => {
    const { nome, preco, estoque } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO produto (nome, preco, estoque) VALUES (?, ?, ?)', [nome, preco, estoque]);
        res.json({ message: 'Produto criado com sucesso', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar produto' });
    }
});

// Route to get a single product by ID (codigo)
app.get('/api/produtos/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    try {
        const [rows] = await pool.query('SELECT * FROM produto WHERE codigo = ?', [codigo]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Produto não encontado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao pegar produto' });
    }
});

// Route to update a product
app.put('/api/produtos/:codigo', async (req, res) => {
    const codigo = req.params.codigo;
    const { nome, preco, estoque } = req.body;
    try {
        await pool.query('UPDATE produto SET nome = ?, preco = ?, estoque = ? WHERE codigo = ?', [nome, preco, estoque, codigo]);
        res.json({ message: 'Produto editado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao editar produto' });
    }
});
