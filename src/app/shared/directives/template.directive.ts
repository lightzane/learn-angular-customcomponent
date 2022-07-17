import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myTemplate]'
})
export class TemplateDirective {

  /** The name for this `ng-template` to be referred later in a custom component */
  @Input('myTemplate') name: string;

  constructor(public template: TemplateRef<any>) { }

  getType(): string {
    return this.name;
  }

}
