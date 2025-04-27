import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'; // Optional for beautiful popups

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      InputName: ['', Validators.required],
      InputEmail: ['', [Validators.required, Validators.email]],
      InputSubject: ['', Validators.required],
      InputMessage: ['', Validators.required]
    });
  }

  sendEmail() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    emailjs.send('service_wjpxg9e', 'template_zqfvgrx', this.contactForm.value, 'GyE7QcJC-f10Lk9lF')
      .then((result) => {
        console.log('SUCCESS!', result.text);
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you for reaching out. I will get back to you soon!',
          confirmButtonColor: '#3085d6'
        });
        this.contactForm.reset();
      }, (error) => {
        console.log('FAILED...', error.text);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please try again later!',
          confirmButtonColor: '#d33'
        });
      });
  }
}