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
  }

  public create():void{
    this.clientesService.CreateClientes(this.cliente).subscribe((data)=>{
      this.router.navigate(['/clientes']);
      swal.fire('Bien', 'Se guardo cliente con exito', 'success');
    });
  }

  public getId(): void{
    this.activatedRoute.params.subscribe((params)=>{
      let id = params['id'];
      if(id){
        this.clientesService.GetClientesId(id).subscribe((cliente)=>{
          this.cliente = cliente;
        });
      }
    });
  }

  public update():void{
    this.clientesService.UpdateClientes(this.cliente).subscribe((data)=>{
      
    });
  }

  public cancel():void{
    this.router.navigate(['/clientes']);
  }

}
