import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

type TSuccess = {
    description: string;
}

export class Success extends Component<TSuccess> {
  protected titleElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);
    
    this.titleElement = ensureElement<HTMLElement>('.order-success__title', this.container);
    this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
  }

  set description(description: string) {
    this.descriptionElement.textContent = description;
  }
}