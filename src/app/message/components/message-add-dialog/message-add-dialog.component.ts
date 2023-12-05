import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef  } from '@angular/material/dialog';

import { IMessage } from "src/app/message/interfaces/message.interface";

@Component({
  selector: 'app-message-add-dialog',
  templateUrl: './message-add-dialog.component.html',
  styleUrls: ['./message-add-dialog.component.scss']
})
export class MessageAddDialogComponent {

  /** FormGroup for message form. */
  messageForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MessageAddDialogComponent>
  ) {}

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
}
