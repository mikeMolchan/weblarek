import { ensureElement } from '../../utils/utils';
import { Card } from './Card';
import { IProduct } from '../../types';
import { TCard } from './Card';
import { categoryMap } from '../../utils/constants';


type TCardPreview = TCard & Pick<IProduct, "image" | "category" | "description">
type CategoryKey = keyof typeof categoryMap;

interface ICardPreviewAction {
  onClick: () => void;
}

export class CardPreview extends Card<TCardPreview> {
  protected categoryElement: HTMLElement;
  protected textElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardPreviewAction) {
    super(container);

    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.textElement = ensureElement<HTMLElement>('.card__text', this.container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>('.card__button', this.container);

    if (actions?.onClick) {
      this.buttonElement.addEventListener('click', actions.onClick);
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      );
    }
  }

  set image(src: string) {
    this.setImage(this.imageElement, src, this.title);
  }

  set text(text: string) {
    this.textElement.textContent = text;
  }

  set inCart(isInCart: boolean) {
    this.buttonElement.textContent = isInCart ? 'Удалить из корзины' : 'Купить';
  }

  set price(value: number | null) {
    super.price = value;
    if (value === null) {
      this.buttonElement.textContent = 'Недоступно';
      this.buttonElement.disabled = true;
    }
  }
}