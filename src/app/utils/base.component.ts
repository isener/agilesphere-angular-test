import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-base'
})
export class BaseComponent implements OnDestroy {
    componentDestroyed$ = new Subject<void>();

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

}


