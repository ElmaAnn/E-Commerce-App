import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isUser: boolean = false;
  constructor(private authService: AuthService) {}
  isOpen: boolean = false;

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.isUser = true;
        this.authService.userId = user.uid;
        //console.log(this.isUser);
      } else {
        this.isUser = false;
        this.authService.userId = '';
        //console.log(this.isUser);
      }
    });
  }

  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.authService.logout();
  }
}
