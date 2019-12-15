import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clases/cliente';
import { ClientesService } from '../../services/clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente:Cliente = new Cliente();

  constructor(
      private clientesService: ClientesService, 
      private router: Router,
      private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.getId();
  }

  public create():void{

    swal.fire({
      title: 'Esta seguro(a)?',
      text: "Desea crear este cliente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.clientesService.CreateClientes(this.cliente).subscribe((data)=>{
          this.router.navigate(['/clientes']);
          swal.fire('Bien', 'Se guardó cliente con exito', 'success');
        });
      }
    });

  }

  public getId(): void{
    this.activatedRoute.params.subscribe((params)=>{
      this.cliente.id = params['id'];
      if(this.cliente.id){
        this.clientesService.GetClientesId(this.cliente).subscribe((cliente)=>{
          this.cliente = cliente;
        });
      }
    });
  }

  public update():void{

    swal.fire({
      title: 'Esta seguro(a)?',
      text: "Desea modificar este cliente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.clientesService.UpdateClientes(this.cliente).subscribe((data)=>{
          this.router.navigate(['/clientes']);
          swal.fire('Bien', 'Se modificó cliente con exito', 'success');
        });
      }
    });
    
  }

  public cancel():void{
    this.router.navigate(['/clientes']);
  }

}
