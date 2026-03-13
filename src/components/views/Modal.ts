import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

type TModal = {
  content: HTMLElement;
}

export class Modal extends Component<TModal> {
  protected contentElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(events: IEvents, container: HTMLElement) {
    super(container);

    this.buttonElement = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);

    this.buttonElement.addEventListener('click', () => {
      events.emit('modal:close');
    });

    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) {
        events.emit('modal:close');
      }
    });
  }

  set content(content: HTMLElement) {
    this.contentElement.replaceChildren(content);
  }
}