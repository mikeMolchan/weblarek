import { IBuyer, TPayment, TBuyerErrors } from '../../types';

export class Buyer {
  private payment: TPayment = null;
  private email: string = '';
  private phone: string = '';
  private address: string = '';

  public setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) {
      this.payment = data.payment;
    }

    if (data.email !== undefined) {
      this.email = data.email;
    }

    if (data.phone !== undefined) {
      this.phone = data.phone;
    }

    if (data.address !== undefined) {
      this.address = data.address;
    }
  }

  public getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  public clear(): void {
    this.payment = null;
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  public validate(): Partial<TBuyerErrors> {
    const errors: Partial<TBuyerErrors> = {};

    if (this.payment === null) {
      errors.payment = 'Не выбран вид оплаты';
    }

    if (this.address.trim().length === 0) {
      errors.address = 'Укажите адрес доставки';
    }

    if (this.email.trim().length === 0) {
      errors.email = 'Укажите email';
    }

    if (this.phone.trim().length === 0) {
      errors.phone = 'Укажите телефон';
    }

    return errors;
  }
}