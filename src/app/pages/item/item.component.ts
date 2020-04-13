import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { productoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  producto:productoDescripcion;
  id:string;
  constructor(private rooter:ActivatedRoute,
              private productoService:ProductosService) { }

  ngOnInit() {
    this.rooter.params.subscribe( parametros =>{
      // console.log(parametros['id']);
      this.productoService.getProducto(parametros['id']).subscribe( (producto: productoDescripcion) => {
        this.id = parametros['id'];
        this.producto = producto;
        // console.log(producto);
      })
    })
  }
}
