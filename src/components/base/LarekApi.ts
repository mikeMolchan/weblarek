import { IApi, IProduct, IProductResponse, IOrderRequest, IOrderResponse } from '../../types';

export class LarekApi {
  private service: IApi;

  constructor(service: IApi) {
    this.service = service;
  }

  public getProducts(): Promise<IProduct[]> {
    return this.service.get<IProductResponse>('/product').then((data) => data.items);
  }

  public postOrder(order: IOrderRequest): Promise<IOrderResponse> {
    return this.service.post<IOrderResponse>('/order', order);
  }
}