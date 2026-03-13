import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IProduct } from '../../types';

export type TCard = Pick<IProduct, "price" | "title">

export class Card<T> extends Component<T> {
  protected priceElement: HTMLElement;
  protected titleElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
  }

  set price(value: number | null) {
    this.priceElement.textContent = value === null ? 'Бесценно' : `${value} синапсов`;
  }

  set title(title: string) {
    this.titleElement.textContent = title;
  }
}