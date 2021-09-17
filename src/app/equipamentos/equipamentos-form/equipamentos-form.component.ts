import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Equipamento } from '../equipamento'
import { EquipamentosService } from '../../equipamentos.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-equipamentos-form',
  templateUrl: './equipamentos-form.component.html',
  styleUrls: ['./equipamentos-form.component.css']
})
export class EquipamentoFormComponent implements OnInit {

  equipamento: Equipamento;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor( 
      private service: EquipamentosService ,
      private router: Router,
      private activatedRoute : ActivatedRoute
      ) {
    this.equipamento = new Equipamento();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        this.id = urlParams['id'];
        if(this.id){
          this.service
            .getEquipamentoById(this.id)
            .subscribe( 
              response => this.equipamento = response ,
              errorResponse => this.equipamento = new Equipamento()
            )
        }
    })
  }

  voltarParaListagem(){
    this.router.navigate(['/equipamentos/lista'])
  }

  onSubmit(){
    if(this.id){

      this.service
        .atualizar(this.equipamento)
        .subscribe(response => {
            this.success = true;
            this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o equipamento.']
        })


    }else{

      this.service
        .salvar(this.equipamento)
          .subscribe( response => {
            this.success = true;
            this.errors = null;
            this.equipamento = response;
          } , errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          })

    }

  }

}