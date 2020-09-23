import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatListModule } from "@angular/material/list";

import { DragDropModule } from "@angular/cdk/drag-drop";

import { UnitPipe } from "./pipes/unit-pipe";
import { FavoritePipe } from "./pipes/favorite-pipe";
// import { ConfirmDialogComponent } from "./component/confirm-dialog/confirm-dialog.component";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ReactiveFormsModule } from "@angular/forms";
// import { HashtagListComponent } from "./component/hashtag-list/hashtag-list.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

const materialModules = [
  MatSidenavModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatDividerModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatListModule,
  DragDropModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [UnitPipe, FavoritePipe], // ConfirmDialogComponent, HashtagListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    materialModules
  ],
  exports: [
    UnitPipe,
    FavoritePipe,
    // ConfirmDialogComponent,
    // HashtagListComponent,
    materialModules
  ]
})
export class SharedModule { }
