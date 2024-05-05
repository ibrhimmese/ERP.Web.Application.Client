export class ProductModel{
    id:string="";
    name:string="";
    productType:ProductEnumType=new ProductEnumType();
    productTypeValue:number=1;
    quantity:number=0;
    stock:number =0;
}

export class ProductEnumType{
    name:string="";
    value:number=1;
}

export const productTypes:ProductEnumType[]=[
    {
        name:"Mamül",
        value:1,
    },
    {
        name:"Yarı Mamül",
        value:2,
    }

]