import { HttpClient } from '@angular/common/http';
import { ComponentRef, EmbeddedViewRef, EventEmitter, Injectable, Injector, TemplateRef, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { FORM_ALERT, FORM_CHECKBOX, FORM_COUNTER, FORM_DATE, FORM_DIVIDER, FORM_INPUT, FORM_LAYOUT, FORM_RADIO, FORM_RATE, FORM_RICHINPUT, FORM_SELECT, FORM_SLIDER, FORM_SPACE, FORM_TIME, FORM_TOGGLE, FORM_TRANSFER, FORM_TREE, FORM_UPLOAD } from '../control/control-api';
import { ControlBuilder } from '../control/controlbuilder';
import { CanvasInfo, MAINCONTAINER } from '../model/attributeInfo';
import { BoxInfo, ControlInfo, ControlType, ShowBoxInfo } from '../model/boxInfo';
import { FollowItem } from '../model/followItem';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http:HttpClient,
    private inject:Injector
  ){}

  private importCompSubject: Subject<{control:ControlInfo,name:string}> = new Subject();
  public importObservable: Observable<{control:ControlInfo,name:string}> = this.importCompSubject.asObservable();
  private followComSubject: Subject<{follow:FollowItem,name:string}> = new Subject<{follow:FollowItem,name:string}>();
  public followObservable: Observable<{follow:FollowItem,name:string}> = this.followComSubject.asObservable();
  public cancelEvent: EventEmitter<string> = new EventEmitter<string>();
  private showShadowSubject: Subject<{isshow:boolean,name:string}> = new Subject<{isshow:boolean,name:string}>();
  public showShadowObservable: Observable<{isshow:boolean,name:string}> = this.showShadowSubject.asObservable();
  private formItemClickSubject:Subject<string> =new Subject<string>();
  public formItemClickObservable:Observable<string> = this.formItemClickSubject.asObservable();
  private removeItemClickSubject:Subject<string> =new Subject<string>();
  public removeItemClickObservable:Observable<string> = this.removeItemClickSubject.asObservable();
  private moveSubject: Subject<string> = new Subject<string>();
  public moveObservable: Observable<string> = this.moveSubject.asObservable();
  public changeFormLayout:EventEmitter<CanvasInfo> = new EventEmitter<CanvasInfo>();
  
  public attiEvent: EventEmitter<any> = new EventEmitter<any>();
  public testEvent: EventEmitter<string> = new EventEmitter<string>();

  public orginControlId!:string;
  public boxLayout:BoxInfo[] = [];
  public shadow!:EmbeddedViewRef<any>;
  public previousPosition!:{x:number,y:number};
  public mainshadow!:TemplateRef<any>;
  public boxId!:string;
  public formGroup!:FormGroup;
  public colloctData:any;

  public setImportComp(control:{control:ControlInfo,name:string}):void{
    this.importCompSubject.next(control);
  }
  public setFollowComp(follow:{follow:FollowItem,name:string}):void{
    this.followComSubject.next(follow);
  }
  public setShowShadows(showInfo:{isshow:boolean,name:string}):void{
    this.showShadowSubject.next(showInfo);
  }

  public setFormItemClick(itemName:string):void{
    this.formItemClickSubject.next(itemName);
  }

  public setRemoveItemClick(itemName:string):void{
    this.removeItemClickSubject.next(itemName);
  }
  public setMoveSubject(itemName:string):void{
    this.moveSubject.next(itemName);
  }

  public buildControl(data:any):ControlBuilder{
    let child:ControlBuilder;
    switch (data.controltype) {
      case ControlType.Input:
        child = new ControlBuilder(this.inject.get<any>(FORM_INPUT).constructor,data);
        break;
      case ControlType.RichIput:
        child = new ControlBuilder(this.inject.get<any>(FORM_RICHINPUT).constructor,data);
        break;
      case ControlType.Counter:
        child = new ControlBuilder(this.inject.get<any>(FORM_COUNTER).constructor,data);
        break;
      case ControlType.Toggle:
        child = new ControlBuilder(this.inject.get<any>(FORM_TOGGLE).constructor,data);
        break;
      case ControlType.Row:
        child = new ControlBuilder(this.inject.get<any>(FORM_LAYOUT).constructor,data);
        break;
      case ControlType.Select:
        child = new ControlBuilder(this.inject.get<any>(FORM_SELECT).constructor,data);
        break;
      case ControlType.Alert:
        child = new ControlBuilder(this.inject.get<any>(FORM_ALERT).constructor,data);
        break;
      case ControlType.Check:
        child = new ControlBuilder(this.inject.get<any>(FORM_CHECKBOX).constructor,data);
        break;
      case ControlType.Radio:
        child = new ControlBuilder(this.inject.get<any>(FORM_RADIO).constructor,data);
        break;
      case ControlType.Date:
        child = new ControlBuilder(this.inject.get<any>(FORM_DATE).constructor,data);
        break;
      case ControlType.Time:
        child = new ControlBuilder(this.inject.get<any>(FORM_TIME).constructor,data);
        break;
      case ControlType.Rate:
        child = new ControlBuilder(this.inject.get<any>(FORM_RATE).constructor,data);
        break;
      case ControlType.Space:
        child = new ControlBuilder(this.inject.get<any>(FORM_SPACE).constructor,data);
        break;
      case ControlType.Divider:
        child = new ControlBuilder(this.inject.get<any>(FORM_DIVIDER).constructor,data);
        break;
      case ControlType.Upload:
        child = new ControlBuilder(this.inject.get<any>(FORM_UPLOAD).constructor,data);
        break;
      case ControlType.Transfer:
        child = new ControlBuilder(this.inject.get<any>(FORM_TRANSFER).constructor,data);
        break;
      case ControlType.Tree:
        child = new ControlBuilder(this.inject.get<any>(FORM_TREE).constructor,data);
        break;
      case ControlType.Slide:
        child = new ControlBuilder(this.inject.get<any>(FORM_SLIDER).constructor,data);
        break;
      default:
        child = new ControlBuilder(this.inject.get<any>(FORM_INPUT).constructor,data);
        break;
    }
    return child;
  }
  public clearData():void {
    this.shadow = <any>null;
    this.orginControlId = <any>null;
    this.previousPosition = <any>null;
    this.boxId = <any>null;
  }

  public getPreviewData(mode:string = "detail"):ShowBoxInfo[]{
    return this.changeBoxInfoToShowBox(this.boxLayout,mode);
  }

  public createComponent(boxs:ShowBoxInfo[],view:ViewContainerRef,mode:string,name:string = ""):void{
    if(mode == "op"){
      var layout = name == MAINCONTAINER ? this.boxLayout : this.findlayout(this.boxLayout,name).boxInfos;
    }
    boxs.forEach((o,index)=>{
      const data = {...o.data};
      data.mode = mode;
      const child:ControlBuilder = this.buildControl(data);

      const componentRef = view.createComponent<any>(<any>child.control);
      componentRef.instance.data = child.data;
      if(componentRef.instance.data.controltype == ControlType.Select){
        this.addSelectValid(componentRef);
      }

      if(componentRef.instance.control && this.formGroup){
        this.formGroup.addControl(componentRef.instance.data.name,componentRef.instance.control);
      }

      const controlname = componentRef.instance.data.controlname;
      if(this.colloctData && controlname && controlname != ""){
        this.colloctData[controlname] = componentRef.instance.data;
      }

      if(data.controltype == ControlType.Row && o.layout){
        componentRef.instance.originallayouts = o.layout;
      }
      if(mode == "op"){
        var box:BoxInfo = {boxid:data.name,comp:componentRef};
        if(data.controltype == ControlType.Row && o.layout){
          box.selected = data.selected;
          box.layout = <any>[];
          o.layout.forEach((value:ShowBoxInfo[],key:string)=>{
            box.layout!.push({name:key,boxInfos:[]})
          });
        }
        layout.push(box);
      }
      componentRef.changeDetectorRef.detectChanges();
      view.insert(componentRef.hostView,index);
    })
  }

  public getTheData(data:any,queryString:string = ""):Observable<any>{
    var obj:Observable<any> = <any>null;
    if(data.dataType == "interface" && data.postdata
          && data.postdata.url != "" && data.postdata.function != ""){
        if(queryString != ""){
          data.postdata.url = data.postdata.url.format(queryString);
        }
        const options ={
          headers:data.postdata.head,
          params:data.postdata.data,
        };
        switch (data.postdata.method) {
          case "GET":
            obj =this.http.get(data.postdata.url,options);
            break;
          case "POST":
            obj =this.http.post(data.postdata.url,options);
            break;
          case "PUT":
            obj =this.http.put(data.postdata.url,options);
            break;
          case "DELETE":
            obj =this.http.delete(data.postdata.url,options);
            break;
          default:
            break;
        }
    }
    return obj;
  }
  private changeBoxInfoToShowBox(inputBoxs:BoxInfo[],mode:string = "detail"):ShowBoxInfo[]{
    var showInfos:ShowBoxInfo[] = [];
    for (let i = 0; i < inputBoxs.length; i++) {
      const box = inputBoxs[i];
      const showInfo:ShowBoxInfo={
        boxid:box.boxid,
        data:{... box.comp.instance.data}
      };
      if(mode == "detail"){
        delete showInfo.data["mode"];
      }
      if(box.layout){
        showInfo.layout = new Map<string,ShowBoxInfo[]>();
        for (let j = 0; j < box.layout.length; j++) {
          const interBox = box.layout[j];
          showInfo.layout.set(interBox.name,this.changeBoxInfoToShowBox(interBox.boxInfos,mode));
        }
      }
      showInfos.push(showInfo);
    }
    return showInfos;
  }

  public addSelectValid(control:ComponentRef<any>){
    const valid = control.instance.data.rules.validators;
    if(valid){
      const indexs = [];
      for (let index = 0; index < valid.length; index++){
        if(Object.hasOwnProperty.bind(valid[index])("maxOptions")||Object.hasOwnProperty.bind(valid[index])("minOptions")){
          if(indexs.length == 1){
            indexs.push(index - 1);
          }else{
            indexs.push(index);
          }
        }
      }
      indexs.forEach(o=>{
        valid.splice(o,1);
      });
      for (let index = 0; index < valid.length; index++){
        if(Object.hasOwnProperty.bind(valid[index])("max")){
          valid.push({"maxOptions":control.instance.maxOptions(parseInt(valid[index]["max"]))});
        }
        if(Object.hasOwnProperty.bind(valid[index])("min")){
          valid.push({"minOptions":control.instance.minOptions(parseInt(valid[index]["min"]))});
        }
      }
    }
  }
  
  public replacer(key:string, value:any):any {
    if(value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()),
      };
    } else {
      return value;
    }
  }

  public reviver(key:string, value:any):any {
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }

  private findlayout(parentLayout:BoxInfo[],name:string):{name:string,boxInfos:BoxInfo[]}{
    var boxs = parentLayout.filter(o => o.layout);
    if(boxs){
      for (let i = 0; i < boxs.length; i++) {
        const element = boxs[i].layout!.find(x => x.name == name);
        if(element){
          return element;
        } else {
          for (let j = 0; j < boxs[i].layout!.length; j++) {
            const one = this.findlayout(boxs[i].layout![j].boxInfos,name);
            if(one){
              return one
            }
          }
        }
      }
    }
    return <any>null;
  }
}

declare global {
  interface String {
      format(...patterns:string[]): string;
  }
}

String.prototype.format = function(...patterns:string[]) {
  var s:string = <string>this;
  for (let index = 0; index < patterns.length; index++) {
    s = s.replace(new RegExp('\\{' + index + '\\}','g'),patterns[index]);
  }
  return s;
}