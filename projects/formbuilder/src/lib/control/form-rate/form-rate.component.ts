import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-rate',
  templateUrl: './form-rate.component.html',
  styleUrls: ['./form-rate.component.scss']
})
export class FormRateComponent extends BaseControl implements OnInit {
  
  public control:FormControl =new FormControl();
  constructor(
    private commonService:CommonService
  ){
    super(commonService);
  }
  
  ngOnInit(): void {
  }

}
