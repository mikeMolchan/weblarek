import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class Cart {
    private _products: IProduct[];

    constructor(private events: IEvents) {
        this._products = [];
    }

    public get products(): IProduct[] {
        return this._products;
    }

    public addProduct(product: IProduct): void {
        this._products.push(product);
        this.events.emit('cart:changed', { products: this._products });
    }

    public removeProduct(product: IProduct): void {
        const index = this._products.findIndex((item) => item.id === product.id);
        if (index !== -1) {
            this._products.splice(index, 1);
            this.events.emit('cart:changed', { products: this._products });
        }
    }

    public clear(): void {
        this._products = [];
        this.events.emit('cart:changed', { products: this._products });
    }

    public getTotal(): number {
        return this._products.reduce((acc, item) => acc + (item.price ?? 0), 0);
    }

    public getCount(): number {
        return this._products.length;
    }

    public hasProduct(id: string): boolean {
        return this._products.some(item => item.id === id);
    }
}