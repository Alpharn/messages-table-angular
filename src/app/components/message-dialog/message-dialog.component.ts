import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IMessage } from "src/app/interfaces/message.interface";

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {

  /** Indicates whether the dialog is in delete mode. */
  isDeleteMode = false;

  /** FormGroup for message form. */
  messageForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message?: IMessage, isDeleteMode?: boolean }
  ) {
    if (data && data.isDeleteMode) {
      this.isDeleteMode = true;
    }
  }

  /**
   * Handles form submission.
   * Constructs the message object from form data and closes the dialog with the message data.
   */
  onSubmit() {
    if (this.messageForm.valid) {
      const formData: IMessage = {
        ...this.messageForm.value,
        date: new Date().toLocaleString()
      };
      this.dialogRef.close({ type: 'create', data: formData });
    }
  }
  
  /** 
   * Handles message deletion.
   * Closes the dialog and passes the delete type and message data to the calling component.
   */
  deleteMessage() {
    this.dialogRef.close({ type: 'delete', data: this.data.message });
  }

}
