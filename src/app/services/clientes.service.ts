import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../clases/cliente';
import { CLIENTES } from '../json/cliente.json.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url:string = "http://localhost:8080/rest/clientes";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) {

  }

  //findAll
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  //findById
  GetClientesId(cliente: Cliente): Observable<Cliente>{
    return this.http.get<Cliente>(this.url+"/"+cliente.id);
  }

  //save
  CreateClientes(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.url, cliente, {headers:this.httpHeaders});
  }

  //update
  UpdateClientes(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(this.url+"/"+cliente.id, cliente, {headers:this.httpHeaders});
  }

  //delete
  /*DeleteClient(cliente: Cliente): Observable<void>{
    return this.http.delete<void>(this.url, cliente, {headers:this.httpHeaders});
  }*/
  

}
