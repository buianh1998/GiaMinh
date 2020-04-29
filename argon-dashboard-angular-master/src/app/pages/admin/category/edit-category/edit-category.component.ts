import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Category } from "./../../../../models/category.model";
import { categoryService } from "./../../../../services/category.service";
@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.css"]
})
export class EditCategoryComponent implements OnInit {
  constructor(
    private categoryService: categoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  @Input() idDataCate = new Category();
  // getCateIdData() {
  //   // sao lai dung inpidDataCateut, qua tínht á làm kiểu m để thẳng trên 1componen new, sửa xog cái này là làm
  //   let id = this.route.snapshot.paramMap.get("idCate");

  //   this.categoryService.getCategoryIDData(id).subscribe((data: any) => {
  //     this.idDataCate = data.dataCate;
  //     console.log(this.idDataCate);
  //   });
  // }
  // ủa tại sao lai
  // nó vẫn hiện đc tên mà nó k hiểu title
  ngOnInit(): void {}
  editCateData(f) {
    this.categoryService
      .editCategotyData(
        this.idDataCate._id,
        (this.idDataCate.Title = f.value.Title)
      )
      .subscribe(data => {
        console.log(data);
        this.idDataCate = null;
      });
  }
}
