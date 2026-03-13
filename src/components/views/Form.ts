import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

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
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value;
  }

  set errors(errors: string) {
    this.errorsElement.textContent = errors;
  }
}