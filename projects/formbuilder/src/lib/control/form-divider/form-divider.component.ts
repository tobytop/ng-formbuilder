import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-divider',
  templateUrl: './form-divider.component.html',
  styleUrls: ['./form-divider.component.scss']
})
export class FormDividerComponent extends BaseControl implements OnInit {

  constructor(
    private commonService:CommonService
  ){
    super(commonService);
  }

  ngOnInit(): void {
  }

}
