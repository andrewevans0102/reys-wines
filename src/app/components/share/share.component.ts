import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
  title = environment.title;
  // https: //stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
  MOBILE_PATTERN = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.MOBILE_PATTERN),
  ]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
