import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { FinancialProductsComponent } from './app/pages/financial-products.component';
import { ListadoProductosFinancierosComponent } from './app/pages/listado-productos-financieros/listado-productos-financieros.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/services/author/author.interceptor';
import { ProductoFinancieroComponent } from './app/pages/producto-financiero/producto-financiero.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {
        path: '',
        component: FinancialProductsComponent,
        children: [
          { path: '', component: ListadoProductosFinancierosComponent },
          {
            path: 'producto-financiero',
            component: ProductoFinancieroComponent,
            children: [
              {
                path: 'crear',
                loadComponent: () =>
                  import(
                    './app/pages/crear-producto-financiero/crear-producto-financiero.component'
                  ).then((mod) => mod.CrearProductoFinancieroComponent),
              },
              {
                path: 'editar/:id',
                loadComponent: () =>
                  import(
                    './app/pages/editar-producto-financiero/editar-producto-financiero.component'
                  ).then((mod) => mod.EditarProductoFinancieroComponent),
              },
              { path: '**', redirectTo: 'crear' },
            ],
          },
        ],
      },
      { path: '**', redirectTo: '/' },
    ]),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
});
