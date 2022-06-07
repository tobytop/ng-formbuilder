import { Component, OnInit } from '@angular/core';
import { FormLayout, ModalService } from 'ng-devui';
import { FormCodeEditorComponent } from '../form-code-editor/form-code-editor.component';
import { AttributeInfo } from '../model/attributeInfo';
import { ControlType } from '../model/boxInfo';
import { CommonService } from '../service/common.service';

@Component({
  selector: ' form-attribute',
  templateUrl: './form-attribute.component.html',
  styleUrls: ['./form-attribute.component.scss']
})
export class FormAttributeComponent implements OnInit {

  controlType = ControlType;

  activeLayout!:ControlType ;
  tab1acticeID: string | number = 'tab2';
  isDisable:boolean = true;
  layoutDirection: FormLayout = FormLayout.Vertical;
  alerttype = ["success","danger","warning","info"];
  direction = ["row","column"];
  datetype = ["date","range"];
  dateFormat = ["y/MM/dd",'y/MM/dd HH:mm:ss', 'y-MM-dd HH:mm:ss', 'yy.MM.dd HH:mm', 'MM/dd/y HH:mm:ss', 'MM/dd/yy HH:mm'];
  timeFormat = ['hh:mm:ss', 'mm:HH:SS', 'hh:mm', 'MM:ss'];
  alignFormat = [{label:"居中",value:"is-center"}, {label:"居左",value:"is-left"},{label:"居右",value:"is-right"}];
  responseType = ["arraybuffer","blob","json","text"];
  validatorType = ["请选择","required","minlength","maxlength","min","max","email","pattern","whitespace"];

  validators:any = [];
  msgs: Array<Object> = [];
  formData:any;

  layoutOptions = [
    {
      value:"horizontal",
      name:"水平布局"
    },
    {
      value:"vertical",
      name:"垂直布局"
    },
    {
      value:"columns",
      name:"纵列布局"
    },
  ];
  labelSizeOptions =[
    {
      value:"sm",
      name:"小号"
    },
    {
      value:"",
      name:"中等"
    },
    {
      value:"lg",
      name:"大号"
    },
  ];
  labelAlignOptions =[
    {
      value:"start",
      name:"左对齐"
    },
    {
      value:"center",
      name:"居中"
    },
    {
      value:"end",
      name:"右对齐"
    },
  ]
  methodtype=["GET","POST","PUT","DELETE"];

  canvasInfo = {
    layout:this.layoutOptions[1],
    labelSize:this.labelSizeOptions[1],
    labelAlign:this.labelAlignOptions[0]
  };
  
  constructor(
    private commonService:CommonService,
    private modalService: ModalService,
    ) { }

  public ngOnInit(): void {
    this.commonService.attiEvent.subscribe(o=>{
      this.formData = o;
      this.validators = [];
      if(o && o.itemselected && o.controltype != ControlType.Row){
        this.tab1acticeID = "tab1";
        this.isDisable = false;
        this.activeLayout= (<AttributeInfo>o).controltype;
        const rules = o.rules;
        if(rules && rules.validators && rules.validators.length>0) {
          for (let index = 0; index < rules.validators.length; index++) {
            const key = Object.keys(rules.validators[index])[0];
            const value =Object.values(rules.validators[index])[0];
            this.validators.push({
              validatortype:{label:key,disabled:false},
              oldvalidatortype:"请选择",
              value:value,
              validatorOptions:this.validatorType.filter(x=>this.showOptions(x)).map(x=>{
                return {label:x,disabled:false}
              })
            });
          }
        } else {
          this.validators.push({
            validatortype:{label:"请选择",disabled:false},oldvalidatortype:"请选择",validatorOptions:this.validatorType.filter(x=>this.showOptions(x)).map(o=>{
            return {label:o,disabled:false}
          })
        });
        }
      } else {
        this.tab1acticeID = "tab2";
        this.activeLayout = <any>null;
        this.isDisable = true;
      }
    });
    this.commonService.removeItemClickObservable.subscribe(()=>{
      this.activeLayout = <any>null;
      this.tab1acticeID = "tab2";
      this.isDisable = true;
    })
  }

  onchange(){
    this.commonService.changeFormLayout.emit({
      layout:<any>this.canvasInfo.layout.value,
      labelSize:<any>this.canvasInfo.labelSize.value,
      labelAlign:<any>this.canvasInfo.labelAlign.value
    });
  }
  showCodeEditor(setValue:any,type:string){
    const results = this.modalService.open({
      id: 'dialog-service',
      width: '650px',
      component: FormCodeEditorComponent,
      backdropCloseable: true,
      data: {
        code:JSON.stringify(setValue),
        onClose: (event:any) => {
          results.modalInstance.hide();
        },
        showerror:(o:any)=>{this.msgs = o;},
        change:(o:any)=>{
          switch (type) {
            case "options":
              this.formData.options = JSON.parse(o);
              break;
            case "postdata.data":
              this.formData.postdata.data = JSON.parse(o);
              break;
            case "postdata.head":
              this.formData.postdata.head = JSON.parse(o);
              break;
            case "uploadOptions.additionalParameter":
              this.formData.uploadOptions.additionalParameter = JSON.parse(o);
              break;
            case "uploadOptions.headers":
              this.formData.uploadOptions.headers = JSON.parse(o);
              break;
            default:
              break;
          }
        }
      }
    });
  }
  onTestData(e:string){
    this.commonService.testEvent.emit(e);
  }
  onChangeDateTypeOrFormat(){
    if(this.formData.datetype == "date"){
      this.formData.placeholder = this.formData.dateFormat;
    } else {
      this.formData.placeholder = this.formData.dateFormat + " - "+this.formData.dateFormat;
    }
    this.formData.defaultvalue = "";
  }

  onChangeTimeFormat(){
    this.formData.placeholder = this.formData.format;
  }
  onChangeAlignFormat(e:any){
    this.formData.align = e.value;
  }

  onAddValidationRule(){
    var options = this.validatorType.filter(x=>this.showOptions(x)).map(o => {
      var isDisabled = false;
      for (let index = 0; index < this.validators.length; index++) {
        const element = this.validators[index].validatortype;
        if(element.label == o && element.label!="请选择"){
          isDisabled = true;
          break;
        }
      }
      return {label:o,disabled:isDisabled};
    })
    this.validators.push({validatortype:{label:"请选择",disabled:false},oldvalidatortype:"请选择",validatorOptions:options});
  }
  onRemoveRule(value:number){
    const rule = this.validators.splice(value,1);
    if(rule[0].validatortype.label != "请选择"){
      this.changeOption(o => {
        var returnValue =false;
        if(o.label == rule[0].validatortype.label){
          o.disabled = false;
          returnValue = true;
        }
        return returnValue;
      });
    }
  }
  onChangeItem(value:any,item:any){
    switch (value.label) {
      case "required":
      case "email":
      case "whitespace":
        item["value"] = true;
        break;
      case "minlength":
      case "maxlength":
      case "min":
      case "max":
        item["value"] = 0;
        break;
      default:
        item["value"] = "";
        break;
    }
    this.changeTheValidateRules(item,value.label);
    this.changeOption(o => {
      if(o.label==value.label && o.label !="请选择"){
        o.disabled = true;
      }
      if(o.label == item["oldvalidatortype"]){
        o.disabled = false;
      }
      return false;
    });
    item["oldvalidatortype"] = value.label;
  }

  onChangeValidateValue(item:any){
    this.changeTheValidateRules(item,item.validatortype.label)
  }

  private changeOption(fn:(o:any)=>boolean):void{
    for (let i = 0; i < this.validators.length; i++) {
      const options = this.validators[i].validatorOptions;
      for (let j = 0; j < options.length; j++) {
        const element = options[j];
        if(fn(element)){
          break;
        }
      }
    }
  }

  private changeTheValidateRules(item:any,value:string):void{
    const rules = this.formData.rules.validators;
    if(item["oldvalidatortype"] != "请选择" && value != "请选择"){
      const rule = this.findRule(item);
      delete rule[item["oldvalidatortype"]];
      if(value == "pattern"){
        rule[value] = new RegExp(item["value"]);
      }else{
        rule[value] = item["value"];
      }
    } else if(value != "请选择" && item["oldvalidatortype"] == "请选择"){
      var obj = Object.create(null);
      if(value == "pattern"){
        obj[value] = new RegExp(item["value"]);
      }else{
        obj[value]= item["value"];
      }
      rules.push(obj);
    }else{
      var index =0;
      this.findRule(item,o=>{
        index = o;
      });
      
      if(index == 0){
        rules.splice(-1,1);
      }else {
        rules.splice(index,1);
      }
    }
  }

  private showOptions(option:string):boolean{
    switch (this.activeLayout) {
      case ControlType.Input:
        return true;
      case ControlType.Select:
        return option=="required"||option=="min"||option=="max"||option =="请选择"
      default:
        return option=="required"||option =="请选择";
    }
  }
  private findRule(item:any,fn:(o:number)=>void = <any>null):any{
    const rules = this.formData.rules.validators;
    var rule:any = {};
    for (let index = 0; index < rules.length; index++) {
      const element = <{}>rules[index];
      if(Object.hasOwnProperty.bind(element)(item["oldvalidatortype"])){
        rule = element;
        if(fn!=null){
          fn(index);
        }
        break;
      }
    }
    return rule;
  }
}
