import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, ViewChild, ViewContainerRef, ViewRef, ElementRef, Injector } from '@angular/core';
import { nanoid } from 'nanoid';
import { fromEvent } from 'rxjs';
import { FormDragTemplateDirective } from '../../formdirective/form-drag-template.directive';
import { INPUTDEFAULT, RICHINPUTDEFAULT, COUNTERDEFAULT, TOGGLEDEFAULT, LAYOUTDEFAULT, MAINCONTAINER, SELECTDEFAULT, ALERTDEFAULT, CHECKDEFAULT, RADIODEFAULT, DATEDEFAULT, TIMEDEFAULT, RATEDEFAULT, SPACEDEFAULT, DIVIDERDEFAULT, UPLOADDEFAULT, SLIDEDEFAULT, TRANSFERDEFAULT, TREEDEFAULT } from '../../model/attributeInfo';
import { ControlInfo, BoxInfo, ControlType, ShowBoxInfo } from '../../model/boxInfo';
import { CommonService } from '../../service/common.service';
import { FORM_ALERT, FORM_CHECKBOX, FORM_COUNTER, FORM_DATE, FORM_DIVIDER, FORM_INPUT, FORM_LAYOUT, FORM_RADIO, FORM_RATE, FORM_RICHINPUT, FORM_SELECT, FORM_SLIDER, FORM_SPACE, FORM_TIME, FORM_TOGGLE, FORM_TRANSFER, FORM_TREE, FORM_UPLOAD } from '../control-api';
import { ControlBuilder } from '../controlbuilder';

@Component({
  selector: 'form-area',
  templateUrl: './form-area.component.html',
  styleUrls: ['./form-area.component.scss']
})
export class FormAreaComponent implements OnInit, AfterViewInit {

  @ViewChild(FormDragTemplateDirective, {static: false})
  template!: FormDragTemplateDirective;
  @ViewChild("aftershadow",{read: ViewContainerRef})
  aftershadow!:ViewContainerRef;

  @Input("name")
  name!:string;
  @Input("mode")
  mode:string = "op";
  @Input("originalLayout")
  originalLayout!:ShowBoxInfo[];

  ismain!:boolean;
  showOptions:boolean = false;

  @Output()
  onaddrow:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  onremoverow:EventEmitter<string> = new EventEmitter<string>();

  get realLayOut(){
    return this.findTheReallayout(this.commonService.boxLayout,this.name);
  }

  constructor(
    private commonService:CommonService,
    private el:ElementRef,
    private inject:Injector
    ) { }

  ngOnInit(): void {
    this.ismain = this.name == MAINCONTAINER;
    if(this.mode != "op"){
      return;
    }
    this.commonService.formItemClickObservable.subscribe(o => {
      this.realLayOut.forEach(x=>{
        if(x.boxid == o){
          x.selected = !x.selected;
        } else {
          x.selected = false;
        }
      });
      if (o == this.name){
        this.showOptions = !this.showOptions;
      } else {
        this.showOptions = false;
      }
    });
    this.commonService.importObservable.subscribe(o => {
      if(o && o.name == this.name){
        const compName = nanoid();
        const child:ControlBuilder = this.createComponent(compName,o.control);
        const index = this.findCompIndex(this.commonService.shadow);
        const componentRef = this.template.viewContainerRef.createComponent<any>(<any>child.control);
        componentRef.instance.data = child.data;
        this.template.viewContainerRef.insert(componentRef.hostView,index);
        const boxInfo:BoxInfo = {boxid:compName,comp:componentRef};

        if(o.control.control == ControlType.Row){
          boxInfo.layout = [
            {
              name:child.data.defaultvalue[0].name,
              boxInfos:[]
            }
          ];
        }
        this.realLayOut.splice(index,0,boxInfo);
      }
    });

    this.commonService.moveObservable.subscribe(o => {
      if(o == this.name && this.commonService.orginControlId){
        const orginef:BoxInfo = this.removeTheView(this.commonService.boxLayout,this.commonService.orginControlId);
        if(orginef){
          const index = this.findCompIndex(orginef.comp.hostView);
          if(index > -1){
            this.template.viewContainerRef.insert(orginef.comp.hostView,index);
            this.realLayOut.splice(index,0,orginef);
          }
        }
      }
    });

    this.commonService.followObservable.subscribe(o => {
      if(o.name == this.name) {
        this.commonService.boxId = this.name;
        const ef =this.realLayOut.find(x => x.boxid == o.follow.targetboxid);
        let orginef;
        if(o.follow.orginBoxid){
          orginef = this.getTheView(this.commonService.boxLayout, o.follow.orginBoxid)!.comp;
        }
        if(!this.commonService.shadow && !o.follow.orginBoxid){
          this.commonService.shadow = this.template.viewContainerRef.createEmbeddedView(
            this.ismain ? this.template.templateRef : this.commonService.mainshadow);
        }
        const movecomp = orginef?.hostView||this.commonService.shadow;
        if(ef) {
          if(o.follow.position == "before"){
            ef.comp.instance.box.beforeshadow.move(movecomp,0);
          } else {
            if(this.realLayOut.indexOf(ef) == (this.realLayOut.length-1)){
              this.aftershadow.move(movecomp,0);
            } else {
              ef.comp.instance.box.aftershadow.move(movecomp,0);
            }
          }
        } else {
          this.aftershadow.move(movecomp,0);
        }
      }
    });

    this.commonService.cancelEvent.subscribe(o => {
      if(o == this.name){
        this.cancelShadow();
      }
    });

    this.commonService.removeItemClickObservable.subscribe(o => {
      const item = this.realLayOut.find(x => x.boxid == o);
      
      if(item){
        this.realLayOut.splice(this.realLayOut.indexOf(item),1);
        this.template.viewContainerRef.remove(this.template.viewContainerRef.indexOf(item.comp.hostView));
      }
    });
  }

  ngAfterViewInit(){
    if(this.mode == "op"){
      if(this.ismain){
        this.commonService.mainshadow = this.template.templateRef;
       } else {
         fromEvent<PointerEvent>(this.el.nativeElement,"click").subscribe(e=>{
           e.stopPropagation();
           this.commonService.setFormItemClick(this.name);
           this.commonService.attiEvent.emit();
         })
       }
    }
    if(this.originalLayout){
      this.commonService.createComponent(this.originalLayout,this.template.viewContainerRef,this.mode,this.name);
    }
  }

  private createComponent(name:string,controlInfo:ControlInfo):ControlBuilder{
    let child:ControlBuilder;
    switch (controlInfo.control) {
      case ControlType.Input:
        child = new ControlBuilder(this.inject.get<any>(FORM_INPUT).constructor,{name:name,controlname:name,...INPUTDEFAULT,rules:{validators:[]}});
        break;
      case ControlType.RichIput:
        child = new ControlBuilder(this.inject.get<any>(FORM_RICHINPUT).constructor,{name:name,controlname:name,...RICHINPUTDEFAULT,rules:{validators:[]}});
        break;
      case ControlType.Counter:
        child = new ControlBuilder(this.inject.get<any>(FORM_COUNTER).constructor,{name:name,controlname:name,...COUNTERDEFAULT,rules:{validators:[]}});
        break;
      case ControlType.Toggle:
        child = new ControlBuilder(this.inject.get<any>(FORM_TOGGLE).constructor,{name:name,controlname:name,...TOGGLEDEFAULT});
        break;
      case ControlType.Select:
        child = new ControlBuilder(this.inject.get<any>(FORM_SELECT).constructor,{name:name,controlname:name,...SELECTDEFAULT,rules:{validators:[]}});
        break;
      case ControlType.Alert:
        child = new ControlBuilder(this.inject.get<any>(FORM_ALERT).constructor,{name:name,...ALERTDEFAULT});
        break;
      case ControlType.Check:
        child = new ControlBuilder(this.inject.get<any>(FORM_CHECKBOX).constructor,{name:name,controlname:name,...CHECKDEFAULT,rules:{validators:[]}});
        break;
      case ControlType.Radio:
        child = new ControlBuilder(this.inject.get<any>(FORM_RADIO).constructor,{name:name,controlname:name,...RADIODEFAULT,rules:{validators:[]}});
        break;
      case ControlType.Date:
        child = new ControlBuilder(this.inject.get<any>(FORM_DATE).constructor,{name:name,controlname:name,...DATEDEFAULT,rules:{validators:[]}});
        break;
      case ControlType.Time:
        child = new ControlBuilder(this.inject.get<any>(FORM_TIME).constructor,{name:name,controlname:name,...TIMEDEFAULT,rules:{validators:[]}});
        break;
      case ControlType.Rate:
        child = new ControlBuilder(this.inject.get<any>(FORM_RATE).constructor,{name:name,controlname:name,...RATEDEFAULT,rules:{validators:[]}});
        break;
      case ControlType.Space:
        child = new ControlBuilder(this.inject.get<any>(FORM_SPACE).constructor,{name:name,...SPACEDEFAULT});
        break;
      case ControlType.Divider:
        child = new ControlBuilder(this.inject.get<any>(FORM_DIVIDER).constructor,{name:name,...DIVIDERDEFAULT});
        break;
      case ControlType.Upload:
        child = new ControlBuilder(this.inject.get<any>(FORM_UPLOAD).constructor,{name:name,controlname:name,...UPLOADDEFAULT,rules:{validators:[]}});
        break;
      case ControlType.Transfer:
        child = new ControlBuilder(this.inject.get<any>(FORM_TRANSFER).constructor,{name:name,controlname:name,...TRANSFERDEFAULT});
        break;
      case ControlType.Row:
        child = new ControlBuilder(this.inject.get<any>(FORM_LAYOUT).constructor,{name:name,...LAYOUTDEFAULT,defaultvalue:[{name:nanoid(),selected:false,boxInfos:[]}]});
        break;
      case ControlType.Tree:
        child = new ControlBuilder(this.inject.get<any>(FORM_TREE).constructor,{name:name,controlname:name,...TREEDEFAULT});
        break;
      case ControlType.Slide:
        child = new ControlBuilder(this.inject.get<any>(FORM_SLIDER).constructor,{name:name,controlname:name,...SLIDEDEFAULT,rules:{validators:[]}});
        break;
      default:
        child = new ControlBuilder(this.inject.get<any>(FORM_INPUT).constructor,{name:name});
        break;
    }
    return child;
  }

  private findCompIndex(comp:ViewRef):number{
    let index:number = -1;
    if(this.aftershadow.indexOf(comp) >= 0){
      index = this.template.viewContainerRef.length;
    }else{
      this.realLayOut.forEach(v => {
        if(v.comp.hostView != comp){
          if(v.comp.instance.box.beforeshadow.indexOf(comp) >= 0){
            index = this.template.viewContainerRef.indexOf(v.comp.hostView);
            return;
          } else if(v.comp.instance.box.aftershadow.indexOf(comp) >= 0) {
            index = this.template.viewContainerRef.indexOf(v.comp.hostView)+1;
            return;
          }
        }
      });
    }
    return index;
  }

  private cancelShadow():void{
    if(this.commonService.shadow) {
      if(this.aftershadow.indexOf(this.commonService.shadow) >= 0){
        this.aftershadow.clear();
      }else{
        this.realLayOut.forEach(v=>{
          if(v.comp.instance.box.beforeshadow.indexOf(this.commonService.shadow) >= 0){
            v.comp.instance.box.beforeshadow.clear();
            return;
          } if(v.comp.instance.box.aftershadow.indexOf(this.commonService.shadow) >= 0){
            v.comp.instance.box.aftershadow.clear();
            return;
          }
        });
      }
    }
    this.commonService.clearData();
  }
  private findTheReallayout(parentLayout:BoxInfo[],name:string):BoxInfo[]{
    if(this.ismain) {
      return parentLayout;
    }
    let box:{name:string, boxInfos:BoxInfo[]};
    for (let i = 0; i < parentLayout.length; i++) {
      box = this.findTheRealArea(parentLayout[i],name);
      if(box){
        break;
      }
    }
    return box! ? box!.boxInfos : [];
  }

  private findTheRealArea(parentBox:BoxInfo,name:string):{name:string, boxInfos:BoxInfo[]}{
    if(!parentBox.layout){
      return <any>null;
    }
    var findBox = parentBox.layout.find(o => o.name == name);
    if(findBox){
      return findBox;
    } else {
      for (let i = 0; i < parentBox.layout.length; i++) {
        const element = parentBox.layout[i];
        for(let j = 0; j < element.boxInfos.length; j++){
          findBox = this.findTheRealArea(element.boxInfos[j],name);
          if(findBox){
            return findBox;
          }
        }
      }
    }
    return <any>findBox;
  }

  private getTheView(layout:BoxInfo[],boxid:string):BoxInfo{
    const view = layout.find(o => o.boxid == boxid);
    if(view){
      return view; 
    } else {
      for (let i = 0; i < layout.length; i++){
        const element = layout[i];
        if(element.layout){
          for (let j = 0; j < element.layout.length; j++) {
            const box =  this.getTheView(element.layout[j].boxInfos,boxid);
            if(box){
              return box;
            }
          }
        }
      }
    }
    return <any>view;
  }

  private removeTheView(layout:BoxInfo[],boxid:string):BoxInfo{
    let index = -1
    for (let i = 0; i < layout.length; i++) {
      if(layout[i].boxid == boxid){
        index = i;
        break;
      }
    }
    if(index == -1){
      for (let i = 0; i < layout.length; i++){
        if(layout[i].layout){
          for(let j = 0; j < layout[i].layout!.length;j++){
            const box = this.removeTheView(layout[i].layout![j].boxInfos,boxid);
            if(box){
              return box;
            }
          }
        }
      }
    } else {
      return layout.splice(index,1)[0];
    }
    return <any>null;
  }

  addRow(e:any){
    e.stopPropagation();
    this.onaddrow.emit(true);
  }
  removeRow(e:any){
    e.stopPropagation();
    this.onremoverow.emit(this.name);
  }
}
