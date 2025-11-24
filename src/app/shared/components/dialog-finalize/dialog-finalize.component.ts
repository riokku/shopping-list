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
    MatButtonModule
  ],
  templateUrl: './dialog-finalize.component.html',
  styleUrl: './dialog-finalize.component.scss'
})
export class DialogFinalizeComponent {

  author: string | undefined = undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogFinalizeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }

  triggerSubmit() {
    this.dialogRef.close(this.author);
  }

}
