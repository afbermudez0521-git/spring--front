import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clases/cliente';
import { ClientesService } from '../../services/clientes.service';
import { Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[];

  constructor(
    private clientesService: ClientesService, 
    private router: Router,
    ) {
      clientesService.getClientes().subscribe((clientes)=>{ 
      this.clientes = clientes; 
    },(error)=>{
      console.log("Error en peticion get"+error);
    });
  }

  ngOnInit() {
  }

  private delete(cliente){
    swal.fire({
      title: 'Esta seguro(a)?',
      text: "Desea eliminar este cliente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#545454',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.clientesService.DeleteClientes(cliente.id).subscribe((data)=>{
          this.clientes = this.clientes.filter(cli => cli !== cliente); 
          swal.fire('Bien', 'Se Eliminó cliente', 'success');
        });
      }
    });
  }

}
