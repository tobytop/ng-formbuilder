import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { AttributeInfo, CANVASDEFAULT, CanvasInfo } from '../../model/attributeInfo';
import { CommonService } from '../../service/common.service';
import { FormBoxComponent } from '../form-box/form-box.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DOCUMENT } from '@angular/common';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-richinput',
  templateUrl: './form-richinput.component.html',
  styleUrls: ['./form-richinput.component.scss']
})
export class FormRichinputComponent extends BaseControl implements OnInit {

  editor = ClassicEditor;
  canvasInfo:CanvasInfo = CANVASDEFAULT;

  constructor(
    private commonService:CommonService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    super(commonService)
   }

  ngOnInit(): void {
    this.commonService.changeFormLayout.subscribe(o => {
      this.canvasInfo = o;
    })
  }
}
