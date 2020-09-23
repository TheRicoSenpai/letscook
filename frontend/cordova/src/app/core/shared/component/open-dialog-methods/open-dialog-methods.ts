import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';
export class ShowDialog{

    static openConfirmDialog(dialog: MatDialog, msg: string): Observable<any> {
        const dialogRef = dialog.open(ConfirmDialogComponent, {
            // width: '250px',
            maxWidth: '50vh',
            data: msg
        });
        return dialogRef.afterClosed();
    }
}
