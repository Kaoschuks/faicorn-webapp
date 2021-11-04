import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
    constructor(private injector: Injector) { }
    handleError(error: Error | HttpErrorResponse) {
        // const errorsService = this.injector.get(ErrorsService);
        // const router = this.injector.get(Router);
        if (error instanceof HttpErrorResponse) {
            // Server error happened
            if (!navigator.onLine) {
                // No Internet connection
            }
            // Http Error
            // Send the error to the server
            // this.error.log(error);
            // Show notification to the user
            // return notificationService.notify(`${error.status} - ${error.message}`);
        } else {
            // Client Error Happend
            // Send the error to the server and then
            // redirect the user to the page with all the info
            // this.error.log(error);
                // .subscribe(errorWithContextInfo => {
                //     router.navigate(['/error'], { queryParams: errorWithContextInfo });
                // });
        }
    }
}
