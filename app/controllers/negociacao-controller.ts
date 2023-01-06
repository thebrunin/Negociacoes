import { Negociacao } from "../models/negociacao.js";

export class NegociacaoController {
    private inputData;
    private inputQuantidade;
    private InputValor;

    constructor() {
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.InputValor = document.querySelector('#valor');
    }

    adiciona() {
        const negociacao = new Negociacao(
            this.inputData.value,
            this.inputQuantidade.value,
            this.InputValor.value
        );
        console.log(negociacao);
    }
}