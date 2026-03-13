import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

type TSuccess = {
    description: string;
}

export class Success extends Component<TSuccess> {
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(events: IEvents, container: HTMLElement) {
    super(container);
    
    this.descriptionElement = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

    this.buttonElement.addEventListener('click', () => {
      events.emit('success:close');
    });
  }

  set description(description: string) {
    this.descriptionElement.textContent = description;
  }
}