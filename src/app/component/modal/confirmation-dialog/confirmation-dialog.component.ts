import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() dialogName: String = "modalDialog"
  @Input() title: String = "Confirm";
  @Input() message: String = "Question ?";
  @Input() redButton: String = "Red";
  @Input() greenButton: String = "Green";

  @Output() dialogButtonClick = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {
  }

  redClick(){
    this.dialogButtonClick.emit(this.redButton);
  }

  greenClick(){
    this.dialogButtonClick.emit(this.greenButton);
  }

}
