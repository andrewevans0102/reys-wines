import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/components/confirmation/confirmation.component';
import { ShareComponent } from 'src/app/components/share/share.component';
import { MessageComponent } from '../../components/message/message.component';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(public dialog: MatDialog) {}

  showMessage(messageBody: string) {
    const dialogRef = this.dialog.open(MessageComponent, {
      width: '250px',
      data: {
        message: messageBody,
      },
    });
  }

  showConfirmation(messageBody: string) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '250px',
      data: { message: messageBody, response: ['YES', 'NO', 'CLOSE'] },
    });

    return dialogRef;
  }

  showShare() {
    const dialogRef = this.dialog.open(ShareComponent, {
      width: '250px',
      data: { message: 'Enter a number to share your wine with', response: '' },
    });

    return dialogRef;
  }
}
