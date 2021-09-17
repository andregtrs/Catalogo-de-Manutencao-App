import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { Equipamento } from '../equipamento';
import { EquipamentosService } from '../../equipamentos.service'

@Component({
  selector: 'app-equipamentos-lista',
  templateUrl: './equipamentos-lista.component.html',
  styleUrls: ['./equipamentos-lista.component.css']
})
export class EquipamentosListaComponent implements OnInit {

  equipamentos: Equipamento[] = [];
  equipamentoSelecionado: Equipamento;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private service: EquipamentosService, 
    private router: Router) {}

  ngOnInit(): void {
    this.service
      .getEquipamentos()
      .subscribe( resposta => this.equipamentos = resposta );
  }

  novoCadastro(){
    this.router.navigate(['/equipamentos/form'])
  }

  preparaDelecao(cliente: Equipamento){
    this.equipamentoSelecionado = cliente;
  }

  deletarEquipamento(){
    this.service
      .deletar(this.equipamentoSelecionado)
      .subscribe( 
        response => {
          this.mensagemSucesso = 'Equipamento deletado com sucesso!'
          this.ngOnInit();
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar o equipamento.'  
      )
  }
}