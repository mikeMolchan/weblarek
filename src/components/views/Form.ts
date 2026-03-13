import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
// import { IEvents } from '../base/Events';

export type TForm = {
    valid: boolean;
    errors: string;
}

export class Form<T> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(container: HTMLFormElement) {
    super(container);

    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container
    );

    this.errorsElement = ensureElement<HTMLElement>(
      '.form__errors',
      this.container
    );

    // this.container.addEventListener('input', (e: Event) => {
    //   const target = e.target as HTMLInputElement;
    //   this.events.emit('form:change', {
    //     field: target.name,
    //     value: target.value,
    //   });
    // });

    // this.container.addEventListener('submit', (e: Event) => {
    //   e.preventDefault();
    //   actions?.onSubmit();
    // });
  }

  set valid(isDisabled: boolean) {
    this.submitButton.disabled = isDisabled;
  }

  set errors(errors: string) {
    this.errorsElement.textContent = errors;
  }
}