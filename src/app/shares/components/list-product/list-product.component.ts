import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../model/api-model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  @Input() listProduct: Array<Product>;

  constructor() { }

  ngOnInit() {
  }
}
