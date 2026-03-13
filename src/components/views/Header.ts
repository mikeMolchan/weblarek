import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

type THeader = {
  counter: number;
}

export class Header extends Component<THeader> {
  protected counterElement: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(events: IEvents, container: HTMLElement) {
    super(container);

    this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);

    this.basketButton.addEventListener('click', () => {
      events.emit('basket:open');
    });
  }

  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}