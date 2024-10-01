// import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { catchError, Observable, throwError } from 'rxjs';
// import { Router } from '@angular/router';

// export const agencyAuthInterceptor: HttpInterceptorFn = (
//   req: HttpRequest<any>,
//   next: HttpHandlerFn
// ): Observable<HttpEvent<any>> => {
//   const router = inject(Router);

//   return next(req).pipe(
//     // catchError((error) => {
//     //   // Handle HTTP errors here
//     //   if (error.status === 401) {
//     //     // Redirect to login on 401
//     //     router.navigate(['/login']);
//     //   }
//     //   return throwError(() => new Error('Something went wrong'));
//     // })
//   );
// };
