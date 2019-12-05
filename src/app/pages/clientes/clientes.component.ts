import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clases/cliente';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[];

  constructor(private clienteService: ClientesService) {
    clienteService.getClientes().subscribe((clientes)=>{ 
      this.clientes = clientes; 
    },(error)=>{
      console.log("Error en peticion get"+error);
    });
  }

  ngOnInit() {
  }

}
