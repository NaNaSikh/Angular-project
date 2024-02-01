import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsData } from 'src/app/types/cardsData.types';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cardsData: CardsData[] = [];
  filteredCards: CardsData[] = [];

  searchTerm: string = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private zone: NgZone, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.loadCardsData();
  }

  loadCardsData() {
    this.http.get<any>('http://localhost:3000/products').subscribe(
      (data) => {
        this.zone.run(() => {
          this.cardsData = data;
          this.filteredCards = [...this.cardsData];
        });
      },
      (error) => {
        console.error('Error loading JSON data:', error);
      }
    );
  }

  // Update filteredCards based on search term
  filterCards(searchTerm: string) {
    if (searchTerm.trim() === '') {
      this.filteredCards = [...this.cardsData];
      // If search term is empty, show all cards
    } else {
      this.filteredCards = this.cardsData.filter((card) =>
        card.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log(this.filteredCards);
    }
    this.cdr.detectChanges();
  }
}
