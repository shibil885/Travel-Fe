// import { inject } from '@angular/core';
// import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { map, switchMap, catchError } from 'rxjs/operators';
// import { AuthService } from '../service.service';

// export const authGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot
// ): Observable<boolean> => {
//   const authService = inject(AuthService);
//   const injectedRouter = inject(Router);
//   const accessToken = authService.getAccessToken();
//   const requestedRole = route.data['role'];
//   console.log('Requested user role:', requestedRole);

//   if (accessToken) {
//     return authService.validateToken().pipe(
//       switchMap((res) => {
//         console.log('user in token', res);
//         if (res.role === requestedRole) {
//           if (res.valid) {
//             return of(true);
//           } else {
//             return authService.refreshToken().pipe(
//               switchMap((newAccessToken: string) => {
//                 authService.setAccessToken(newAccessToken);
//                 return authService.validateToken().pipe(
//                   map((refreshRes) => {
//                     if (refreshRes.valid && refreshRes.role === requestedRole) {
//                       return true;
//                     } else {
//                       handleUnauthenticated(injectedRouter, requestedRole);
//                       return false;
//                     }
//                   }),
//                   catchError((error) => {
//                     console.error(
//                       'Error during token validation after refresh:',
//                       error
//                     );
//                     handleUnauthenticated(injectedRouter, requestedRole);
//                     return of(false);
//                   })
//                 );
//               }),
//               catchError((error) => {
//                 console.error('Error during token refresh:', error);
//                 handleUnauthenticated(injectedRouter, requestedRole);
//                 return of(false);
//               })
//             );
//           }
//         } else {
//           return of(false);
//         }
//       }),
//       catchError((error) => {
//         console.error('Error during token validation:', error);
//         handleUnauthenticated(injectedRouter, requestedRole);
//         return of(false);
//       })
//     );
//   }

//   handleUnauthenticated(injectedRouter, requestedRole);
//   return of(false);
// };

// function handleUnauthenticated(router: Router, role: string): void {
//   //   switch (role) {
//   //     case 'user':
//   //       router.navigate(['/login']);
//   //       break;
//   //     case 'admin':
//   //       router.navigate(['/admin/login']);

//   //       break;
//   //     case 'agency':
//   //       router.navigate(['/agency/login']);
//   //       break;
//   //     default:
//   //       router.navigate(['/agency/login']);
//   //       break;
//   //   }
//   router.navigate(['/login']);
// }
import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../service.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
): Observable<boolean> => {
  const authService = inject(AuthService);
  const injectedRouter = inject(Router);
  const accessToken = authService.getAccessToken();
  const requestedRole = route.data['role'];

  console.log('Requested user role:', requestedRole);

  if (accessToken) {
    return authService.validateToken().pipe(
      switchMap((res) => {
        console.log('User in token', res);
        if (res.role === requestedRole && res.valid) {
          return of(true);
        } else if (!res.valid) {
          return authService.refreshToken().pipe(
            switchMap((newAccessToken: string) => {
              authService.setAccessToken(newAccessToken);
              return of(true);
            }),
            catchError((error) => {
              console.error('Error during token refresh:', error);
              handleUnauthenticated(injectedRouter, requestedRole);
              return of(false);
            })
          );
        } else {
          handleUnauthorizedAccess(injectedRouter, res.role);
          return of(false);
        }
      }),
      catchError((error) => {
        console.error('Error during token validation:', error);
        handleUnauthenticated(injectedRouter, requestedRole);
        return of(false);
      })
    );
  }
  handleUnauthenticated(injectedRouter, requestedRole);
  return of(false);
};

function handleUnauthenticated(router: Router, role: string): void {
  if (role === 'user') {
    router.navigate([`/login`]);
  } else {
    router.navigate([`/${role}/login`]);
  }
}

function handleUnauthorizedAccess(router: Router, role: string): void {
  switch (role) {
    case 'admin':
      router.navigate(['/admin']);
      break;
    case 'user':
      router.navigate(['/home']);
      break;
    case 'agency':
      router.navigate(['/agency']);
      break;
    default:
      router.navigate(['/login']);
      break;
  }
}
