import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/auth/app-user';
import { AuthService } from 'src/app/auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AccountantRoleGuard implements CanActivate {

  user: AppUser;
  constructor(private authService: AuthService,
    private location: Location) {
    this.user = this.authService.appUser;
  }

  canActivate(): Observable<boolean> | boolean {
    if (this.has_role(['accountant'])) {
      return true;
    } else {
      this.location.back();
      return false;
    }
  }

  has_role(needRoles: string[]): boolean {
    /*this.user.roles;['technologist', 'economist', 'warehouse_keeper_synt', 'accountant',
    'warehouse_keeper_nat', 'photographer', 'hr', 'admin']*/
    const currentRoles = this.user.roles;
    return currentRoles?.some((elem: any) => needRoles.includes(elem));
  }
}
