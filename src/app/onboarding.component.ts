import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  template: ` <div id="pw-oboarding"></div> `,
})
export class OnboardingComponent implements OnInit, OnDestroy {
  id = 'onboarding-sdk-script';
  constructor(protected zone: NgZone) {}

  ngOnInit() {
    this.registerScript(
      'http://localhost:4000/sdk/onboarding/onboarding.sdk.js',
      (PW: any) => {
        console.log('load script success');
        PW.Onboarding({
          token: 'eGluIGNoYW8gY2FjcyBiYW5q',
          mode: 'inline',
        }).mount('#pw-oboarding');
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

  ngOnDestroy(): void {
    const scriptElem = document.getElementById(this.id);

    if (scriptElem) {
      scriptElem.remove();
    }
  }
}
