import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userId: string | null = null;

  selectedLanguage: string = 'en';

  setLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.translate.use(lang);
    console.log(lang);
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
  }
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');

  }
  logout() {
    localStorage.setItem('userId', "");
    this.userId = null;
  }
}
