import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlInfo } from '../model/boxInfo';
import { CommonService } from '../service/common.service';

@Directive({
  selector: '[formdrag]'
})
export class FormDragDirective implements OnInit {

  constructor(private el:ElementRef,private commonService:CommonService) { }
  @HostListener("mousedown")
  onMouseDown():void{
    this.el.nativeElement.draggable= true;
  }

  @HostListener("dragstart",["$event"])
  onDragstart(e:any):void{
    e.dataTransfer.setData("controlinfo", JSON.stringify(this._controlinfo));
    this.commonService.setShowShadows({isshow:true,name:""});
  }
  @HostListener("dragend")
  onDragend():void{
    this.el.nativeElement.removeAttribute("draggable");
    this.commonService.cancelEvent.emit(this.areaname);
    this.commonService.setShowShadows({isshow:false,name:""});
  }
  private areaname:string = "";
  ngOnInit(): void {
    this.commonService.followObservable.subscribe(o=>{
      this.areaname = o.name;
    })
  }
  private _controlinfo: ControlInfo = <any>{};

  public get controlInfo(): ControlInfo {
    return this._controlinfo;
  }

  @Input("controlinfo")
  public set controlInfo(prop:ControlInfo){
      this._controlinfo = prop;
  }
}
