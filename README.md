# Learn Angular Custom component

Learn Angular `ng-template`, `ng-container` and **directives** to create a custom component.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

## How this Project was Created

1. `ng new learn-angular-customcomponent`
2. Update `angular.json#prefix` from **app** to **my**
3. `ng g d shared/directives/template`
4. `ng g c shared/components/listbox`

## Demo Custom Component

**app.component.html**

```html
<my-listbox
  header="Custom Component 2"
  [options]="fruits"
  optionLabel="name">

  <ng-template myTemplate="header">
    <span>Header inside ng-template</span>
  </ng-template>

  <div my-listbox-footer>
    This will also work, but, custom component will not be able to provide default values <br>
    AND hide default value if user has input <br>
    AND may have difficulty handling its styles.
  </div>

</my-listbox>
```

## Directive

**template.directive.ts**

```ts
import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myTemplate]',
})
export class TemplateDirective {
  /** The name for this `ng-template` to be referred later in a custom component */
  @Input('myTemplate') name: string;

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name;
  }
}
```

## Custom Component

**listbox.component.html**
```html
<div class="my-listbox">

    <h1 class="my-listbox-header">
        <ng-container *ngIf="!headerTemplate">
            {{ header }}
        </ng-container>
        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
    </h1>

    <div class="my-listbox-items-wrapper">
        <ul class="my-listbox-item-list">

            <ng-container *ngIf="!options?.length">
                <li class="my-listbox-item my-listbox-empty-message">
                    {{ emptyMessage }}
                </li>
            </ng-container>
            
            <ng-template ngFor let-option [ngForOf]="options" let-i="index">

                <li class="my-listbox-item">
                    <span *ngIf="!itemTemplate">{{ getOptionLabel(option) }}</span>
                    <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: getOptionLabel(option), index: i }"></ng-container>
                </li>

            </ng-template>
    
        </ul>
    </div>

    <!-- Custom component won't be able to provide default value and the Div element will always display even if no values -->
    <!-- <div class="my-listbox-footer"> -->
        <ng-content select="[my-listbox-footer]"></ng-content>
    <!-- </div> -->

</div>
```

**listbox.component.ts**

```ts
import { AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { TemplateDirective } from '@my/directives/template.directive';

@Component({
  selector: 'my-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.scss']
})
export class ListboxComponent implements AfterContentInit {

  @Input() header: string;

  @Input() options: any[];

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
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
