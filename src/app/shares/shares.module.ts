import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ProductCardComponent } from './components/list-product/product-card/product-card.component';
import { ContactComponent } from './components/contact/contact.component';
import { RouterModule } from '@angular/router';
import { CanvasLoadImgDirective } from './canvas-load-img.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ListProductComponent,
    ProductCardComponent,
    ContactComponent,
    CanvasLoadImgDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ListProductComponent,
    ProductCardComponent,
    ContactComponent
  ]
})
export class SharesModule { }
