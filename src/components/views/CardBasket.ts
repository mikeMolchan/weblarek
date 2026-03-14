import { ensureElement } from '../../utils/utils';
import { Card } from './Card';
import { TCard } from './Card';

interface ICardBasketActions {
  onRemove: () => void;
}

type TCardBasket = TCard & {index: number};

export class CardBasket extends Card<TCardBasket> {
  protected buttonElement: HTMLButtonElement;
  protected indexElement: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardBasketActions) {
    super(container);

    this.buttonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);

    this.buttonElement.addEventListener('click', () => {
      actions?.onRemove();
    });
  }

  set index(index: number) {
    this.indexElement.textContent = String(index);
  }
}