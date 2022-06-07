import { Component, OnInit } from '@angular/core';
import { CounterInfo } from '../../model/attributeInfo';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-counter',
  templateUrl: './form-counter.component.html',
  styleUrls: ['./form-counter.component.scss']
})
export class FormCounterComponent  extends BaseControl<CounterInfo> implements OnInit {

  ngOnInit(): void {
  }
  
  constructor(
    private commonService:CommonService
    ) { 
      super(commonService)
    }
}
