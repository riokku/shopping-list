import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatIcon,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './dialog-finalize.component.html',
  styleUrl: './dialog-finalize.component.scss'
})
export class DialogFinalizeComponent {

  listID: string | undefined = undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogFinalizeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }

  deleteList() {
    this.dialogRef.close(true);
  }

}
