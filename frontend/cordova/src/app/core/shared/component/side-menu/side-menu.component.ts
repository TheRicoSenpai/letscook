import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {CookComponent} from '../cook/cook.component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemingService } from '../../service/theme/theming.service';
import { CooksService } from '../../service/data/cooks.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})

export class SideMenuComponent extends CookComponent implements OnInit {
  themeColor = 'primary';
  currentIcon: string;
  currentMenu: string;
  route: string;

  menuItems = [
    {url: '/home', text: 'Home', icon: 'home' },
    {url: '/inventory', text: 'Inventory', icon: 'store' },
    {url: '/recipes', text: 'Recipes', icon: 'menu_book' },
    {url: '/shopping-list', text: 'Shopping List', icon: 'shopping_cart' },
    {url: '/settings', text: 'Settings', icon: 'settings' }
  ];

  constructor(
      cooksService: CooksService,
      private themingService: ThemingService,
      location: Location,
      private router: Router,
      fb: FormBuilder,
      dialog: MatDialog,
      snackBar: MatSnackBar) {
    super(fb, dialog, snackBar, cooksService);
    router.events.subscribe((val) => {
      if (location.path() !== ''){
        this.route = location.path();
        this.currentIcon = this.menuItems.find(mi => mi.url === this.route).icon;
        this.currentMenu = this.menuItems.find(mi => mi.url === this.route).text;
      } else {
        this.route = 'home';
        this.currentIcon = 'home';
        this.currentMenu = 'Home';
      }
    });
  }

  ngOnInit(): void {
    // this.cooksService.getCook(COOK.id).subscribe(
    //   value => {
    //     this.cook = value;
    //     this.cooksService.EmitsRefreshSignal();
    //   });
    this.themingService.theme.next(this.cook?.settings.darkTheme ? 'dark-theme' : 'light-theme');
  }

  get settingsLink() {
    return '/settings';
  }
  get recipes() {
    return this.cook?.recipes;
  }
  get recipesLength() {
    return this.recipes?.length;
  }

  get inventory() {
    return this.cook?.inventory;
  }
  get inventoryLength() {
    return this.inventory?.length;
  }

  get shoppingList() {
    return this.cook?.shoppingList;
  }
  get shoppingListLength() {
    return this.shoppingList?.length;
  }

}
