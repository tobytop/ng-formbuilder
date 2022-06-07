import { Component, Input, OnInit } from '@angular/core';
import { CANVASDEFAULT, CanvasInfo, MAINCONTAINER} from '../model/attributeInfo';
import { ShowBoxInfo } from '../model/boxInfo';
import { CommonService } from '../service/common.service';


@Component({
  selector: 'form-canvas',
  templateUrl: './form-canvas.component.html',
  styleUrls: ['./form-canvas.component.scss']
})
export class FormCanvasComponent implements OnInit {

  canvasInfo:CanvasInfo = CANVASDEFAULT;
  containerName:string = MAINCONTAINER;
  @Input("originalLayout")
  originalLayout!:ShowBoxInfo[];
  
  constructor(
    private commonService:CommonService
  ) { }
  
  ngOnInit(): void {
    this.commonService.changeFormLayout.subscribe(o=>{
      this.canvasInfo = o;
    })
  }
}
