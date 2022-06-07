import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// DevUI部分组件依赖angular动画，需要引入animations模块
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponentComponent } from './form-component/form-component.component';
import { FormCanvasComponent } from './form-canvas/form-canvas.component';
import { FormAttributeComponent } from './form-attribute/form-attribute.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { CommonService } from './service/common.service';
import { FormDragDirective } from './formdirective/form-drag.directive';
import { FormDropDirective } from './formdirective/form-drop.directive';
import { 
  LayoutModule,
  FormModule,
  TextInputModule,
  TabsModule,
  TextareaModule,
  ToggleModule,
  SelectModule, 
  InputNumberModule,
  ButtonModule,
  ModalModule,
  AlertModule,
  CheckBoxModule,
  RadioModule,
  DatepickerModule,
  TimePickerModule,
  UploadModule,
  RateModule,
  ProgressModule,
  ToastModule,
  DatepickerProModule,
  SliderModule,
  TransferModule,
  CascaderModule
 } from 'ng-devui';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormBoxComponent } from './control/form-box/form-box.component';
import { FormInputComponent } from './control/form-input/form-input.component';
import { FormDragTemplateDirective } from './formdirective/form-drag-template.directive';
import { FormRichinputComponent } from './control/form-richinput/form-richinput.component';
import { FormCounterComponent } from './control/form-counter/form-counter.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { FormToggleComponent } from './control/form-toggle/form-toggle.component';
import { FormAreaComponent } from './control/form-area/form-area.component';
import { FormLayoutComponent } from './control/form-layout/form-layout.component';
import { FormSelectComponent } from './control/form-select/form-select.component';
import { FormCodeEditorComponent } from './form-code-editor/form-code-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { FormAlertComponent } from './control/form-alert/form-alert.component';
import { FormRadioComponent } from './control/form-radio/form-radio.component';
import { FormCheckboxComponent } from './control/form-checkbox/form-checkbox.component';
import { FormUploadComponent } from './control/form-upload/form-upload.component';
import { FormRateComponent } from './control/form-rate/form-rate.component';
import { FormTimeComponent } from './control/form-time/form-time.component';
import { FormDateComponent } from './control/form-date/form-date.component';
import { FormSpaceComponent } from './control/form-space/form-space.component';
import { FormDividerComponent } from './control/form-divider/form-divider.component';
import { FormSliderComponent } from './control/form-slider/form-slider.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormTransferComponent } from './control/form-transfer/form-transfer.component';
import { FormTreeComponent } from './control/form-tree/form-tree.component';
import { FORM_ALERT, FORM_CHECKBOX, FORM_COUNTER, FORM_DATE, FORM_DIVIDER, FORM_INPUT, FORM_LAYOUT, FORM_RADIO, FORM_RATE, FORM_RICHINPUT, FORM_SELECT, FORM_SLIDER, FORM_SPACE, FORM_TIME, FORM_TOGGLE, FORM_TRANSFER, FORM_TREE, FORM_UPLOAD } from './control/control-api';
@NgModule({
  declarations: [
    FormComponentComponent,
    FormCanvasComponent,
    FormAttributeComponent,
    FormBuilderComponent,
    FormDragDirective,
    FormDropDirective,
    FormBoxComponent,
    FormInputComponent,
    FormDragTemplateDirective,
    FormRichinputComponent,
    FormCounterComponent,
    FormPreviewComponent,
    FormToggleComponent,
    FormAreaComponent,
    FormLayoutComponent,
    FormSelectComponent,
    FormCodeEditorComponent,
    FormAlertComponent,
    FormRadioComponent,
    FormCheckboxComponent,
    FormUploadComponent,
    FormRateComponent,
    FormTimeComponent,
    FormDateComponent,
    FormSpaceComponent,
    FormDividerComponent,
    FormSliderComponent,
    FormTransferComponent,
    FormTreeComponent
  ],
  exports:[
    FormBuilderComponent,
    FormPreviewComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormModule,
    TextInputModule,
    LayoutModule,
    TabsModule,
    FormsModule,
    TextareaModule,
    ToggleModule,
    SelectModule,
    CKEditorModule,
    InputNumberModule,
    ButtonModule,
    ModalModule,
    CodemirrorModule,
    HttpClientModule,
    AlertModule,
    CheckBoxModule,
    RadioModule,
    DatepickerModule,
    TimePickerModule,
    UploadModule,
    RateModule,
    ProgressModule,
    ToastModule,
    DatepickerProModule,
    SliderModule,
    ReactiveFormsModule,
    TransferModule,
    CascaderModule
  ],
  providers:[
    CommonService,
    {
      provide:FORM_ALERT,
      useClass:FormAlertComponent
    },
    {
      provide:FORM_CHECKBOX,
      useClass:FormCheckboxComponent
    },
    {
      provide:FORM_COUNTER,
      useClass:FormCounterComponent
    },
    {
      provide:FORM_DATE,
      useClass:FormDateComponent
    },
    {
      provide:FORM_DIVIDER,
      useClass:FormDividerComponent
    },
    {
      provide:FORM_INPUT,
      useClass:FormInputComponent
    },
    {
      provide:FORM_LAYOUT,
      useClass:FormLayoutComponent
    },
    {
      provide:FORM_RADIO,
      useClass:FormRadioComponent
    },
    {
      provide:FORM_RATE,
      useClass:FormRateComponent
    },
    {
      provide:FORM_RICHINPUT,
      useClass:FormRichinputComponent
    },
    {
      provide:FORM_SELECT,
      useClass:FormSelectComponent
    },
    {
      provide:FORM_SLIDER,
      useClass:FormSliderComponent
    },
    {
      provide:FORM_SPACE,
      useClass:FormSpaceComponent
    },
    {
      provide:FORM_TIME,
      useClass:FormTimeComponent
    },
    {
      provide:FORM_TOGGLE,
      useClass:FormToggleComponent
    },
    {
      provide:FORM_TRANSFER,
      useClass:FormTransferComponent
    },
    {
      provide:FORM_TREE,
      useClass:FormTreeComponent
    },
    {
      provide:FORM_UPLOAD,
      useClass:FormUploadComponent
    }
  ]
})
export class FormbuilderModule { }
