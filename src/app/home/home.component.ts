import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { CartService } from '../services/cart.service';
import { DetailsComponent } from '../modals/details/details.component';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: any;          // Almacena los productos cargados
  filterCategory: any;    // Almacena los productos filtrados
  

  constructor(
    private homeService: HomeService,
    private cartService: CartService,
    public dialogRef: MatDialog,
    private ngbModal: NgbModal,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // Obtiene todos los productos desde el servicio HomeService
    this.homeService.getAllProducts().subscribe(res => {
      this.loadData(res);
    });
  }

  // Método para cargar los datos de los productos
  loadData(res: any) {
    this.products = res;
    this.filterCategory = res;
  }

  // Método para agregar un producto al carrito
  addtocart(item: any) {
    this.cartService.addtoCart(item);
    this.openSnackBar("Se agregó exitosamente al carrito", "OK");
  }

  // Método para filtrar los productos por categoría
  filter(category: string) {
    this.filterCategory = this.products
      .filter((a: any) => {
        if (a.category === "women's clothing" || a.category === "men's clothing") {
          a.category = "fashion";
        }
        if (a.category == category || category == '') {
          return a;
        }
      });
  }

  // Método para ver los detalles de un producto
  detail(item: any) {
    let modal = this.ngbModal.open(DetailsComponent, { windowClass: 'xxl' });
    modal.componentInstance.data = item;
  }

  // Método para exportar los datos a un archivo Excel
  exportExcel(): void {
    const tableData: any[] = [];
    const headers: string[] = [
      'Id',
      'Imagen',
      'Descripción',
      'Categoría',
      'Precio'
    ];

    this.filterCategory.forEach((row: any) => {
      const rowData: any[] = [
        row.id,
        row.image,
        row.description,
        row.category,
        row.price,
      ];
      tableData.push(rowData);
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headers, ...tableData]);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'tabla.xlsx');
  }

  // Método para mostrar un mensaje emergente (Snackbar)
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,        // Duración del mensaje (en milisegundos)
      panelClass: ['ok-snackbar']  // Clases CSS personalizadas para el Snackbar
    });
  }
}
