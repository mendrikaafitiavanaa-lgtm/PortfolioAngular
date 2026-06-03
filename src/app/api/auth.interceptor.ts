import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Récupère le token JWT stocké (par exemple après login)
  const token = localStorage.getItem('token');

  // Si un token existe, on clone la requête et on ajoute l’en-tête Authorization
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // Sinon, on laisse passer la requête telle quelle
  return next(req);
};
