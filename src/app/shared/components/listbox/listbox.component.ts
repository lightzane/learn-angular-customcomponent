import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { TemplateDirective } from '@my/shared';

@Component({
  selector: 'my-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListboxComponent implements AfterContentInit {

  @Input() header: string;

  @Input() options: any[];
  /** A field/prop of the options to be used to display */
  @Input() optionLabel: any;

  @Input() emptyMessage: string = 'No results found';

  @Input() headerTemplate: TemplateRef<TemplateDirective>;

  @Input() itemTemplate: TemplateRef<TemplateDirective>;

  @ContentChildren(TemplateDirective) templates: QueryList<TemplateDirective>;

  constructor() { }

  ngAfterContentInit(): void {
    this.templates.forEach((tmpl8) => {
      switch (tmpl8.getType()) {
        case 'item':
          this.itemTemplate = tmpl8.template;
          break;
        case 'header':
          this.headerTemplate = tmpl8.template;
          break;
        default:
          this.itemTemplate = tmpl8.template;
          break;
      }
    });
  }

  getOptionLabel(option: any): any {
    return this.optionLabel ? option[this.optionLabel] : option;
  }

}
