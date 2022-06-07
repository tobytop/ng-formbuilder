import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent  extends BaseControl implements OnInit {

  public control:FormControl =new FormControl();

  constructor(
    private commonService:CommonService
  ){
    super(commonService);
  }
  
  ngOnInit(): void {
    this.getData();
    this.commonService.testEvent.subscribe(o=>{
      if(o==this.data.name){
        this.getData();
      }
    })
  }
  private getData(){
    this.commonService.getTheData(this.data)?.subscribe(o=>{
      var res=<any>null;
      eval("res =" + this.data.postdata.function);
      this.data.options = res(o);
    })
  }

  public maxOptions(num:number) {
    return (val:any) => {
      return !val || val.length <= num;
    };
  }

  public minOptions(num:number) {
    return (val:any) => {
      return !val || val.length >= num;
    };
  }
}
