import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-onboarding',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  styles: [
    `
      form {
        display: flex;
        gap: 1rem;
        margin: 2rem 0;
      }
      label {
        margin-right: 0.5rem;
      }
    `,
  ],
  template: `
    <div>Sdk urk: {{ sdkUrl }}</div>
    <form (ngSubmit)="onSubmit()" [formGroup]="form">
      <div>
        <label>Token</label>
        <input type="text" formControlName="token" />
      </div>
      <div>
        <label>Mode</label>
        <select formControlName="mode">
          <option value="inline">Inline</option>
          <option value="modal">Modal</option>
        </select>
      </div>
      <button [disabled]="!loaded">Submit</button>
      <div *ngIf="error">{{ error }}</div>
    </form>

    <div id="pw-oboarding"></div>
  `,
})
export class OnboardingComponent implements OnInit, OnDestroy {
  sdkUrl =
    'https://merchant-area-test.vercel.app/sdk/onboarding/onboarding.sdk.js';
  id = 'onboarding-sdk-script';
  form: FormGroup;
  loaded = false;
  error = '';
  constructor(protected zone: NgZone, private fb: FormBuilder) {
    this.form = this.fb.group({
      token: 'eGluIGNoYW8gY2FjcyBiYW5q',
      mode: 'inline',
    });
  }

  ngOnInit() {
    this.registerScript(
      'https://merchant-area-test.vercel.app/sdk/onboarding/onboarding.sdk.js',
      (PW: any) => {
        console.log('load script success');
        this.loaded = true;
      }
    );
  }

  registerScript(url: string, onReady: (globalVar: any) => void) {
    const scriptElem = document.createElement('script');
    scriptElem.id = this.id;
    scriptElem.innerHTML = '';
    scriptElem.onload = () => {
      this.zone.run(() => {
        onReady((window as any)['PW']);
      });
    };
    scriptElem.src = url;
    scriptElem.async = true;
    scriptElem.defer = true;

    // add script to header
    document.getElementsByTagName('head')[0].appendChild(scriptElem);
  }

  onSubmit() {
    if (!this.form.value.token.trim()) {
      this.error = 'Pls enter user token';
      return;
    }
    console.log((window as any).PW);
    (window as any).PW.Onboarding(this.form.value).mount('#pw-oboarding');
  }

  ngOnDestroy(): void {
    const scriptElem = document.getElementById(this.id);

    if (scriptElem) {
      scriptElem.remove();
    }
  }
}
