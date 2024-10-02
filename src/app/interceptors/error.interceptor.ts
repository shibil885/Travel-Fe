// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';

// export const errorHandlerInterceptorFn: HttpInterceptorFn = (req, next) => {
//   const router = inject(Router);
//   const toastr  = inject(ToastrService)
//   return next(req).pipe(
//     catchError((error) => {
//       if (error.status === 403) {
//         toastr.error('Access Denied')
//         console.error('Access Denied');
//       } else if (error.status === 404) {
//         // Handle not found errors
//         router.navigate(['/not-found']);
//       } else if (error.status === 500) {
//         // Handle server errors
//         console.error('Internal Server Error');
//       } else {
//         // General error handling
//         console.error('An error occurred:', error.message);
//       }

//       // Re-throw the error so it can be handled further down the chain if needed
//       return throwError(() => error);
//     })
//   );
// };
