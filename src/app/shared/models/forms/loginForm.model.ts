import { FormControl, FormGroup } from "@angular/forms";

export interface LoginFormValues {
    email: string;
    password: string;
  }

export interface LoginFormControls {
    email: FormControl<string>;
    password: FormControl<string>;
}

export type LoginFormModel = FormGroup<LoginFormControls>;