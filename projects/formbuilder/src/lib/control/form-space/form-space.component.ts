import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-space',
  templateUrl: './form-space.component.html',
  styleUrls: ['./form-space.component.scss']
})
export class FormSpaceComponent extends BaseControl implements OnInit {

  constructor(
    private commonService:CommonService
  ){
    super(commonService);
  }
  
  ngOnInit(): void {
  }

}
