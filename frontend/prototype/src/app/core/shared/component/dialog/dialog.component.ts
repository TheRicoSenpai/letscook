import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog',
    template: '',
    styles: []
})
export class DialogComponent {
    constructor(
        protected fb: FormBuilder,
        protected dialog: MatDialog,
        protected dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }
}
