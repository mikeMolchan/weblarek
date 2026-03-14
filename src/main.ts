import './scss/styles.scss';
import { EventEmitter } from './components/base/Events';
import { Api } from './components/base/Api';
import { LarekApi } from './components/LarekApi';
import { Catalogue } from './components/models/Catalogue';
import { Cart } from './components/models/Cart';
import { CardBasket } from './components/views/CardBasket';
import { CardCatalog } from './components/views/CardCatalog';
import { CardPreview } from './components/views/CardPreview';
import { Buyer } from './components/models/Buyer';
import { Header } from './components/views/Header';
import { Gallery } from './components/views/Gallery';
import { Modal } from './components/views/Modal';
import { Basket } from './components/views/Basket';
import { OrderForm } from './components/views/OrderForm';
import { ContactsForm } from './components/views/ContactForm';
import { Success } from './components/views/Success';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

// Api and Events Emitter
const events = new EventEmitter();
const api = new Api(API_URL);
const service = new LarekApi(api);

// Models
const catalogue = new Catalogue(events);
const cart = new Cart(events);
const buyer = new Buyer(events);

// Views
const header = new Header(events, ensureElement('.header'));
const gallery = new Gallery(ensureElement('.gallery'));
const modal = new Modal(events, ensureElement('#modal-container'));

const basket = new Basket(events, cloneTemplate('#basket'));
const orderForm = new OrderForm(events, cloneTemplate('#order'));
const contactsForm = new ContactsForm(events, cloneTemplate('#contacts'));
const success = new Success(events, cloneTemplate('#success'));

// Products
service.getProducts()
    .then(products => catalogue.products = products)
    .catch(console.error);

// Presenter

// Model events
events.on('catalogue:changed', () => {
    const items = catalogue.products.map(product => {
        const card = new CardCatalog(cloneTemplate('#card-catalog'), {
            onClick: () => events.emit('card:select', { id: product.id })
        });
        return card.render({
            title: product.title,
            price: product.price,
            image: CDN_URL + product.image,
            category: product.category
        });
    });

    gallery.render({ items });
    header.render({ counter: cart.getCount() });
});

events.on('cart:changed', () => {
    header.render({ counter: cart.getCount() });

    const items = cart.products.map((product, index) => {
        const card = new CardBasket(cloneTemplate('#card-basket'), {
            onRemove: () => cart.removeProduct(product)
        });
        return card.render({
            title: product.title,
            price: product.price,
            index: index + 1
        });
    });

    basket.render({
        items,
        total: cart.getTotal(),
        valid: cart.getCount() > 0,
    });
});

// View events
events.on('card:select', ({ id }: { id: string }) => {
    console.log('card:select', id);
    const product = catalogue.getProductById(id);
    if (!product) return;

    catalogue.currProduct = product;
});

events.on('currProduct:changed', () => {
    console.log('currProduct:changed', catalogue.currProduct);
    const product = catalogue.currProduct;
    if (!product) return;

    const card = new CardPreview(cloneTemplate('#card-preview'), {
        onClick: () => {
            if (cart.hasProduct(product.id)) {
                cart.removeProduct(product);
            } else {
                cart.addProduct(product);
            }
            modal.close();
        }
    });

    modal.render({
        content: card.render({
            title: product.title,
            price: product.price,
            image: CDN_URL + product.image,
            category: product.category,
            description: product.description,
            inCart: cart.hasProduct(product.id)
        })
    });
    modal.open();
});

events.on('basket:open', () => {
    const items = cart.products.map((product, index) => {
        const card = new CardBasket(cloneTemplate('#card-basket'), {
            onRemove: () => cart.removeProduct(product)
        });
        return card.render({
            title: product.title,
            price: product.price,
            index: index + 1
        });
    });

    modal.render({
        content: basket.render({
            items,
            total: cart.getTotal(),
            valid: cart.getCount() > 0
        })
    });
    modal.open();
});

events.on('order:open', () => {
    modal.render({
        content: orderForm.render({
            payment: buyer.getData().payment ?? undefined,
            valid: false,
            errors: ''
        })
    });
});

events.on('order:payment', ({ payment }: { payment: 'card' | 'cash' }) => {
    buyer.setData({ payment });
    const errors = buyer.validate();
    orderForm.render({
        payment,
        valid: !errors.payment && !errors.address,
        errors: Object.values(errors).filter(e => 
            e === errors.payment || e === errors.address
        ).join(', ')
    });
});

events.on('order:change', ({ field, value }: { field: string, value: string }) => {
    buyer.setData({ [field]: value });
    const errors = buyer.validate();
    orderForm.render({
        valid: !errors.payment && !errors.address,
        errors: Object.values(errors).filter(e =>
            e === errors.payment || e === errors.address
        ).join(', ')
    });
});

events.on('orderForm:submit', () => {
    const errors = buyer.validate();
    if (errors.payment || errors.address) return;

    modal.render({
        content: contactsForm.render({
            valid: false,
            errors: '',
        })
    });
});

events.on('contacts:change', ({ field, value }: { field: string, value: string }) => {
    buyer.setData({ [field]: value });
    const errors = buyer.validate();
    contactsForm.render({
        valid: !errors.email && !errors.phone,
        errors: Object.values(errors).filter(e =>
            e === errors.email || e === errors.phone
        ).join(', '),
    });
});

events.on('contactForm:submit', () => {
    const errors = buyer.validate();
    if (errors.email || errors.phone) return;

    const order = {
        ...buyer.getData(),
        items: cart.products.map(p => p.id),
        total: cart.getTotal(),
    };

    service.postOrder(order)
        .then(result => {
            cart.clear();
            buyer.clear();

            modal.render({
                content: success.render({
                    description: `Списано ${result.total} синапсов`,
                })
            });
        })
        .catch(console.error);
});

events.on('modal:close', () => {
    modal.close();
});

events.on('success:close', () => {
    modal.close();
});