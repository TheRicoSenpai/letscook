import { Component, OnInit, HostBinding, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemingService } from './core/shared/service/theme/theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'prototype';
  themingSubscription: Subscription;
  constructor(
    private renderer: Renderer2, private themingService: ThemingService, private overlayContainer: OverlayContainer,
  ) { }

  @HostBinding('class') public cssClass: string;

  ngOnInit() {
    this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      // problem with drag drop elements that didn't follow the theme
      // found the solution on the link below
      // https://github.com/angular/components/issues/17089
      this.renderer.removeClass(document.body, this.cssClass);
      this.renderer.addClass(document.body, theme);
      this.cssClass = theme;
      this.applyThemeOnOverlays();
    });
  }
  /**
   * Apply the current theme on components with overlay (e.g. Dropdowns, Dialogs)
   */
  private applyThemeOnOverlays() {
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.cssClass);
  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }
}
