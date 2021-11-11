import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-error-form',
  templateUrl: './error-form.component.html',
  styleUrls: ['./error-form.component.scss']
})
export class ErrorFormComponent implements OnInit, OnChanges {
  @Input() errorText?: string = '';
  showError: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.errorText.firstChange) {
      this.showError = true;
    }
  }

  closeError() {
    this.showError = false;
  }


}
