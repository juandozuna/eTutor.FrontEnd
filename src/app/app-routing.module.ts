import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './services/accounts/auth.guard';
import {RoleAuthGuard} from './services/accounts/role-auth.guard';
import {RoleTypes} from './enums/role-types.enum';

const routes: Routes = [
  { path: '', redirectTo: 'login-tutor', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    data: {
      roles: [RoleTypes.Tutor]
    },
    canActivate: [AuthGuard]
  },
  // { path: 'login-tutor', loadChildren: './pages/login-tutor/login-tutor.module#LoginTutorPageModule' },
  { path: 'login-tutor', loadChildren: './auth/login-tutor/login-tutor.module#LoginTutorPageModule' },
  { path: 'register-tutor', loadChildren: './auth/register-tutor/register-tutor.module#RegisterTutorPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' , canActivate: [AuthGuard]},
  { path: 'history', loadChildren: './pages/history/history.module#HistoryPageModule' , canActivate: [AuthGuard] },
  { path: 'meeting-in-course', loadChildren: './pages/meeting-in-course/meeting-in-course.module#MeetingInCoursePageModule' , canActivate: [AuthGuard] },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  {
    path: 'student-manager',
    loadChildren: './pages/student-manager/student-manager.module#StudentManagerPageModule',
    data: {
      roles: [RoleTypes.Parent]
    },
    canActivate: [RoleAuthGuard]
  },
  {
    path: 'students',
    children: [
      {
        path: 'schedule',
        loadChildren: './students/student-schedule/student-schedule.module#StudentSchedulePageModule'
      }
    ],
    data: {
      roles: [RoleTypes.Student]
    },
    canActivate: [RoleAuthGuard]
  },
  {
    path: 'tutors',
    loadChildren: './tutors/tutors/tutors.module#TutorsPageModule',
    data: {
      roles: [RoleTypes.Tutor]
    },
    canActivate: [RoleAuthGuard]
  },
  {
    path: 'parents',
    loadChildren: './parents/parents.module#ParentsPageModule',
    data: {
      roles: [RoleTypes.Parent]
    },
    canActivate: [RoleAuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
