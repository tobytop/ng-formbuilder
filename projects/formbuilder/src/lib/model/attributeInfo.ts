import { DValidateRules, FormLayout, IFileOptions, IUploadOptions } from "ng-devui"
import { ControlType } from "./boxInfo"
import { js_beautify } from 'js-beautify'

export interface AttributeInfo {
    name:string,
    controltype:ControlType,
    controlname:string,
    mode:string,
    label:string,
    required:boolean,
    help:boolean,
    helptip?:string,
    defaultvalue:any,
    itemselected:boolean,
    disabled:boolean,
    rules:{}
}
export interface InputInfo extends AttributeInfo {
  placeholder:string
}
export interface RichIputInfo extends AttributeInfo {
  height:number,
}
export interface SelectInfo extends AttributeInfo {
  placeholder:string,
  filter:string,
  options:any,
  dataType:string,
  postdata:any,
  multiple:boolean
}
export interface CounterInfo extends AttributeInfo {
  min:number,
  max:number,
  step:number,
  unit:string
}

export interface AlertInfo extends AttributeInfo {
  alerttype:string,
  closeable:boolean
}
export interface CheckInfo extends AttributeInfo {
  options:any,
  filter:string,
  direction:string,
  isshowtitle:boolean,
  dataType:string,
  postdata:any
}

export interface RadioInfo extends AttributeInfo {
  options:any,
  direction:string,
  dataType:string,
  postdata:any
}
export interface RateInfo extends AttributeInfo {
  allowhalf:boolean
}

export interface SpaceInfo extends AttributeInfo {
  height:number
}
export interface DateInfo extends AttributeInfo {
  datetype:string,
  showtime:boolean,
  dateFormat:string,
  placeholder:string
}
export interface TimeInfo extends AttributeInfo {
  format:string,
  placeholder:string
}
export interface DividerInfo extends AttributeInfo {
  align:string
}
export interface UploadInfo extends AttributeInfo {
  uploadOptions:IUploadOptions,
  fileOptions:IFileOptions,
  uploadedFiles:Array<Object>,
  filePath:string,
  showTip:boolean,
  uploadtype:string
}
export interface TransferInfo extends AttributeInfo {
  options:[],
  dataType:string,
  postdata:any,
  source:string,
  target:string
}
export interface SlideInfo extends AttributeInfo {
  min:number,
  max:number,
  step:number
}
export interface TreeInfo extends AttributeInfo {
  placeholder:string,
  options:any,
  dataType:string,
  postdata:any,
}
export interface CanvasInfo {
  layout:FormLayout,
  labelSize:'sm' | '' | 'lg',
  labelAlign:'start' | 'center' | 'end',
}

const CommonDefault = {
    required:false,
    help:false,
    mode:"op",
    disabled:false
}
export const INPUTDEFAULT = {
    label:"文本框",
    controltype:ControlType.Input,
    defaultvalue:"",
    placeholder:"",
    ...
    CommonDefault
  }
export const DATEDEFAULT = {
    label:"日期选择",
    controltype:ControlType.Date,
    defaultvalue:"",
    datetype:"date",
    showtime:false,
    dateFormat:"y/MM/dd",
    placeholder:"y/MM/dd",
    ...
    CommonDefault
  }

  export const TIMEDEFAULT = {
    label:"时间选择",
    controltype:ControlType.Time,
    defaultvalue:"",
    format:"hh:mm:ss",
    placeholder:"hh:mm:ss",
    ...
    CommonDefault
  }
  
  export const RICHINPUTDEFAULT = {
    label:"富文本框",
    controltype:ControlType.RichIput,
    height:200,
    defaultvalue:"",
    ...
    CommonDefault
  }

  export const COUNTERDEFAULT = {
    label:"计数器",
    controltype:ControlType.Counter,
    defaultvalue:0,
    min:0,
    max:200,
    step:1,
    unit:"",
    ...
    CommonDefault
  }
  export const LAYOUTDEFAULT = {
    label:"布局",
    controltype:ControlType.Row,
    ...
    CommonDefault
  }
  export const RATEDEFAULT = {
    label:"评分",
    controltype:ControlType.Rate,
    defaultvalue:0,
    allowhalf:false,
    ...
    CommonDefault
  }
  export const TOGGLEDEFAULT = {
    label:"开关",
    controltype:ControlType.Toggle,
    ...
    CommonDefault
  }
  export const DIVIDERDEFAULT = {
    label:"请输入",
    controltype:ControlType.Divider,
    align:"is-center",
    alignvalue:{label:"居中",value:"is-center"},
    ...
    CommonDefault
  }

  export const CANVASDEFAULT:CanvasInfo = {
    layout:FormLayout.Vertical,
    labelAlign:<any>"",
    labelSize:<any>"start"
  }
  export const SELECTDEFAULT = {
    label:"下拉框",
    controltype:ControlType.Select,
    defaultvalue:"",
    placeholder:"请选择",
    options:
    [
      {"label":"label1","value":"value1"},
      {"label":"label2","value":"value2"}
    ],
    filter:"value",
    dataType:"static",
    postdata:{
      url:"",
      method:"GET",
      data:{},
      head:{},
      function:js_beautify("function (res){return res.data;}")
    },
    multiple:false,
    ...
    CommonDefault
  }

  export const ALERTDEFAULT = {
    label:"请填写",
    controltype:ControlType.Alert,
    alerttype:"info",
    closeable:false,
    ...
    CommonDefault
  }

  export const CHECKDEFAULT = {
    label:"多选框",
    controltype:ControlType.Check,
    direction:"row",
    isshowtitle:true,
    options:
    [
      {"label":"label1","value":"value1",disabled:true},
      {"label":"label2","value":"value2"}
    ],
    filter:"value",
    dataType:"static",
    postdata:{
      url:"",
      method:"GET",
      data:{},
      head:{},
      function:js_beautify("function (res){return res.data;}")
    },
    ...
    CommonDefault
  }
  export const RADIODEFAULT = {
    label:"多选框",
    controltype:ControlType.Radio,
    direction:"row",
    isshowtitle:true,
    options:
    [
      "label1",
      "label"
    ],
    dataType:"static",
    postdata:{
      url:"",
      method:"GET",
      data:{},
      head:{},
      function:js_beautify("function (res){return res.data;}")
    },
    ...
    CommonDefault
  }

  export const SPACEDEFAULT = {
    controltype:ControlType.Space,
    height:20,
    ...
    CommonDefault
  }
  export const UPLOADDEFAULT = {
    label:"上传",
    controltype:ControlType.Upload,
    fileOptions:{
      accept: '.png,.zip',
      multiple: false
    },
    uploadOptions:{
      uri: '/upload',
      headers: {},
      additionalParameter: {},
      maximumSize: 0.5,
      method: 'POST',
      fileFieldName: 'dFile',
      withCredentials: true,
      responseType: 'json'
    },
    uploadedFiles:[],
    filePath:"name",
    uploadtype:"single",
    ...
    CommonDefault
  }
  export const SLIDEDEFAULT = {
    label:"滑块",
    controltype:ControlType.Slide,
    defaultvalue:0,
    min:0,
    max:200,
    step:1,
    ...
    CommonDefault
  }
  export const TRANSFERDEFAULT = {
    label:"穿梭框",
    controltype:ControlType.Transfer,
    options:[
      { name: 'Option1(tranfer disabled)', value: 1, id: 1 },
      { name: 'Option2', value: 2, id: 2 },
      { name: 'Option3', value: 3, id: 3, disabled: true },
      { name: 'Option4', value: 3, id: 4 },
      { name: 'Option5', value: 3, id: 5 },
      { name: 'Option6', value: 3, id: 6 },
      { name: 'Option7', value: 3, id: 7 },
      { name: 'Option8', value: 3, id: 8 },
      { name: 'Option9', value: 3, id: 9 },
      { name: 'Option10', value: 3, id: 10, disabled: true },
      { name: 'Option11', value: 3, id: 11 },
      { name: 'Option12', value: 3, id: 12 },
      { name: 'Option13', value: 3, id: 13 },
      { name: 'Option14', value: 3, id: 14 },
      { name: 'Option15', value: 3, id: 15 },
      { name: 'Option16', value: 3, id: 16 },
      { name: 'Option17', value: 3, id: 17 },
      { name: 'Option18', value: 3, id: 18 },
      { name: 'Option19', value: 3, id: 19 },
    ],
    defaultvalue:[],
    dataType:"static",
    postdata:{
      url:"",
      method:"GET",
      data:{},
      head:{},
      function:js_beautify("function (res){return res.data;}")
    },
    source:"源头",
    target:"目标",
    ...
    CommonDefault
  }
  export const TREEDEFAULT = {
    label:"树形选择框",
    controltype:ControlType.Tree,
    placeholder:"请选择",
    defaultvalue:null,
    dataType:"static",
    options:
    [
      {
        label: 'option1',
        value : 1,
      },
      {
        label: 'option2',
        value : 2,
      },
      {
        label: 'option3',
        value : 3,
        children: [],
        isLeaf: true,
        disabled: true
      }
    ],
    postdata:{
      url:"",
      method:"GET",
      data:{},
      head:{},
      function:js_beautify("function (res){return res.data;}")
    },
    ...
    CommonDefault
  }
  export const MAINCONTAINER ="mainarea";