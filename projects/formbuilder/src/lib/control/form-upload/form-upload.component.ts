import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng-devui';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent extends BaseControl implements OnInit {

  fileUploaders: Array<FileUploader> = [];
  message: Array<Object> = [];
  isDropOver = false;
  UPLOADED: string;
  CANCELUPLOAD: string;

  constructor(
    private commonService:CommonService
  ){
    super(commonService);
    this.UPLOADED = '上传成功';
    this.CANCELUPLOAD = '取消上传';
  }
  ngOnInit(): void {
  }
  
  fileDrop(files:any) {
    this.isDropOver = false;
    console.log(files);
  }
  fileOver(event:any) {
    this.isDropOver = event;
    console.log(event);
  }
  alertMsg(event:any) {
    this.message = event;
  }
  deleteFile(currFile:any) {
    this.fileUploaders = this.fileUploaders.filter((fileUploader) => {
      return currFile !== fileUploader;
    });
  }
}
