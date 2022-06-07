import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-toggle',
  templateUrl: './form-toggle.component.html',
  styleUrls: ['./form-toggle.component.scss']
})
export class FormToggleComponent extends BaseControl implements OnInit {

  constructor(
    private commonService:CommonService,
  ) {
    super(commonService);
  }

  ngOnInit(): void {
  }

}
