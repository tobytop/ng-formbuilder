import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[formdragtemplate]'
})
export class FormDragTemplateDirective {

  constructor(public viewContainerRef: ViewContainerRef,public templateRef:TemplateRef<any>) { }
}
