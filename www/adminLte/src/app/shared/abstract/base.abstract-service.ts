import { Observable } from 'rxjs';

export abstract class AbstractBaseService {
    public abstract getComponent(
        obj: object, eventSortDirection: string,
        eventSortActive: string, pageIndex: number, pageSize: number): Observable<any>;
    public abstract getComponentById(id: string): Observable<any>;
    public abstract update(component: any): Observable<any>;
    public abstract create(stone: any): Observable<any>;
    public abstract destroy(id: number | null): Observable<Response>;
}
