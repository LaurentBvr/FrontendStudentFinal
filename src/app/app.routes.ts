import { RouterModule, Routes } from '@angular/router';
import { MenuRoutes } from './constants/routes';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { DashBoardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { CatalogCoursesComponent } from './components/catalog-courses/catalog-courses.component';
import { AuthGuardService } from './service/auth-guard.service';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { CourseComponent } from './components/course/course.component';
import { CourseManagementComponent } from './components/admin/course-management/course-management.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: MenuRoutes.LOGIN
    },
    {
        path: MenuRoutes.LOGIN,
        component: LoginComponent,
    },
    {
        path: MenuRoutes.REGISTER,
        component: RegisterComponent,
    },
    {
        path: `${MenuRoutes.STUDENT}/${MenuRoutes.DASHBOAR}` ,
        component: DashBoardComponent,
        // canActivate: [AuthGuardService],//!
        children: [
          {
            path: MenuRoutes.CATALOG_COURSES,
            component: CatalogCoursesComponent,
          },
        ]
    },
    {
        path: `${MenuRoutes.ADMIN}/${MenuRoutes.DASHBOAR}` ,
        component: DashBoardComponent,
        // canActivate: [AuthGuardService],//!
        children: [
          {
            path: MenuRoutes.USER_MANAGEMENT,
            component: UserManagementComponent,
          },
          {
            path: MenuRoutes.COURSE_MANAGEMENT,
            component: CourseManagementComponent,
          },
        ]
    },
    {
        path: `${MenuRoutes.INSTRUCTOR}/${MenuRoutes.DASHBOAR}` ,
        component: DashBoardComponent,
        // canActivate: [AuthGuardService], //!
        children: [
          {
            path: MenuRoutes.CATALOG_COURSES,
            component: CatalogCoursesComponent,
          },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
