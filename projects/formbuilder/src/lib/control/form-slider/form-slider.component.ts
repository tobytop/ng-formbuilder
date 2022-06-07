import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-slider',
  templateUrl: './form-slider.component.html',
  styleUrls: ['./form-slider.component.scss']
})
export class FormSliderComponent extends BaseControl implements OnInit {

  constructor(
    private commonService:CommonService
  ){
    super(commonService);
  }
  
  ngOnInit(): void {
  }

}
