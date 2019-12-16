import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cliente } from '../clases/cliente';
import { CLIENTES } from '../json/cliente.json.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url:string = "http://localhost:8080/rest/clientes";
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient, private router: Router){

  }

  //findAll
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  //Cambiar flujo de datos 
  getClientesMap(): Observable<Cliente[]>{
    return this.http.get(this.url).pipe(
      map( (response) => { 
        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toLowerCase();
          return cliente;
        }); 
      }) 
    );
  }

  //findById
  GetClientesId(cliente: Cliente): Observable<Cliente>{

    return this.http.get<Cliente>(this.url+"/"+cliente.id).pipe(catchError(
      (e)=>{
        this.router.navigate(["/clientes"]);
        swal.fire("Error", e.error.mensaje, "error");
        return throwError(e);
      }
    ));

  }

  //save
  CreateClientes(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.url, cliente, {headers:this.httpHeaders}).pipe(catchError(
      (e)=>{

        if(e.status == 400){ //Error de validacion del formulario
          return throwError(e);
        }else{ //Errores de BD
          swal.fire("Error al insertar", e.error.mensaje, "error");
          return throwError(e);
        }

      })
    )
  }

  //update
  UpdateClientes(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(this.url+"/"+cliente.id, cliente, {headers:this.httpHeaders}).pipe(
      catchError((e)=>{

        if(e.status == 400){ //Error de validacion del formulario
          return throwError(e);
        }else{
          swal.fire("Error al actualizar", e.error.mensaje, "error");
          return throwError(e);
        }
        
      })
    );
  }

  //delete
  DeleteClientes(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(this.url+"/"+id, {headers:this.httpHeaders}).pipe(catchError(
      (e)=>{
        swal.fire("Error al eliminar", e.error.mensaje, "error");
        return throwError(e);
      }
    ));
  }
  

}
