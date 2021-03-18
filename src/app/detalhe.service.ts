import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Detalhe } from './models/detalhe';
import { environment } from 'src/environments/environment';

@Injectable()
export class DetalheService {

  constructor(private _http: Http) { }

  getDetalheByChamadoId(id){
    return this._http.get(`${environment.backend_url}/Detalhe/Chamado/${id}`, { headers: this.getHeaders() }).map(success => success.json())
  }

  addComentario(comentario, chamado){
    let body = {comentario: comentario, chamado: chamado}
    return this._http.post(`${environment.backend_url}/Detalhe`, body, { headers: this.getHeaders() }).map(success => success)
  }

   private getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
