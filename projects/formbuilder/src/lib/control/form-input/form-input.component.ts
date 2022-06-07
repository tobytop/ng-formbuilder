import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputInfo } from '../../model/attributeInfo';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent extends BaseControl<InputInfo> implements OnInit {

  public control:FormControl =new FormControl();

  ngOnInit(): void {
  }

  constructor(
    private commonService:CommonService
  ){
    super(commonService);
  }
}
