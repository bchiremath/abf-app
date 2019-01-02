import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import * as io from 'socket.io-client';
@Component({
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent {
  input1: MediaStreamAudioSourceNode;
  globalStream: any;
  processor: any;
  context: AudioContext;
  title = 'app';
  selectedPlan: any = 2;
  profileForm: FormGroup;
  orders = [];
  ready = false;
  ngOnInit() {
    setTimeout(() => {
      this.orders = [
        { id: 100, name: 'order 1' },
        { id: 200, name: 'order 2' },
        { id: 300, name: 'order 3' },
        { id: 400, name: 'order 4' }
      ];
      this.ready = true;
      this.creteFormGroup();
    }, 2000);
  }

  creteFormGroup() {
    const controls = this.orders.map(c => new FormControl(false));
    controls[0].setValue(true); // Set the first checkbox to true (checked)

    this.profileForm = new FormGroup({
      plan: new FormControl(this.selectedPlan),
      orders: new FormArray(controls, (formArray: FormArray) => {
        const totalSelected = formArray.controls
          // get a list of checkbox values (boolean)
          .map(control => control.value)
          // total up the number of checked checkboxes
          .reduce((prev, next) => next ? prev + next : prev, 0);

        // if the total is not greater than the minimum, return the error message
        return totalSelected >= 1 ? null : { required: true };
      })
    });
  }

  onSubmit(profileForm) {
    const selectedOrderIds = this.profileForm.value.orders
      .map((v, i) => v ? this.orders[i] : null)
      .filter(v => v !== null);

    console.log(selectedOrderIds);

    console.log(profileForm.value);
  }

}
