import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { StoreStatistics } from '../../domain/models/store-statistics';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/store';

    // Cache the statistics Observable to prevent re-fetching on navigation
    private statistics$: Observable<StoreStatistics> | null = null;

    getStatistics(): Observable<StoreStatistics> {
        if (!this.statistics$) {
            this.statistics$ = this.http.get<StoreStatistics>(`${this.apiUrl}/statistics`).pipe(
                shareReplay(1) // Cache the last emitted value and replay it to new subscribers
            );
        }
        return this.statistics$;
    }
}
