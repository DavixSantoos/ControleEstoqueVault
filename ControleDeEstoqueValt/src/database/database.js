import * as SQLite from 'expo-sqlite';

let db = null;

export const abrirBanco = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('estoque.db');
    }
    return db;
};

export const inicializarBanco = async () => {
    try {
        const database = await abrirBanco();
        await database.execAsync(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        categoria TEXT,
        preco REAL NOT NULL,
        quantidade INTEGER NOT NULL,
        unidade TEXT
      );
    `);
        console.log("Banco de dados de estoque inicializado!");
    } catch (error) {
        console.error("Erro ao inicializar o banco:", error);
        throw new Error("Falha ao criar banco de dados local.");
    }
};