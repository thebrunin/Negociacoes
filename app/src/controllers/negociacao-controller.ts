import { MensagemView } from './../views/mensagem-view.js';
import { NegociacoesView } from './../views/negociacoes-view.js';
import { Negociacoes } from './../models/negociacoes.js';
import { Negociacao } from "../models/negociacao.js";
import { DiaDaSemana } from '../enums/dias-da-semana.js';
import { logarTempoDeExecucao } from '../decorators/logar-tempo-de-execucao.js';
import { inspect } from '../decorators/inspect.js';
import { domInjector } from '../decorators/dom-inject.js';

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes: Negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    
    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @inspect
    @logarTempoDeExecucao()
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if(!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas!');
            return ;
        }
        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
    }
    
    async importarDados() {
        const url = 'http://localhost:8080/dados'
        const dados = await fetch(url);
        const dadosConvertidos: any[] = await dados.json();
        
        dadosConvertidos.forEach((dado) => {
            this.negociacoes.adiciona(new Negociacao(new Date(), dado.vezes, dado.montante))
        })
        
        this.atualizaView();
    }

    private ehDiaUtil(data: Date): boolean {
        return data.getDay() > DiaDaSemana.DOMINGO 
            && data.getDay() < DiaDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }

}