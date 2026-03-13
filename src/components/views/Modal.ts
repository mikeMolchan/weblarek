import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

export class Modal extends Component<{}> {
  protected contentElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);

    this.buttonElement = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container);
  }
}