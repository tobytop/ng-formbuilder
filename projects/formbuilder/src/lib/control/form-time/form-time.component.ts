import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-time',
  templateUrl: './form-time.component.html',
  styleUrls: ['./form-time.component.scss']
})
export class FormTimeComponent extends BaseControl implements OnInit {

  public control:FormControl =new FormControl();
  constructor(
    private commonService:CommonService
  ){
    super(commonService);
  }

  ngOnInit(): void {
  }

}
