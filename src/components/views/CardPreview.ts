import { ensureElement } from '../../utils/utils';
import { Card } from './Card';
import { IEvents } from '../base/Events';
import { IProduct } from '../../types';
import { TCard } from './Card';

type TCardPreview = TCard | Pick<IProduct, "image" | "category" | "description">

export class CardPreview extends Card<TCardPreview> {
  protected categoryElement: HTMLElement;
  protected textElement: HTMLElement;
  protected imageElement: HTMLImageElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.textElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);

    // this.basketButton.addEventListener('click', () => {
    //   this.events.emit('basket:open');
    // });
  }

  set category(category: string) {
    this.categoryElement.textContent = category;
  }

  set image(src: string) {
    this.setImage(this.imageElement, src, this.title);
  }

  set text(text: string) {
    this.textElement.textContent = text;
  }
}