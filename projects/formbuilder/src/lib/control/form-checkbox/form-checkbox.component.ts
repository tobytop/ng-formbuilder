import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss']
})
export class FormCheckboxComponent extends BaseControl implements OnInit {

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
}
