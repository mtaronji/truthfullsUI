import { Component, OnInit} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { APIService } from '../Services/api.service';
@Component({
    selector: 'app-feedback',
    imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './feedback.component.html',
    styleUrl: './feedback.component.css'
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup = {} as FormGroup;
  Postmessage:string = "";
  PostSuccess:boolean = false;
  constructor(private formBuilder: FormBuilder, private api:APIService) { }

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  get f() { return this.feedbackForm.controls; }
  submitFeedback() {
    // If the form is invalid, do not submit
    if (this.feedbackForm.invalid) {
      return;
    }

    // Handle the submission of feedback data, like sending it to a server or performing other actions.
    console.log('Feedback submitted:', this.feedbackForm.value);

    // Reset the form after submission
  
    this.api.PostFeedback(this.feedbackForm.value['message']).subscribe({
      next:(x:boolean) => {
        this.PostSuccess = x;
        this.feedbackForm.reset();
        if(x){
          this.Postmessage = "Message Successfully posted";
        }
        else{
          this.Postmessage = "Error submitting feedback";
        }
      }
    });

  }
}
