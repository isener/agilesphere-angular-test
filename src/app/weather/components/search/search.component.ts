import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  @Input() error: string;
  @Output() search = new EventEmitter<string>();

  searchCtrl = new FormControl('', Validators.required);

  submit() {
    this.searchCtrl.markAsTouched();
    if (!this.searchCtrl.valid) {
      return;
    }

    this.search.emit(this.searchCtrl.value);
  }
}
