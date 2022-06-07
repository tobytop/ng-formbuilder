import { Component, Input, OnInit } from '@angular/core';
import { nanoid } from 'nanoid';
import { BoxInfo, ShowBoxInfo } from '../../model/boxInfo';
import { CommonService } from '../../service/common.service';
import { BaseControl } from '../basecontrol';

@Component({
  selector: 'form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss']
})
export class FormLayoutComponent extends BaseControl implements OnInit {

  constructor(
    private commonService:CommonService,
  ) {
    super(commonService);
  }

  @Input("originallayouts")
  originallayouts:Map<string,ShowBoxInfo[]> = new Map<string,ShowBoxInfo[]>();

  ngOnInit(): void {
    if(this.data.mode == "op"){
      this.commonService.formItemClickObservable.subscribe(o=>{
        this.data.defaultvalue.forEach((v:{selected:boolean,name:string,boxInfos:BoxInfo[]})=>{
          if(o == v.name){
            v.selected = !v.selected;
          }else{
            v.selected = false;
          }
        })
      });
    }
  }

  onAddrow(){
    const name = nanoid();
    this.data.defaultvalue.push({name:name,selected:"",boxInfos:[]});
    this.addTolayout(this.commonService.boxLayout, name);
  }
  onRemoverow(e:string){
    for (let index = 0; index < this.data.defaultvalue.length; index++) {
      const element = this.data.defaultvalue[index];
      if(element.name == e){
        this.data.defaultvalue.splice(index,1);
        break;
      }
    }
    this.removelayout(this.commonService.boxLayout, e);
  }
  private addTolayout(reallayouts:BoxInfo[], name:string):boolean{
    for (let index = 0; index < reallayouts.length; index++) {
      const element = reallayouts[index];
      if(element.layout){
        if(element.boxid == this.data.name){
          element.layout!.push({name:name,boxInfos:[]});
          return true;
        } else {
          for (let j = 0; j < element.layout.length; j++) {
            const layout = element.layout[j];
            if(this.addTolayout(layout.boxInfos,name)){
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  private removelayout(reallayouts:BoxInfo[], name:string):boolean{
    for (let index = 0; index < reallayouts.length; index++) {
      const element = reallayouts[index];
      if(element.layout){
        for (let j = 0; j < element.layout.length; j++) {
          const layout = element.layout[j];
          if(layout.name == name){
            element.layout.splice(j,1);
            return true;
          } else {
            if(this.addTolayout(layout.boxInfos,name)){
              return true;
            }
          }
        }
      }
    }
    return false;
  }
}

