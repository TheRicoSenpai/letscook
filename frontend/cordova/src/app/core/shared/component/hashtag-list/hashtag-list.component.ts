import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-hashtag-list',
  templateUrl: './hashtag-list.component.html',
  styleUrls: ['./hashtag-list.component.css']
})
export class HashtagListComponent implements OnInit{
  @Input() hashtags: string[];
  @Input() selectable: boolean;
  @Input() removable: boolean;
  @Input() allHashtags: string[] = [];
  @Input() canModify: boolean;

  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('hashtagInput') hashtagInput: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  hashtagCtrl = new FormControl();
  filteredHashtags: Observable<string[]>;

  constructor() {
  }
  ngOnInit() {
    this.filteredHashtags = this.hashtagCtrl.valueChanges.pipe(
      startWith(null),
      map((hashtag: string | null) => hashtag
      ? this._filter(hashtag, this.allHashtags)
      : this._filterRemaining(this.hashtags, this.allHashtags))
      );
  }

  addHashtag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our hashtags
    if ((value || '').trim()) {
      this.hashtags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.hashtagCtrl.setValue(null);
  }

    removeHashtag(hashtag: string): void {
      const index = this.hashtags.indexOf(hashtag);

      if (index >= 0) {
        this.hashtags.splice(index, 1);
        this.hashtagCtrl.updateValueAndValidity();
      }
    }

    hashtagSelected(event: MatAutocompleteSelectedEvent): void {
      if (!this.hashtags?.some(h => h === event.option.viewValue)){
        this.hashtags.push(event.option.viewValue);
      }
      this.hashtagInput.nativeElement.value = '';
      this.hashtagCtrl.setValue(null);
    }

    private _filter(value: string, listToFilter: string[]): string[] {
      const filterValue = value.toLowerCase();
      return listToFilter.filter(f => f.toLowerCase().indexOf(filterValue) === 0);
    }
    private _filterRemaining(values: string[], listToFilter: string[]): string[] {
      return listToFilter.filter(f => !values?.some(fv => fv.toLowerCase() === f.toLowerCase()));
    }

}
