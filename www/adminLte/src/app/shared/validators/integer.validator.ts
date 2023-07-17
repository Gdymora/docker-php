import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/*
валидатор проверки на целое число
form.get('yourControl').setValidators([integer()]); */

export function integer(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const error: ValidationErrors = { integer: true };

        if (control.value && control.value != `${parseInt(control.value, 10)}`) {
            control.setErrors(error);
            return error;
        } else {
            control.setErrors(null);
            return null;
        }

    };
}
//Validators.pattern(/^\(\d{3}\)\d{3}-\d{2}-\d{2}$/)
