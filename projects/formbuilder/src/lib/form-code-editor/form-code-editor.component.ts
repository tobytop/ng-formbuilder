import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CodemirrorComponent } from '@ctrl/ngx-codemirror';
import { js_beautify } from 'js-beautify';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';
import{ JSHINT } from 'jshint';
import { LineWidget } from 'codemirror';

(<any>window).JSHINT = JSHINT;
@Component({
  selector: 'app-form-code-editor',
  templateUrl: './form-code-editor.component.html',
  styleUrls: ['./form-code-editor.component.scss']
})
export class FormCodeEditorComponent implements OnInit {

  @Input()
  data!:any;

  content!:string;
  options:any = {
    gutters: ['CodeMirror-lint-markers'],
    lineNumbers: true,
    lint: true,
    line: true,
    tabSize: 2,
    lineWrapping: true,
    theme: 'material',
    mode: 'application/json'
  }

  parent!: HTMLElement;
  constructor(private elr: ElementRef) {}

  @ViewChild("editor", {static: false})
  codeEditor!:CodemirrorComponent;

  widgets:LineWidget[] = [];

  ngOnInit(): void {
    this.content = js_beautify(this.data.code);
    this.parent = this.elr.nativeElement.parentElement;
  }

  close(e:any){
    if(JSHINT(this.content)){
      this.data.change(this.content);
      this.data.onClose(e);
    }else {
      this.showToast();
    }
  }
  showToast(){
    var output = "Check format error:\n\n";
    for (var i in JSHINT.errors) {
      var err = JSHINT.errors[i];
      if (null != err) {
          output += err.line + '[' + err.character + ']: ' + err.reason + '\n';
      } else {
          output += "Check format unknown error:\n";
      }
    }
    this.data.showerror([{ severity: 'warn', content: output }]);
  }

  cancel(e:any){
    this.data.onClose(e);
  }
}
