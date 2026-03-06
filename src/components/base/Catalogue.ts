import { IProduct } from '../../types';

export class Catalogue {
    private _products: IProduct[];
    private _currProduct: IProduct | null;

    constructor() {
        this._products = [];
        this._currProduct = null;
    }

    public set products(products: IProduct[]) {
        this._products = products;
    }

    public get products(): IProduct[] {
        return this._products;
    }

    public getProductById(id: string): IProduct | null {
        for(const product of this._products) {
            if (product.id === id) {
                return product;
            }
        }

        return null;
    }

    public set currProduct(product: IProduct | null) {
        this._currProduct = product;
    }

    public get currProduct(): IProduct | null {
        return this._currProduct;
    }
}