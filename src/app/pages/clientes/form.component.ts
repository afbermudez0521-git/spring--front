import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clases/cliente';
import { ClientesService } from '../../services/clientes.service';
import { Router } from '@angular/router';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente:Cliente = new Cliente();

  constructor(private clientesService: ClientesService, private router: Router) { }

  ngOnInit() {
  }

  public create():void{
    console.log("Creando");
    this.clientesService.createClientes(this.cliente).subscribe((data)=>{
      this.router.navigate(['/clientes']);
      swal.fire('Bien', 'Se guardo cliente con exito', 'success');
    });

  }

  public cancel():void{
    this.router.navigate(['/clientes']);
  }

}
