import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, tap, catchError } from "rxjs/operators";
import { Category } from "../models/category.model";

@Injectable({
  providedIn: "root"
})
export class categoryService {
  constructor(private http: HttpClient) {}
  getCategoryData(): Observable<Category[]> {
    let url = "http://localhost:3000/admin/getcategori";
    return this.http.get<Category[]>(url).pipe(
      tap(data => {
        let dt = JSON.stringify(data);
        console.log(dt);
      }),
      catchError(err => of([]))
    );
  }
  getCategoryIDData(id): Observable<Category> {
    let url = "http://localhost:3000/admin/getcategorid/" + id;
    return this.http.get<Category>(url).pipe(
      tap(data => {
        let dt = JSON.stringify(data);
        console.log(dt);
      }),
      catchError(err => of(new Category()))
    );
  }
  editCategotyData(id, Title): Observable<any> {
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    };
    let body = new URLSearchParams();
    body.set("Title", Title);

    let url = "http://localhost:3000/admin/editcategori/" + id;
    return this.http.put<Category>(url, body.toString(), options).pipe(
      tap(data => console.log(data)),
      catchError(err => of(new Category()))
    );
  }
  addCategotyData(Title): Observable<Category> {
    let options = {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    };
    let body = new URLSearchParams();
    body.set("Title", Title);

    let url = "http://localhost:3000/admin/newcategori";
    return this.http.post<Category>(url, body.toString(), options).pipe(
      tap(data => console.log(data)),
      catchError(err => of(new Category()))
    );
  }
  deleteCategory(id): Observable<Category> {
    let url = "http://localhost:3000/admin/deletecategori/" + id;
    return this.http.delete<Category>(url).pipe(
      tap(
        data => console.log(data),
        catchError(err => of(null))
      )
    );
  }
}
