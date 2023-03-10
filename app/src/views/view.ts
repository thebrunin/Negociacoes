import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { inspect } from '../decorators/inspect.js';

export abstract class View<T> {

    protected elemento: HTMLElement;
    
    constructor(seletor: string) {
        const elemento = document.querySelector(seletor);
        if(elemento) {
            this.elemento = <HTMLElement> elemento;
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM, verifique`);
        }
    }
    
    public update(model: T): void {
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }

    protected abstract template(model: T): string;
}