import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; // Dikkat: doğru path
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CampaignListComponent } from './pages/dashboard/campaign-list/campaign-list.component';
import { CampaignCreateComponent } from './pages/dashboard/campaign-create/campaign-create.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: CampaignListComponent , canActivate: [AuthGuard]},
  { path: 'list', component: CampaignListComponent, canActivate: [AuthGuard]  },
  { path: 'create', component: CampaignCreateComponent, canActivate: [AuthGuard]  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}