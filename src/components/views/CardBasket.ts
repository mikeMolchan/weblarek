import { ensureElement } from '../../utils/utils';
import { Card } from './Card';
import { IEvents } from '../base/Events';
import { TCard } from './Card';

export class CardBasket extends Card<TCard> {
  protected buttonElement: HTMLButtonElement;
  protected indexElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.buttonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);

    // this.basketButton.addEventListener('click', () => {
    //   this.events.emit('basket:open');
    // });
  }

  set index(index: number) {
    this.indexElement.textContent = String(index);
  }
}