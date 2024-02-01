import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-layout',

  templateUrl: './formLayout.component.html',
  styleUrls: ['./formLayout.component.css']
})
export class FormLayoutComponent {
  @Input() title: string = 'Form Title';
  @Input() subTitle: string = 'Form subTitle';
  @Output() onsubmit: EventEmitter<any> = new EventEmitter<any>();

  handleSubmit(event: Event) {
    event.preventDefault();
    this.onsubmit.emit();
  }
}
