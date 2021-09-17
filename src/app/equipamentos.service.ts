import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Equipamento } from './equipamentos/equipamento';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EquipamentosService {

  apiURL: string = environment.apiURLBase + '/api/equipamentos';

  constructor( private http: HttpClient ) {}

  salvar( equipamento: Equipamento ) : Observable<Equipamento> {
    return this.http.post<Equipamento>( `${this.apiURL}` , equipamento);
  }

  atualizar( equipamento: Equipamento ) : Observable<any> {
    return this.http.put<Equipamento>(`${this.apiURL}/${equipamento.id}` , equipamento);
  }

  getEquipamentos() : Observable<Equipamento[]> {
    return this.http.get<Equipamento[]>(this.apiURL);
  }
  
  getEquipamentoById(id: number) : Observable<Equipamento> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  deletar(equipamento: Equipamento) : Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${equipamento.id}`);
  }

}