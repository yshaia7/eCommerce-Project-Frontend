import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for paganation
  thePageNumber = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string  |  null | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const theKeyword: string | null =
      this.route.snapshot.paramMap.get('keyword');

    if ((this, this.previousKeyword != theKeyword)) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);
    // now search for the products using keyword
    this.productService
      .searchProductPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword
      )
      .subscribe(this.processResult());
  }

  handleListProducts() {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    } else {
      // not category id available .. default to category id 1
      this.currentCategoryId = 1;
    }

    //  check id we have different category then previous
    // Note: Angular will reuse a component if it is currently being viewed
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(
      `currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`
    );

    // get product for the given category id
    this.productService
      .getProductListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult());
  }

  processResult() {
    return (data: {
      _embedded: { products: Product[] };
      page: { number: number; size: number; totalElements: number };
    }) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }
  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);

  }

}
