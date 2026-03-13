import { ensureElement } from '../../utils/utils';
import { Form } from './Form';
import { TForm } from './Form';
import { IEvents } from '../base/Events';

type TOrderForm = TForm & {
    payment: 'card' | 'cash';
};

export class OrderForm extends Form<TOrderForm> {
    protected cardButton: HTMLButtonElement;
    protected cashButton: HTMLButtonElement;
    protected addressInput: HTMLInputElement;
  
    constructor(events: IEvents, container: HTMLFormElement) {
      super(container);
  
      this.cardButton = ensureElement<HTMLButtonElement>(
        'button[name="card"]',
        this.container
      );
      this.cashButton = ensureElement<HTMLButtonElement>(
        'button[name="cash"]',
        this.container
      );
      this.addressInput = ensureElement<HTMLInputElement>(
        'input[name="address"]',
        this.container
      );
  
      this.cardButton.addEventListener('click', () => {
        events.emit('order:payment', { payment: 'card' });
      });
  
      this.cashButton.addEventListener('click', () => {
        events.emit('order:payment', { payment: 'cash' });
      });
  
      this.addressInput.addEventListener('input', () => {
        events.emit('order:change', {
          field: 'address',
          value: this.addressInput.value,
        });
      });

      this.container.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        events.emit(`orderForm:submit`);
      });
    }
  
    set payment(value: 'card' | 'cash') {
      this.cardButton.classList.toggle('button_alt-active', value === 'card');
      this.cashButton.classList.toggle('button_alt-active', value === 'cash');
    }
  }