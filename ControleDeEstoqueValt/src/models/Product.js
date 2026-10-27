export default class Product {
    constructor(id, nome, categoria, preco, quantidade, unidade) {
        this.id = id;
        this.nome = nome;
        this.categoria = categoria;
        this.preco = Number(preco);
        this.quantidade = Number(quantidade);
        this.unidade = unidade; // Ex: un, kg, pct, lt
    }

    validar() {
        if (!this.nome || this.nome.trim() === "") {
            throw new Error("O nome do produto não pode ser vazio.");
        }
        if (isNaN(this.preco) || this.preco < 0) {
            throw new Error("O preço deve ser um valor válido e não negativo.");
        }
        if (isNaN(this.quantidade) || this.quantidade < 0) {
            throw new Error("A quantidade em estoque não pode ser negativa.");
        }
        return true;
    }
}