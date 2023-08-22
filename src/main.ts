import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { FinancialProductsComponent } from './app/pages/financial-products.component';
import { ListadoProductosFinancierosComponent } from './app/pages/list-financial-products/listado-productos-financieros.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/services/author/author.interceptor';
import { ProductoFinancieroComponent } from './app/pages/product-financial/producto-financiero.component';

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
                path: 'create',
                loadComponent: () =>
                  import(
                    './app/pages/create-financial-product/crear-producto-financiero.component'
                  ).then((mod) => mod.CrearProductoFinancieroComponent),
              },
              {
                path: 'edit/:id',
                loadComponent: () =>
                  import(
                    './app/pages/edit-financial-product/editar-producto-financiero.component'
                  ).then((mod) => mod.EditarProductoFinancieroComponent),
              },
              { path: '**', redirectTo: 'create' },
            ],
          },
        ],
      },
      { path: '**', redirectTo: '/' },
    ]),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
});
