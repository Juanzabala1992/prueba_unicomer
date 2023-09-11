import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  // Declaración de propiedades de la clase
  products: any = [];       // Almacena los productos en el carrito
  grandTotal!: number;      // Almacena el precio total de todos los productos en el carrito


  constructor(private cartService: CartService, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    // Obtiene los productos del carrito desde el servicio
    this.cartService.getProducts()
      .subscribe((res: any) => {
        this.products = res;
        // Calcula el precio total de los productos en el carrito
        this.grandTotal = this.cartService.getTotalPrice();
      });
  }

  // Método para eliminar un producto del carrito
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  // Método para vaciar completamente el carrito
  emptycart() {
    this.cartService.removeAllCart();
  }

  // Método para realizar la compra de los productos en el carrito
  buy() {
    // Vacía el carrito al realizar la compra
    this.cartService.removeAllCart();
    // Muestra un mensaje de confirmación
    this.openSnackBar("Se compró exitosamente", "OK");
  }

  // Método para mostrar un mensaje emergente (Snackbar)
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,        // Duración del mensaje (en milisegundos)
      panelClass: ['ok-snackbar']  // Clases CSS personalizadas para el Snackbar
    });
  }
}
