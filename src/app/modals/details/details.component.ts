import { Component, Input, OnInit } from '@angular/core';
import { DetailService } from 'src/app/services/detail.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  // Propiedad de entrada (Input) que recibe los datos del producto
  @Input() data: any;
  
  constructor(private detailService: DetailService) { }

  ngOnInit(): void { 
    // Llama al servicio para obtener más detalles del producto
    this.detailService.getProduct(this.data).subscribe((data:any) => {
      this.data = data; // Actualiza los datos del producto con la respuesta del servicio
    });
  }
}
