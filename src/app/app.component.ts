import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fruits = [
    {
      name: 'Apple'
    },
    {
      name: 'Peach'
    },
    {
      name: 'Orange'
    },
    {
      name: 'Coconut'
    },
    {
      name: 'Cherry'
    }
  ];

  c1 = `
    <my-listbox
      header="Custom Component 1"
      [options]="fruits"
      optionLabel="name"
    ></my-listbox>
  `;

  c2 = `
    <my-listbox
      header="Custom Component 2"
      [options]="fruits"
      optionLabel="name"
    >
      <ng-template let-item let-i="index" myTemplate="item">
        Fruit {{ i }}: {{ item }}
      </ng-template>

      <ng-template myTemplate="header">
        <span
          style="
            background-color: #00ca4e;
            border-radius: 50%;
            width: 10px;
            height: 10px;
            display: inline-block;
            margin-right: 0.2em;
          "
        ></span>
        <span>Header inside ng-template</span>
      </ng-template>
    </my-listbox>
  `;

  c3 = `
    <div>
      <my-listbox
        header="Custom Component 3"
        [options]="fruits"
        optionLabel="name"
        [itemTemplate]="templateNotChildOfListbox"
      ></my-listbox>

      <ng-template #templateNotChildOfListbox let-item let-i="index">
        {{ item }} === {{ i }}
      </ng-template>
    </div>
  `

  c4 = `
    <my-listbox
      header="Custom Component 3"
      [options]="[]"
    ></my-listbox>
  `;

  c5 = `
    <my-listbox
      header="Custom Component 4"
      emptyMessage="No Items here"
      optionLabel="name"
    ></my-listbox>
  `;
}
