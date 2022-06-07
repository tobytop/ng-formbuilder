import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlType } from '../../model/boxInfo';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'form-box',
  templateUrl: './form-box.component.html',
  styleUrls: ['./form-box.component.scss']
})
export class FormBoxComponent implements OnInit {

  constructor(
    private commonService:CommonService
    ) { }

  ngOnInit(): void {
    this.commonService.showShadowObservable.subscribe(o => {
      if(this.controltype != ControlType.Row||o.name == this.name) {
        this.isShow = o.isshow;
      }
    });
    this.commonService.formItemClickObservable.subscribe(o => {
      if(o == this.name){
        this.showOptions = !this.showOptions;
        this.addcss = this.showOptions ? "selected": "";
      }else{
        this.showOptions = false;
        this.addcss = "";
      }
    });
    this.commonService.followObservable.subscribe(o=>{
      if(this.dragClass == "drag-fade"){
        this.areaname = o.name;
      }
    })
  }
  public dragClass:string = "";
  public addcss:string = "";
  public canMove:boolean = false;
  @ViewChild("move",{static:true})
  moveIcon!:ElementRef;

  @Input()
  mainCarry!: TemplateRef<any>;
  @Input()
  name!:string;
  @Input()
  controltype!:ControlType;
  @Output()
  controlclick:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  additionalcss:string = "";

  @ViewChild("miancontrol",{read: ViewContainerRef})
  public miancontrol!:ViewContainerRef;

  @ViewChild("beforeshadow",{read: ViewContainerRef})
  public beforeshadow!:ViewContainerRef;
  @ViewChild("aftershadow",{read: ViewContainerRef})
  public aftershadow!:ViewContainerRef;
  
  public isShow!:boolean;
  public showOptions:boolean = false;
  private areaname:string = "";

  ondragstart(ev:any):void{
    ev.stopPropagation();
    ev.dataTransfer.effectAllowed = "move";
    this.dragClass = "drag-fade";
    this.commonService.orginControlId = this.name;
    this.commonService.setShowShadows({isshow:true,name:this.name});
  }

  ondragend(ev:any):void{
    ev.stopPropagation();
    this.dragClass = "";
    this.commonService.setShowShadows({isshow:false,name:this.name});
    this.commonService.cancelEvent.emit(this.areaname);
    this.canMove = false;
  }

  onClick(ev:any):void{
    ev.stopPropagation();
    this.commonService.setFormItemClick(this.name);
    this.controlclick.emit(this.showOptions);
  }

  onMousedown(ev:any){
    ev.stopPropagation();
    this.canMove = true;
  }
  onRemoveClick(ev:any){
    ev.stopPropagation();
    this.commonService.setRemoveItemClick(this.name);
  }
}
