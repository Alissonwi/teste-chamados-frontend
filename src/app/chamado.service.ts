import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Chamado } from './models/chamado';
import { environment } from "../environments/environment"
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChamadoService {

  constructor(private _http: Http) { }

  getChamadoById(chamadoId){
    return this._http.get(`${environment.backend_url}/Chamado/${chamadoId}`, { headers: this.getHeaders() }).map(success => success.json() as Chamado)
  }

  getAll() {
    return this._http.get(`${environment.backend_url}/Chamado`, { headers: this.getHeaders() }).map(success => success.json() as Chamado[])
  }

  updateStatus(chamadoId, status){
    return this._http.get(`${environment.backend_url}/Chamado/update/${chamadoId}/${status}`, { headers: this.getHeaders() }).map(success => success)
  }

  addChamado(chamado){
    return this._http.post(`${environment.backend_url}/Chamado`, chamado, { headers: this.getHeaders() }).map(success => success)
  }

   private getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}

