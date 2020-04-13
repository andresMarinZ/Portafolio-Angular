import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { producto } from "../interfaces/producto.interfaces";
import { promise } from 'protractor';
import { resolve } from 'url';

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

  private cargarProductos(){
    return new Promise ( ( resolve, reject) =>{
      this.http.get("https://angularhtml-b5b5e.firebaseio.com/productos_idx.json").subscribe((resp:producto[]) => {
        // console.log(resp);
        this.productos = resp;
        this.cargando = false;
        resolve();
      })
    }); 
  }

  getProducto(id:string){
    return this.http.get(`https://angularhtml-b5b5e.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto (termino:string){
    if (this.productos.length === 0) {
      //cargarproductos
      this.cargarProductos().then ( () => {
        //despues de tener los productos
        //aplicar filtro
        this.filtrarProductos(termino);
      });
    }else{
      //aplicar filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos( termino:string){
    this.productosFiltrado=[];
    termino = termino.toLocaleLowerCase();
    // console.log(this.productos);
    
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ) {
        this.productosFiltrado.push(prod);
      }
    });
  }

}
