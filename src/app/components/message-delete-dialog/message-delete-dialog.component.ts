import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IMessage } from "src/app/interfaces/message.interface";

@Component({
  selector: 'app-message-delete-dialog',
  templateUrl: './message-delete-dialog.component.html',
  styleUrls: ['./message-delete-dialog.component.scss']
})
export class MessageDeleteDialogComponent {
  
  constructor(
    private dialogRef: MatDialogRef<MessageDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message?: IMessage }
  ) {}
  
  /** 
   * Handles message deletion.
   * Closes the dialog and passes the delete type and message data to the calling component.
   */
  deleteMessage() {
    this.dialogRef.close({ type: 'delete', data: this.data.message });
  }

}
