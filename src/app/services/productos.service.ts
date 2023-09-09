import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { producto } from "../interfaces/producto.interfaces";
import { promise } from 'protractor';
import { resolve } from 'url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando =  true;
  productos:producto[] = []; 
  productosFiltrado: producto[]= [];
  
  constructor(private http:HttpClient) { 
    this.cargarProductos();
  }

  cargarProductos(){
      this.http.get(environment.loadProducts).subscribe((resp:producto[]) => {
        this.productos = resp;
        this.cargando = false;
      })
  }

  getProducto(id:string){
    return this.http.get(`${environment.getProducts}${id}.json`);
  }

  // buscarProducto (termino:string){
  //   if (this.productos.length === 0) {
  //     this.cargarProductos().then ( () => {
  //       this.filtrarProductos(termino);
  //     });
  //   }else{
  //     this.filtrarProductos(termino);
  //   }
  // }

  private filtrarProductos( termino:string){
    this.productosFiltrado=[];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ) {
        this.productosFiltrado.push(prod);
      }
    });
  }

}
