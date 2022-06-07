import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CascaderComponent, CascaderItem } from 'ng-devui';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-tree',
  templateUrl: './form-tree.component.html',
  styleUrls: ['./form-tree.component.scss']
})
export class FormTreeComponent extends BaseControl implements OnInit,AfterViewInit {

  @ViewChild(CascaderComponent,{static:false})
  childtree!:CascaderComponent;

  constructor(
    private commonService:CommonService
  ){
    super(commonService);
  }
  ngAfterViewInit(): void {
    if(this.data.postdata.url != ""){
      this.childtree.loadChildrenFn = (value:CascaderItem) =>{
        return this.commonService.getTheData(this.data,<string>value.value);
      }
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  private getData(){
    this.commonService.getTheData(this.data)?.subscribe(o=>{
      this.data.options = o;
    })
  }
}
