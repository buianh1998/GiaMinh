import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { Product } from "./../models/product.model";
@Injectable({
  providedIn: "root"
})
export class productService {
  constructor(private http: HttpClient) {}

  getDataProduct(): Observable<Product[]> {
    let url = "http://localhost:3000/admin/product";
    return this.http.get<Product[]>(url).pipe(
      tap(data => {
        let dataProduct = JSON.stringify(data);
        console.log(dataProduct);
      }),
      catchError(err => of([err]))
    );
  }
  getProductIdData(_id): Observable<Product> {
    let url = `http://localhost:3000/admin/productid/${_id}`;
    return this.http.get<Product>(url).pipe(
      tap(data => {
        let dataIdProduct = JSON.stringify(data);
        console.log(dataIdProduct);
      }),
      catchError(err => of(new Product()))
    );
  }
  addProductData(
    Title,
    Price,
    Description,
    Amount,
    Image,
    idCate
  ): Observable<any> {
    //options
    let option = {
      headers: new HttpHeaders().set("Content-Type", "multipart/form-data")
    };

    const formData: FormData = new FormData();
    formData.set("Title", Title);
    formData.set("Price", Price);
    formData.set("Description", Description);
    formData.set("Amount", Amount);
    formData.append("avatar", Image);
    formData.set("idCate", idCate);
    // let options = {
    //   headers: new HttpHeaders().set(
    //     "Content-Type",
    //     "application/x-www-form-urlencoded"
    //   )
    // };
    // let body = new URLSearchParams();
    // body.set("Title", Title);
    // body.set("Price", Price);
    // body.set("Description", Description);
    // body.set("Amount", Amount);
    // body.set("avatar", Image);
    // body.set("idCate", idCate);
    let url = `http://localhost:3000/admin/newproduct`;
    return this.http.post<Product>(url, formData).pipe(
      tap(data => {
        let dataIdProduct = JSON.stringify(data);
        console.log(dataIdProduct);
      }),
      catchError(err => of(new Product()))
    );
  }
  editProductData(
    _id,
    Title,
    Price,
    Description,
    Amount,
    Image,
    idCate
  ): Observable<Product> {
    let formData = new FormData();
    formData.set("Title", Title);
    formData.set("Price", Price);
    formData.set("Description", Description);
    formData.set("Amount", Amount);
    formData.append("avatar", Image);
    formData.set("idCate", idCate);
    let url = `http://localhost:3000/admin/editproduct/${_id}`;
    return this.http.put<Product>(url, formData).pipe(
      tap(
        data => console.log(data),
        catchError(err => of(new Product()))
      )
    );
  }
  deleteProductIdData(_id): Observable<Product> {
    let url = `http://localhost:3000/admin/deleteproduct/${_id}`;
    return this.http.delete<Product>(url).pipe(
      tap(data => {
        let dataIdProduct = JSON.stringify(data);
        console.log(dataIdProduct);
      }),
      catchError(err => of(new Product()))
    );
  }
}
