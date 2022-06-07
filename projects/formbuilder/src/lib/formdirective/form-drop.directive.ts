import { Directive, ElementRef, HostListener } from '@angular/core';
import { ControlInfo } from '../model/boxInfo';
import { FollowItem } from '../model/followItem';
import { CommonService } from '../service/common.service';

@Directive({
  selector: '[formdrop]'
})
export class FormDropDirective {

  constructor(
    public el:ElementRef,
    private commonService:CommonService
    ) { }

    @HostListener("drop",['$event'])
    onDrop(e:any){
      e.stopPropagation();
      if(e.dataTransfer.effectAllowed == "all"){
        if(e.dataTransfer.getData("controlinfo")){
          const data = <ControlInfo>JSON.parse(e.dataTransfer.getData("controlinfo"));
          this.commonService.setImportComp({
            control:data,
            name:this.el.nativeElement.dataset.boxId
          });
        }
      } else if(this.commonService.boxId){
        this.commonService.setMoveSubject(this.commonService.boxId);
      } else {
        this.commonService.clearData();
      }
    }
    @HostListener("dragenter",['$event'])
    onDragenter(e:any){
      e.preventDefault();
    }
    
    @HostListener("dragover",['$event'])
    onDragover(e:any){
      e.preventDefault();
      e.stopPropagation();
      var boxId:string = e.target.dataset.boxId;
      if(boxId && boxId != "shadowbox"){
        const followItem:FollowItem = {targetboxid:boxId,position: "none"};

        if(this.commonService.previousPosition){
          if(this.commonService.previousPosition.y < e.y){
              followItem.position = "after";
          } else if(this.commonService.previousPosition.y > e.y){
              followItem.position = "before";
          }
        } else {
          followItem.position = "before";
        }
        this.commonService.previousPosition = {x:e.x,y:e.y};
        if(followItem.position=="none"){
          return;
        }
        
        if(this.commonService.orginControlId){
          if(this.commonService.orginControlId === boxId){
            return;
          }
          followItem.orginBoxid = this.commonService.orginControlId;
        }
        this.commonService.setFollowComp({
          follow:followItem,
          name:this.el.nativeElement.dataset.boxId
        });
      }
    }
}
