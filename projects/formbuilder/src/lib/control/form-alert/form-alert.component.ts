import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';
import { FORM_ALERT } from '../control-api';

@Component({
  selector: 'form-alert',
  templateUrl: './form-alert.component.html',
  styleUrls: ['./form-alert.component.scss']
})
export class FormAlertComponent extends BaseControl implements OnInit {

  constructor(
    private commonService:CommonService
  ){
    super(commonService);
  }

  ngOnInit(): void {
  }

}
