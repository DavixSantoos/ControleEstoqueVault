import { abrirBanco } from '../database/database';

export const ProductService = {
    async adicionar(product) {
        try {
            product.validar();
            const db = await abrirBanco();
            const result = await db.runAsync(
                `INSERT INTO products (nome, categoria, preco, quantidade, unidade) VALUES (?, ?, ?, ?, ?);`,
                [product.nome, product.categoria, product.preco, product.quantidade, product.unidade]
            );
            return result.lastInsertRowId;
        } catch (error) {
            throw new Error("Erro ao salvar produto: " + error.message);
        }
    },

    async listar(ordenacao = 'nome') {
        try {
            const db = await abrirBanco();
            let query = `SELECT * FROM products`;

            if (ordenacao === 'preco') {
                query += ` ORDER BY preco DESC`;
            } else if (ordenacao === 'qtd') {
                query += ` ORDER BY quantidade ASC`;
            } else {
                query += ` ORDER BY nome ASC`;
            }

            const rows = await db.getAllAsync(query);
            return rows;
        } catch (error) {
            throw new Error("Erro ao buscar produtos: " + error.message);
        }
    },

    async atualizar(product) {
        try {
            product.validar();
            const db = await abrirBanco();
            await db.runAsync(
                `UPDATE products SET nome = ?, categoria = ?, preco = ?, quantidade = ?, unidade = ? WHERE id = ?;`,
                [product.nome, product.categoria, product.preco, product.quantidade, product.unidade, product.id]
            );
            return true;
        } catch (error) {
            throw new Error("Erro ao atualizar produto: " + error.message);
        }
    },

    async excluir(id) {
        try {
            const db = await abrirBanco();
            await db.runAsync(`DELETE FROM products WHERE id = ?;`, [id]);
            return true;
        } catch (error) {
            throw new Error("Erro ao excluir produto: " + error.message);
        }
    }
};