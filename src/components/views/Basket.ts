import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
// import { IEvents } from '../base/Events';

type IBasket = {
    items: HTMLElement[];
    total: number;
  }
  
export class Basket extends Component<IBasket> {
    protected listElement: HTMLUListElement;
    protected totalElement: HTMLElement;
    protected buttonElement: HTMLButtonElement;

    // events: IEvents, 
    constructor(container: HTMLElement) {
        super(container);

        this.listElement = ensureElement<HTMLUListElement>(
        '.basket__list',
        this.container
        );
        this.totalElement = ensureElement<HTMLElement>(
        '.basket__price',
        this.container
        );
        this.buttonElement = ensureElement<HTMLButtonElement>(
        '.basket__button',
        this.container
        );

        // this.buttonElement.addEventListener('click', () => {
        // events.emit('order:open');
        // });
    }

    set items(items: HTMLElement[]) {
        this.listElement.replaceChildren(...items);
    }

    set total(total: number) {
        this.totalElement.textContent = `${total} синапсов`;
    }

    set valid(isDisabled: boolean) {
        this.buttonElement.disabled = isDisabled;
    }
}