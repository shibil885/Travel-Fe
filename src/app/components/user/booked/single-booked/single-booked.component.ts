// import { CommonModule } from "@angular/common";
// import { Component } from "@angular/core";
// import { ActivatedRoute } from "@angular/router";

// @Component({
//   selector: 'app-single-booked',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <div class="container mx-auto px-4 py-8">
//       <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform">
//         <div class="p-6">
//           <h1 class="text-3xl font-bold text-gray-800 mb-6">Booking Details</h1>
//           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div class="border p-4 rounded-lg shadow-md">
//               <h2 class="text-xl font-semibold mb-4 text-blue-600">Trip Information</h2>
//               <p class="mb-2">
//                 <span class="font-medium">Booking ID:</span> {{ booking._id }}
//               </p>
//               <p class="mb-2">
//                 <span class="font-medium">Package ID:</span>
//                 {{ booking.package_id }}
//               </p>
//               <p class="mb-2">
//                 <span class="font-medium">Dates:</span>
//                 {{ booking.start_date | date }} - {{ booking.end_date | date }}
//               </p>
//               <p class="mb-2">
//                 <span class="font-medium">Status:</span>
//                 <span
//                   class="px-2 py-1 text-xs font-semibold rounded-full"
//                   [ngClass]="{
//                     'bg-green-100 text-green-800': booking.travel_status === 'Completed',
//                     'bg-yellow-100 text-yellow-800': booking.travel_status === 'Upcoming',
//                     'bg-blue-100 text-blue-800': booking.travel_status === 'In Progress'
//                   }"
//                 >
//                   {{ booking.travel_status }}
//                 </span>
//               </p>
//               <p class="mb-2">
//                 <span class="font-medium">Confirmation:</span>
//                 {{ booking.confirmation }}
//               </p>
//             </div>
//             <div class="border p-4 rounded-lg shadow-md">
//               <h2 class="text-xl font-semibold mb-4 text-blue-600">Payment Information</h2>
//               <p class="mb-2">
//                 <span class="font-medium">Payment Method:</span>
//                 <span class="flex items-center">
//                   <i class="fas fa-credit-card mr-2"></i>{{ booking.payment }}
//                 </span>
//               </p>
//               <p class="mb-2">
//                 <span class="font-medium">Total Price:</span>
//                 <span class="text-lg font-bold text-green-600">{{ booking.total_price | currency }}</span>
//               </p>
//               <p class="mb-2">
//                 <span class="font-medium">Discounted Price:</span>
//                 <span class="text-lg font-bold text-red-600">{{ booking.discounted_price | currency }}</span>
//               </p>
//               <p *ngIf="booking.coupon_id" class="mb-2">
//                 <span class="font-medium">Coupon Applied:</span>
//                 <span class="text-blue-600">{{ booking.coupon_id }}</span>
//               </p>
//             </div>
//           </div>
//           <div class="mt-8">
//             <h2 class="text-xl font-semibold mb-4 text-blue-600">Travelers</h2>
//             <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               <div
//                 *ngFor="let person of booking.peoples"
//                 class="bg-gray-50 p-4 rounded-md shadow-md transition-transform transform hover:scale-105"
//               >
//                 <p class="font-medium text-gray-800">{{ person.name }}</p>
//                 <p class="text-sm text-gray-600">Age: {{ person.age }}</p>
//               </div>
//             </div>
//           </div>
//           <div class="mt-8 border-t pt-4">
//             <h2 class="text-xl font-semibold mb-4 text-blue-600">Billing Details</h2>
//             <p class="mb-2">
//               <span class="font-medium">Name:</span>
//               {{ booking.billing_details.firstName }} {{ booking.billing_details.lastName }}
//             </p>
//             <p class="mb-2">
//               <span class="font-medium">Email:</span>
//               {{ booking.billing_details.email }}
//             </p>
//             <p class="mb-2">
//               <span class="font-medium">Phone:</span>
//               {{ booking.billing_details.phone }}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   `,
//   styles: [
//     `
//       :host {
//         display: block;
//         background-color: #f3f4f6;
//         min-height: 100vh;
//       }
//       .transition-transform {
//         transition: transform 0.2s ease-in-out;
//       }
//       .hover\:scale-105:hover {
//         transform: scale(1.05);
//       }
//     `,
//   ],
// })
// export class SingleBookedComponent  {
//   booking = {
//     _id: '1234567890abcdef',
//     user_id: 'user123',
//     package_id: 'package456',
//     payment: 'Credit Card',
//     start_date: new Date('2023-07-01'),
//     end_date: new Date('2023-07-07'),
//     travel_status: 'Upcoming',
//     confirmation: 'CONF123456',
//     coupon_id: 'SUMMER10',
//     discounted_price: '1799.99',
//     total_price: '1999.99',
//     peoples: [
//       { name: 'John Doe', age: '35' },
//       { name: 'Jane Doe', age: '32' },
//       { name: 'Jimmy Doe', age: '10' },
//     ],
//     billing_details: {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john.doe@example.com',
//       phone: '+1 (555) 123-4567',
//     },
//   };

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit() {
//     // In a real application, you would fetch the booking details using the ID from the route
//     // this.route.paramMap.pipe(
//     //   switchMap(params => {
//     //     const id = params.get('id');
//     //     return this.bookingService.getBooking(id);
//     //   })
//     // ).subscribe(booking => this.booking = booking);
//   }
// }
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { IBooking } from '../../../../interfaces/booking.interface';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SideBarComponent],
  templateUrl: './single-booked.component.html',
  styleUrls: ['./single-booked.component.css'],
})
export class SingleBookedComponent {
  @Input() bookingDetails!: IBooking;
  @Output() closePageEvent: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onCancel(): void {
    console.log('Booking cancelled');
  }
  goBack() {
    this.closePageEvent.emit();
  }
}
