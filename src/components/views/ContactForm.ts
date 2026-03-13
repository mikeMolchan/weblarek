import { ensureElement } from '../../utils/utils';
import { Form } from './Form';
import { TForm } from './Form';
import { IEvents } from '../base/Events';

type TContactForm = TForm & {
    email: string;
    phone: string;
};

export class ContactsForm extends Form<TContactForm> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(events: IEvents, container: HTMLFormElement) {
      super(container);
  
      this.emailInput = ensureElement<HTMLInputElement>(
        'input[name="email"]',
        this.container
      );
      this.phoneInput = ensureElement<HTMLInputElement>(
        'input[name="phone"]',
        this.container
      );
  
      this.emailInput.addEventListener('input', () => {
        events.emit('contacts:change', {
          field: 'email',
          value: this.emailInput.value,
        });
      });
  
      this.phoneInput.addEventListener('input', () => {
        events.emit('contacts:change', {
          field: 'phone',
          value: this.phoneInput.value,
        });
      });

      this.container.addEventListener('submit', (e: Event) => {
        e.preventDefault();
        events.emit(`contactForm:submit`);
      });
    }
  }