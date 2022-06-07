import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-transfer',
  templateUrl: './form-transfer.component.html',
  styleUrls: ['./form-transfer.component.scss']
})
export class FormTransferComponent extends BaseControl implements OnInit {

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
