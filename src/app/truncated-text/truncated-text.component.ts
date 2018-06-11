import { Component, OnInit, Input } from '@angular/core';
import { TruncatePipe } from '../truncate.pipe';

@Component({
  selector: 'app-truncated-text',
  templateUrl: './truncated-text.component.html',
  styleUrls: ['./truncated-text.component.css'],
})
export class TruncatedTextComponent implements OnInit {
  private _text = '';
  private _limit = Infinity;
  private _truncating = true;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set text(value: string) {
    this._text = value;
  }
  get text(): string {
    return this._text;
  }

  @Input()
  set limit(value: number) {
    this._limit = value;
  }
  get limit(): number {
    return this._limit;
  }

  @Input()
  set truncating(value: boolean) {
    this._truncating = value;
  }
  get truncating(): boolean {
    return this._truncating;
  }

  get isLimitLesser(): boolean {
    return this._text.length <= this._limit;
  }

  get showMore(): boolean {
    return this._truncating && this._text.length > this._limit;
  }

  get showLess(): boolean {
    return !this._truncating && this._text.length > this._limit;
  }
}
