import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  editableText = 'editable text 1';

  constructor(
    private fb: FormBuilder
  ) {
  }
  // Save name to the server here.
  saveEditable(value) {
    console.log(value);
  }

  ngOnInit() {

    this.myForm = this.fb.group({
      editableText2: ['editable text 2', Validators.required]
    });
    console.log(this.myForm);
  }
}
