import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsData } from 'src/app/types/cardsData.types';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() id: CardsData['id'] = "1";
  @Input() category: CardsData['category'] = 'Card Category';
  @Input() productOwner: CardsData['productOwner'] = 'Card productOwner';
  @Input() title: CardsData['title'] = 'Card Title';
  @Input() salary: CardsData['salary'] = 3000.00;
  @Input() imageUrl: CardsData['imageUrl'] = 'https://dummyimage.com/720x400';
  @Input() status: CardsData['status'] = 'Active';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
