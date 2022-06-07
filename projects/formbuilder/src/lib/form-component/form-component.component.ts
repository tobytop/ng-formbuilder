import { Component, OnInit } from '@angular/core';
import { ControlInfo, ControlType } from '../model/boxInfo';

interface ControlItem{
  icon:string,
  text:string,
  controlinfo:ControlInfo
}

@Component({
  selector: 'form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public formcontrollers:ControlItem[]=[
    {icon:"fc-icon icon-input",text:"输入框", controlinfo : {
        control:ControlType.Input
    }},
    {icon:"fc-icon icon-editor",text:"富文本", controlinfo : {
      control:ControlType.RichIput
    }},
    {icon:"fc-icon icon-select",text:"下拉框", controlinfo : {
      control:ControlType.Select
    }},
    {icon:"fc-icon icon-number",text:"计数器", controlinfo : {
      control:ControlType.Counter
    }},
    {icon:"fc-icon icon-checkbox",text:"多选框", controlinfo : {
      control:ControlType.Check
    }},
    {icon:"fc-icon icon-radio",text:"单选框", controlinfo : {
      control:ControlType.Radio
    }},
    {icon:"fc-icon icon-switch",text:"开关", controlinfo : {
      control:ControlType.Toggle
    }},
    {icon:"fc-icon icon-date",text:"日期选择器", controlinfo : {
      control:ControlType.Date
    }},
    {icon:"fc-icon icon-time",text:"时间选择器", controlinfo : {
      control:ControlType.Time
    }},
    {icon:"fc-icon icon-upload",text:"上传", controlinfo : {
      control:ControlType.Upload
    }},
    {icon:"fc-icon icon-rate",text:"评分", controlinfo : {
      control:ControlType.Rate
    }},
    {icon:"fc-icon icon-slider",text:"滑块", controlinfo : {
      control:ControlType.Slide
    }},
    {icon:"fc-icon icon-transfer",text:"穿梭框", controlinfo : {
      control:ControlType.Transfer
    }},
    {icon:"fc-icon icon-cascader",text:"树形选择器", controlinfo : {
      control:ControlType.Tree
    }}
   ];
  public assistcontrollers:ControlItem[]= [
    {icon:"fc-icon icon-alert",text:"提示", controlinfo : {
      control:ControlType.Alert
    }},
    // {icon:"fc-icon icon-span",text:"文字", controlinfo : {
    //   control:ControlType.Label
    // }},
    {icon:"fc-icon icon-divider",text:"分割线", controlinfo : {
      control:ControlType.Divider
    }},
    {icon:"fc-icon icon-space",text:"间距", controlinfo : {
      control:ControlType.Space
    }},
    {icon:"fc-icon icon-row",text:"栅格布局", controlinfo : {
      control:ControlType.Row
    }},
  ];

}
