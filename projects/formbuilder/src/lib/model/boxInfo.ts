import { ComponentRef } from "@angular/core"

export interface ControlInfo{
    control:ControlType
  }

export enum ControlType{
  Input = "Input",
  Select = "select",
  Check = "check",
  Radio = "radio",
  Toggle = "toggle",
  Date = "date",
  Range = "range",
  Time = "time",
  RichIput = "richInput",
  Upload = "upload",
  Alert = "alert",
  Label = "label",
  Divider = "divider",
  Space = "space",
  Rate = "rate",
  Counter = "counter",
  Row = "row",
  Slide = "slide",
  Transfer = "transfer",
  Tree = "tree"
}

export interface BoxInfo {
    boxid:string,
    comp:ComponentRef<any>,
    selected?:boolean,
    layout?:[{name:string,boxInfos:BoxInfo[]}]
}

export interface ShowBoxInfo {
  data:any,
  boxid:string,
  layout?:Map<string,ShowBoxInfo[]>
}
