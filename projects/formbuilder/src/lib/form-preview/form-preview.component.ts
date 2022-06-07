import { Component, forwardRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss']
})
export class FormPreviewComponent implements OnInit{

  @Input()
  data:any;
  @Input()
  showBtn:boolean = false;

  @ViewChild("main",{read:ViewContainerRef, static:true})
  main!:ViewContainerRef;

  userFormGroup:FormGroup = new FormGroup({});

  constructor(
    private commonService:CommonService,
  ) { }

  ngOnInit(): void {
    this.commonService.formGroup = this.userFormGroup;
    this.commonService.colloctData = Object.create(null);
    this.commonService.createComponent(this.commonService.getPreviewData(),this.main,"detail");
    console.log(this.commonService.getPreviewData())
  }


  submitPlanForm(e:{valid:any, directive:any, data:any, errors:any}) {
    if (e.valid) {
      var postdata = Object.create(null);
      for (const key in this.commonService.colloctData) {
        postdata[key] = this.commonService.colloctData[key].defaultvalue;
      }
      console.log(postdata);
    } else {
      // error tip
    }
  }
}
