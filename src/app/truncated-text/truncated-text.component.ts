import { Component, OnInit, Input } from '@angular/core';
import { TruncatePipe } from '../truncate.pipe';

@Component({
  selector: 'app-truncated-text',
  templateUrl: './truncated-text.component.html',
  styleUrls: ['./truncated-text.component.css'],
})
export class TruncatedTextComponent implements OnInit {
  @Input() text = '';
  @Input() limit = Infinity;
  private _truncating = true;

  constructor() { }

  ngOnInit() {
  }

  set truncating(value: boolean) {
    this._truncating = value;
  }
  get truncating(): boolean {
    return this._truncating;
  }

  get isLimitLesser(): boolean {
    return this.text.length <= this.limit;
  }

  get showMore(): boolean {
    return this._truncating && this.text.length > this.limit;
  }

  get showLess(): boolean {
    return !this._truncating && this.text.length > this.limit;
  }
}
