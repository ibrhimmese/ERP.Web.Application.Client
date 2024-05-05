import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductModel, productTypes } from '../../models/product.model';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { NgForm } from '@angular/forms';
import { ProductPipe } from "../../pipes/product.pipe";
import { SharedModule } from '../../modules/shared.module';

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
    imports: [ProductPipe,SharedModule]
})
export class ProductsComponent implements OnInit {
  products:ProductModel[]=[];
  search:string="";
  types=productTypes;

  @ViewChild("createModalCloseBtn") createModalCloseButton:ElementRef<HTMLButtonElement> | undefined;
  @ViewChild("updateModalCloseBtn") updateModalCloseButton:ElementRef<HTMLButtonElement> | undefined;

  createModel:ProductModel=new ProductModel();
  updateModel:ProductModel=new ProductModel();

  constructor(
    private http:HttpService,
    private swal:SwalService
  )
  {}

  ngOnInit():void {
    this.getAll();
  }
  getAll(){
    this.http.post<ProductModel[]>("Products/GetAll",{},(res)=>{
      this.products=res;
    })
  }

  create(form:NgForm){
    if(form.valid){
      this.http.post<string>("Products/Create",this.createModel,(res)=>{
        this.swal.callToast(res);
        this.createModel=new ProductModel();
        this.createModalCloseButton?.nativeElement.click();
        this.getAll();
      });
    }
  }

  deleteById(model:ProductModel){
    this.swal.callSwal("Ürün Sil",`${model.name} ürününü silmek istiyor musunuz?`,()=>{
      this.http.post<string>("Products/DeleteById",{id:model.id},(res)=>{
        this.getAll();
        this.swal.callToast(res,"info");
      });
    })
  }

  get(model:ProductModel){
    this.updateModel={...model};
    this.updateModel.productTypeValue=model.productType.value;
  }

  update(form:NgForm){
    if(form.valid){
      this.http.post<string>("Products/Update",this.updateModel,(res)=>{
        this.swal.callToast(res);
        this.updateModalCloseButton?.nativeElement.click();
        this.getAll();
      });
    }
  }
}

