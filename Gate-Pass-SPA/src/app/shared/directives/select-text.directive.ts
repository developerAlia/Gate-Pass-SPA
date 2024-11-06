import { Directive, ElementRef, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[ngModel][psSelectText]',
  providers: [NgModel],
  host: {
    '(ngModelChange)': 'onInputChange($event)'
  }
})
export class SelectTextDirective implements OnChanges {
  @Input('psSelectText') selectedText: string;
  @Input('ngModel') selectedModel: NgModel;

  constructor(private el: ElementRef, public model: NgModel, private viewContainerRef: ViewContainerRef) { }


  ngOnChanges(changes: SimpleChanges) {
    console.log(this.el)
    if (changes.selectedModel) {
      setTimeout(() => {
        this.viewContainerRef['_view'].component[this.selectedText] =
          this.el.nativeElement.selectedOptions[0].text;
      }, 0);
    }
  }

  onInputChange(event) {
    // Only get selected change
  }
}
