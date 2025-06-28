import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../services/auth/auth.service'
import { NzMessageService } from 'ng-zorro-antd/message'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  isSpinning = false
  signupForm!: FormGroup
  age: number | null = null;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      cnp:      [null, [Validators.required, Validators.pattern(/^[1-9]\d{12}$/)]]
    });
    this.signupForm.get('cnp')!.valueChanges.subscribe(cnp => {
      this.age = this.calculateAgeFromCnp(cnp);
    });
  }

  confirmationValidator = (control: FormControl): Record<string, boolean> => {
    if (!control.value) {
      return { required: true }
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true }
    }
    return {}
  }

  private calculateAgeFromCnp(cnp: string): number | null {
    if (!cnp || cnp.length < 7) return null;
    const s = +cnp[0];
    const yy = +cnp.substring(1, 3);
    const mm = +cnp.substring(3, 5) - 1;   // JS luni 0–11
    const dd = +cnp.substring(5, 7);
    let century: number;
    if (s === 1 || s === 2)      century = 1900;
    else if (s === 5 || s === 6) century = 2000;
    else if (s === 3 || s === 4) century = 1800;
    else return null;
    const birth = new Date(century + yy, mm, dd);
    if (isNaN(birth.getTime())) return null;
    const diff = Date.now() - birth.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  register(): void {
    console.log(this.signupForm.value)
    this.authService.register(this.signupForm.value).subscribe(
      res => {
        console.log('res', res)

        if (res.id !== null) {
          this.message.success('User registered successfully', {
            nzDuration: 5000
          })
          this.router.navigateByUrl('/login')
        } else {
          this.message.error('User registration failed', {
            nzDuration: 5000
          })
        }
      },
     err => {
      console.log('signup error', err);
      if (err.status === 406) {
        // Emailul există deja
        this.message.error('Emailul există deja. Te rugăm să te autentifici.', {
          nzDuration: 5000
        });
      } else {
        // Altă eroare
        this.message.error('Eroare la înregistrare. Încearcă din nou.', {
          nzDuration: 5000
        });
      }
    }
  );
}
}
