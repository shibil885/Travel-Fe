import { Component } from '@angular/core';
import { IPackage } from '../../../../interfaces/package.interface';
import { Store } from '@ngrx/store';
import {
  selectPackage,
  selectSucess,
} from '../../../../store/user/user.selector';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { Observable } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

@Component({
  selector: 'app-single-package',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './single-package.component.html',
  styleUrl: './single-package.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate(
          '0.5s ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class SinglePackageComponent {
  info: boolean = true;
  plane: boolean = false;
  gallery: boolean = false;

  singlePackage: IPackage = {
    _id: '67090601c848d1807f4775de',
    name: 'Himalayan',
    category: {
      _id: '670902ccc848d1807f4775c2',
      name: 'adventure',
      description:
        'Exciting and adrenaline-packed travel experiences, including hiking, mountaineering, water sports, and safaris for thrill-seekers.',
      isActive: true,
    },
    country: 'Nepal',
    description:
      'Experience the majestic beauty of the Himalayas with a 10-day trekking adventure through some of the most stunning landscapes in the world. Explore ancient monasteries, lush valleys, and towering peaks while immersing yourself in local culture.',
    departure: 'Kathmandu',
    finalDestination: 'Everest Base Camp',
    price: '120000', // Should be a number instead of a string
    people: '10', // Should be a number instead of a string
    included: [
      'Accommodation in comfortable hotels and guesthouses',
      'Daily breakfast and dinner',
      'Guided tours to key attractions',
      'Transportation for all sightseeing',
      'Trekking activities with experienced guides',
      'Cultural experiences and local interactions',
      'Assistance with travel permits',
    ],
    notIncluded: [
      'International Flights',
      'Travel Insurance',
      'Lunch',
      'Personal Expenses',
      'Entrance Fees',
      'Medical Expenses',
    ],
    days: '7', // Should be a number instead of a string
    tourPlans: [
      {
        day: 1,
        title: 'Arrival in Kathmandu',
        description:
          'Explore the vibrant streets and ancient temples of Kathmandu.',
      },
      {
        day: 2,
        title: 'Kathmandu to Pokhara',
        description:
          'Scenic drive to Pokhara, enjoy views of the Annapurna range.',
      },
      {
        day: 3,
        title: 'Pokhara Exploration',
        description:
          'Visit Phewa Lake, Sarangkot for sunrise, and the World Peace Pagoda.',
      },
      {
        day: 4,
        title: 'Trekking to Ghorepani',
        description:
          'Begin your trek through lush forests and charming villages.',
      },
      {
        day: 5,
        title: 'Ghorepani to Poon Hill',
        description:
          'Early morning hike to Poon Hill for breathtaking sunrise views.',
      },
      {
        day: 6,
        title: 'Return to Pokhara',
        description: 'Trek back and drive to Pokhara for leisure time.',
      },
      {
        day: 7,
        title: 'Departure',
        description:
          'Return to Kathmandu for your departure flight or extend your stay.',
      },
    ],
    images: [
      'http://res.cloudinary.com/dnnqz2zqn/image/upload/v1728644609/ljztxrhgnvqohjonosdr.jpg',
      'http://res.cloudinary.com/dnnqz2zqn/image/upload/v1728644607/ozxmohck19lplnyahrey.jpg',
    ],
    agencyId: {
      _id: '6704f2f916b6fffcbe359441',
      name: 'Royal-Travels',
      email: 'shibil@gmail.com',
      password: '$2b$10$YjPmeE2R0F1vweH1IcleHuCjb2KEomD/6HbCMfa4ePyflZU4oyXpe',
      place: 'Kondotty',
      phone: 9995179514,
      document: '5801697dbeb060469821d36baafd08a1',
      isActive: true,
      isVerified: true,
      isConfirmed: true,
    },
    isActive: true,
  };

  renderPage$: Observable<boolean> = this.store.select(selectSucess);
  constructor(private store: Store, private router: Router) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    // this.store.select(selectPackage).subscribe((data) => {
    //   if (data) {
    //     console.log('from single Package component --->', data);
    //     this.singlePackage = data;
    //     return;
    //   }
    //   return this.router.navigate(['packages']);
    // });
  }
  onInfo() {
    this.info = true;
    this.plane = false;
    this.gallery = false;
  }
  onPlane() {
    this.plane = true;
    this.info = false;
    this.gallery = false;
  }
  onGallery() {
    this.gallery = true;
    this.info = false;
    this.plane = false;
  }
}
