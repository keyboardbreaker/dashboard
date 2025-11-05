import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirm(message: string): Promise<boolean> {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message },
      });
      dialogRef.afterClosed().subscribe(result => {
        resolve(!!result);
      });
    });
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule],
  template: `
    <h2 mat-dialog-title>Confirm</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close="false">Cancel</button>
      <button mat-raised-button color="warn" mat-dialog-close="true">Confirm</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
