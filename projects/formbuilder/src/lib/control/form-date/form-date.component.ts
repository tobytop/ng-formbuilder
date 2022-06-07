import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss']
})
export class FormDateComponent extends BaseControl implements OnInit {

  public control:FormControl =new FormControl();
  constructor(
    private commonService:CommonService
  ){
    super(commonService);
  }

  ngOnInit(): void {
  }

}
