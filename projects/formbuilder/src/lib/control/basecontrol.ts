import { Directive, Input, ViewChild } from "@angular/core";
import { CommonService } from "../service/common.service";
import { FormBoxComponent } from "./form-box/form-box.component";

@Directive()
export abstract class BaseControl<T=any>{
  @Input()
  public data!:T;
  @ViewChild("box")
  public box!:FormBoxComponent;

  private _commonService:CommonService;
  
  constructor(
    commonService:CommonService
  ){
    this._commonService = commonService;
  }

  public onClick(e:boolean){
    (<any>this.data).itemselected = e;
    this._commonService.attiEvent.emit(this.data);
  }
}