import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CafeService } from '../services/cafe.service';
import Swal from 'sweetalert2';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-cafe-detalle',
  templateUrl: './cafe-detalle.component.html',
  styleUrl: './cafe-detalle.component.css'
})


export class CafeDetalleComponent {
  cafe: any;
  cafes: any;
  resultado: number = 0;

  constructor(
    private cafeService: CafeService,
    private activatedRoute: ActivatedRoute,
    private viewportScroller: ViewportScroller,

  ){}
  cantidad: number = 0;



sumarCantidad() {
  this.cantidad++;
  this.resultado = this.cafe.precio * this.cantidad 
}

restarCantidad() {
  if (this.cantidad > 0) {
    this.cantidad--; 
    this.resultado = this.cafe.precio * this.cantidad
  }
}



  ngOnInit(){

    this.activatedRoute.params.subscribe( ( data: any ) => {
      
      const id = data.id;
      this.cafeService.getCafeById( id ).subscribe( ( data: any ) => {
      this.cafe = data.data;
      })

      this.cafeService.obtenerCafe().subscribe( data => {
      this.cafes = data
        
      })
    })
  }
  
  scrollToSection(sectionId: string): void {
    this.viewportScroller.scrollToAnchor(sectionId);
  }

  mensajePagar(){
    if (this.cantidad === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: "Por Favor escoge almenos un articulo",
        confirmButtonColor: '#d33',
        confirmButtonText: 'Cerrar'
      });
    }
    else{
      Swal.fire({
        title: "¡Gracias por tu compra!",
        text: "El total de su compra es: $" + this.resultado,
        imageUrl: this.cafe?.urlImagen,
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
      this.enviarPedido()
    }
    
  }
  enviarPedido(){
    const pedido = {
      productos: [this.cafe],
      total: this.resultado,
      cantidad: this.cantidad,
      cedula: 1,
    };
    this.cafeService.enviarPedidoCafe(pedido).subscribe(data=>{console.log(data)})
  }

  

  refrescarPagina() {
    window.location.reload();
  }
  
}


