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
  @Input() showLess = false;
  truncating = true;

  constructor() { }

  ngOnInit() {
  }


  get isLimitLesser(): boolean {
    return this.text.length <= this.limit;
  }

  get showMoreOption(): boolean {
    return this.truncating && this.text.length > this.limit;
  }

  get showLessOption(): boolean {
    return this.showLess && !this.truncating && this.text.length > this.limit;
  }

  get showAll(): boolean {
    return this.isLimitLesser || !this.truncating;
  }
}
