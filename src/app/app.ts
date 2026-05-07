// import { Router, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs';

// import { Component} from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { SidebarComponent } from './shared/sidebar/sidebar';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, SidebarComponent],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
// //
// mostrarLayout = true;

// constructor(private router: Router) {
//   this.router.events
//     .pipe(filter(event => event instanceof NavigationEnd))
//     .subscribe((event: any) => {
//       this.mostrarLayout = event.url !== '/login';
//     });
// }
// //
// }

import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './shared/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  mostrarLayout = true;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
          this.mostrarLayout =  ! event.url.startsWith('/login');
          cdr.detectChanges()
      });
  }
}