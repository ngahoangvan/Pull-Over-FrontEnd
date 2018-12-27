import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shares/model/api-model';
import { ApiService } from 'src/app/shares/service/api.service';
import { END_POINT } from '../../shares/service/api.registry'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listProduct: Array<Product>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.setListProduct();
  }

  setListProduct() {
    //this.apiService.get([END_POINT.product]).subscribe(products => this.listProduct = products);
    this.listProduct = [
      {
        id: '1',
        name: 'name1',
        price: 100000,
        description: 'description',
        category: 'category',
        image: 'https://i.imgur.com/KwFGCqe.jpg'
      },
      {
        id: '2',
        name: 'name2',
        price: 100000,
        description: 'description',
        category: 'category',
        image: 'https://i.imgur.com/KwFGCqe.jpg'
      },
      {
        id: '3',
        name: 'name3',
        price: 100000,
        description: 'description',
        category: 'category',
        image: 'https://i.imgur.com/KwFGCqe.jpg'
      },
      {
        id: '4',
        name: 'name4',
        price: 100000,
        description: 'description',
        category: 'category',
        image: 'https://i.imgur.com/KwFGCqe.jpg'
      },
    ];
  }
}
