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
export class OptStoreGuard implements CanActivate {

    user: AppUser;
    constructor(private authService: AuthService, private router: Router) {
        this.user = this.authService.appUser;
    }

    canActivate(): Observable<boolean> | boolean {
        if (this.has_role(['opt_store'])) {
            return true;
        } else {
            this.router.navigate(['index']);
            return false;
        }
    }

    has_role(needRoles: string[]): boolean {
        /*this.user.roles;['technologist', 'economist', 'warehouse_keeper_synt', 'warehouse_keeper_nat', 'photographer', 'admin']*/
        const currentRoles = this.user.roles;
        return currentRoles?.some((elem: any) => needRoles.includes(elem));
    }
}
