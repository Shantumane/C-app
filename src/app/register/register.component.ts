import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  photoPreview: string | ArrayBuffer = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fathersName: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      dob: ['', Validators.required],
      pincode: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      photo: [null]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;
        if (result !== null) {
          this.photoPreview = result;
          this.registerForm.patchValue({ photo: result });
        }
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.userService.setUser(formData);
      this.router.navigate(['/profile']);
    }
  }
}
