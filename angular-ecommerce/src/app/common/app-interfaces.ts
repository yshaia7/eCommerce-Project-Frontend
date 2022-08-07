import { Country } from "./country";
import { OrderHistory } from "./order-history";
import { Product } from "./product";
import { ProductCategory } from "./product-category";
import { State } from "./state";


interface GetResponseStates{
    _embedded: {
      states: State[];
    }
  }

  interface GetResponseCountries{
    _embedded: {
      countries: Country[];
    }
  }

  interface GetResponseProducts {
    _embedded: {
      products: Product[];
    };
    page: {
      size: number;
      totalElements: number;
      totalPage: number;
      number: number;
    };
  }
  
interface GetResponseOrderHistory{
    _embedded: {
      orders: OrderHistory[];
    }
  }
  

  interface GetResponseProductCategory {
    _embedded: {
      productCategory: ProductCategory[];
    };
  }
  

  export  {
    GetResponseStates,
    GetResponseCountries,
    GetResponseOrderHistory,
    GetResponseProducts,
    GetResponseProductCategory
}