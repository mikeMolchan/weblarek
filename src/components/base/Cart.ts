import { IProduct } from '../../types';

export class Cart {
    private _products: IProduct[];

    constructor() {
        this._products = [];
    }

    public get products(): IProduct[] {
        return this._products;
    }

    public addProduct(product: IProduct): void {
        this._products.push(product);
    }

    public removeProduct(product: IProduct): void {
        const index = this._products.findIndex((item) => item.id === product.id);

        if (index !== -1) {
            this._products.splice(index, 1);
        }
    }

    public clear(): void {
        this._products = [];
    }

    public getTotal(): number {
        let total = 0;

        for (const product of this._products) {
            if (product.price !== null) {
                total = total + product.price;
            }
        }

        return total;
    }

    public getCount(): number {
        return this._products.length;
    }

    public hasProduct(id: string): boolean {
        for (const product of this._products) {
            if (product.id === id) {
                return true;
            }
        }

        return false;
    }
}