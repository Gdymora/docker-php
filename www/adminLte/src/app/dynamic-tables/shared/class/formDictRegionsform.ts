import { FormControl, FormGroup, Validators } from '@angular/forms';

export enum StoneField {
  Namobl = 'namobl',
  Namobl_ukr = 'namobl_ukr',
  Nacenka = 'nacenka',
}

export function getDictRegionsForm(valueDataForm?: any): FormGroup {
  let obj: any = {};
  const valueData = valueDataForm ? valueDataForm.attributes : obj;

  return new FormGroup({
    [StoneField.Namobl]: new FormControl(valueData[StoneField.Namobl] !== null ?
      valueData[StoneField.Namobl] : null, [Validators.required]),
    [StoneField.Namobl_ukr]: new FormControl(valueData[StoneField.Namobl_ukr] !== null ?
      valueData[StoneField.Namobl_ukr] : null, [Validators.required]),
    [StoneField.Nacenka]: new FormControl(valueData[StoneField.Nacenka] !== null ?
      valueData[StoneField.Nacenka] : null, [Validators.required]),
  });
}
