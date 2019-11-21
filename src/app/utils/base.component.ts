import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export abstract class BaseComponent implements OnDestroy {
    componentDestroyed$ = new Subject<void>();

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }

}


