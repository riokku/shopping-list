import { Component, Inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-inventory-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatButtonModule
  ],
  templateUrl: './add-inventory-dialog.component.html',
  styleUrl: './add-inventory-dialog.component.scss'
})
export class AddInventoryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddInventoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }
}

