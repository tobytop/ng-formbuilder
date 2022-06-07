import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from 'ng-devui';
import { FormPreviewComponent } from '../form-preview/form-preview.component';
import { CANVASDEFAULT, CanvasInfo } from '../model/attributeInfo';
import { ShowBoxInfo } from '../model/boxInfo';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent {

  constructor(
    private dialogService: DialogService,
    private commonService:CommonService
    ) { }
  
  canvasInfo:CanvasInfo = CANVASDEFAULT;

  @Input("originalLayout")
  originalLayout!:string;
  @Output()
  sendBuilderString:EventEmitter<string> = new EventEmitter<string>();

  get inputLayout():ShowBoxInfo[]{
    if(this.originalLayout){
      return JSON.parse(this.originalLayout,this.commonService.reviver);
    }else {
      return <any>null
    }
  }

  openPreview(){
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '850px',
      maxHeight: '600px',
      title: '表单预览',
      content: FormPreviewComponent,
      backdropCloseable: true,
      dialogtype: "standard",
      onClose: () => {
        console.log('on dialog closed');
      },
      buttons: [
        {
          cssClass: 'primary',
          text: '确定',
          disabled: false,
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: '取消',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
      data: this.canvasInfo,
    });
  }
  sendBuilderEvent(){
    this.sendBuilderString.emit(JSON.stringify(this.commonService.getPreviewData("op"),this.commonService.replacer));
  }
}
