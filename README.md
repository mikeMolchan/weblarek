# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.

## Данные
В приложении используется подход проектирования MVP.

### IProduct
Интерфейс товара, который приходит с сервера.

```ts
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}
```

- `id` — идентификатор товара.
- `description` — описание.
- `image` — путь к изображению.
- `title` — название товара.
- `category` — категория.
- `price` — цена, может быть `null`.

### TPayment
Тип способа оплаты

```ts
export type TPayment = "card" | "cash" | null;
```

### IBuyer
Интерфейс данных покупателя.

```ts
export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}
```

- `payment` — выбранный способ оплаты.
- `email` — email покупателя.
- `phone` — телефон покупателя.
- `address` — адрес доставки.

### Типы обмена с сервером

#### IProductResponse
Ответ сервера на `GET /product`.

```ts
export interface IProductResponse {
    total: number;
    items: IProduct[];
}
```

- `total` — количество товаров.
- `items` — массив товаров.

#### IOrderRequest
Тело запроса на `POST /order`. В проекте тип расширяет `IBuyer`.

```ts
export interface IOrderRequest extends IBuyer {
    total: number;
    items: string[];
}
```

- поля `payment/email/phone/address` - из `IBuyer`.
- `total` — итоговая сумма заказа.
- `items` — массив id товаров.

#### IOrderResponse
Ответ сервера на `POST /order`.

```ts
export interface IOrderResponse {
    id: string;
    total: number;
}
```

- `id` — идентификатор созданного заказа.
- `total` — итоговая сумма.

### Ошибки валидации покупателя

```ts
export type TBuyerErrors = Record<keyof IBuyer, string>;
```

В модели `Buyer.validate()` возвращается частичный объект ошибок: `Partial<TBuyerErrors>` (только поля с ошибками).

---

## Модели данных

Модели данных не зависят от UI и отвечают только за хранение/обработку данных.

### Catalogue (`src/components/base/Catalogue.ts`)

Класс Catalogue отвечает за: хранение каталога товаров и выбранного товара для подробного отображения.

Конструктор класса:
- `constructor()` — создаёт пустой каталог и сбрасывает выбранный товар.

Поля:
- `_products: IProduct[]` — массив товаров каталога.
- `_currProduct: IProduct | null` — выбранный товар или `null`.

Методы/аксессоры:
- `set products(products: IProduct[])` — сохраняет массив товаров в модель.
- `get products(): IProduct[]` — возвращает массив товаров.
- `getProductById(id: string): IProduct | null` — ищет товар по `id` и возвращает товар или `null`.
- `set currProduct(product: IProduct | null)` — сохраняет выбранный товар.
- `get currProduct(): IProduct | null` — возвращает выбранный товар.

---

### Cart (`src/components/base/Cart.ts`)

Класс Cart отвечает за: хранение товаров, выбранных пользователем, и расчёты (сумма/количество/проверка наличия).

Конструктор класса:
- `constructor()` — создаёт пустую корзину.

Поле:
- `_products: IProduct[]` — массив товаров в корзине.

Методы/аксессоры:
- `get products(): IProduct[]` — возвращает массив товаров корзины.
- `addProduct(product: IProduct): void` — добавляет товар в корзину.
- `removeProduct(product: IProduct): void` — удаляет первое совпадение товара по `id`.
- `clear(): void` — очищает корзину.
- `getTotal(): number` — возвращает сумму цен товаров, товары с `price === null` не учитываются.
- `getCount(): number` — возвращает количество товаров в корзине.
- `hasProduct(id: string): boolean` — проверяет наличие товара по `id`.

---

### Buyer (`src/components/base/Buyer.ts`)

Класс Buyer отвечает за: хранение и валидацию данных покупателя во время оформления заказа.

Конструктор класса:
- `constructor()` — создаёт пустые данные покупателя (payment = null, строки пустые).

Поля:
- `payment: TPayment` — способ оплаты.
- `email: string` — email.
- `phone: string` — телефон.
- `address: string` — адрес.

Методы:
- `setData(data: Partial<IBuyer>): void` — частично обновляет данные (можно передать только одно поле).
- `getData(): IBuyer` — возвращает текущие данные покупателя.
- `clear(): void` — очищает данные покупателя.
- `validate(): Partial<TBuyerErrors>` — возвращает ошибки валидации. Поле считается валидным, если оно не пустое, `payment` должен быть выбран.

---

## Слой коммуникации

`LarekApi` (`src/components/base/LarekApi.ts`) — класс коммуникационного слоя. Использует композицию: принимает в конструктор объект, реализующий `IApi`, и вызывает его `get`/`post`.

Класс LarekApi отвечает за:
- получение каталога товаров;
- отправку заказа.

Конструктор:
- `constructor(service: IApi)` — принимает API-клиент из базового кода.

Поле:
- `service: IApi` — объект для выполнения запросов к серверу.

Методы:
- `getProducts(): Promise<IProduct[]>` — `GET /product`, получает `IProductResponse` и возвращает `items`.
- `postOrder(order: IOrderRequest): Promise<IOrderResponse>` — `POST /order`, отправляет данные заказа и возвращает `{ id, total }`.

---

## Проверка (main.ts)
В `src/main.ts`:
- создаются экземпляры `Buyer`, `Cart`, `Catalogue`;
- тестируются их методы через `console.log`;
- выполняется запрос `getProducts()`;
- выполняется тестовый `postOrder()`.

## Слой представления (View)

Классы представления отвечают за отображение данных на странице. Не хранят данные и не содержат логику — только рендерят UI и сообщают презентеру о действиях пользователя через события.

---

### Gallery (`src/components/view/Gallery.ts`)

Отображает каталог товаров на главной странице.

Конструктор принимает элемент `<main class="gallery">`.

Сеттеры:
- `set items(items: HTMLElement[])` — заменяет содержимое галереи карточками.

---

### Header (`src/components/view/Header.ts`)

Отображает шапку сайта — счётчик корзины и кнопка её открытия.

Конструктор принимает `events` и контейнер шапки, вешает обработчик клика на кнопку корзины.

Поля:
- `counterElement: HTMLElement`
- `basketButton: HTMLButtonElement`

Сеттеры:
- `set counter(value: number)` — обновляет счётчик товаров.

События:
- `basket:open` — клик на кнопку корзины.

---

### Modal (`src/components/view/Modal.ts`)

Отображает модальное окно. Не имеет наследников — контент передаётся как самостоятельный компонент.

Конструктор принимает `events` и контейнер модалки, вешает обработчики закрытия на крестик и оверлей.

Поля:
- `contentElement: HTMLElement`
- `buttonElement: HTMLButtonElement`

Сеттеры:
- `set content(value: HTMLElement)` — заменяет содержимое модального окна.

Методы:
- `open()` — добавляет модификатор `modal_active`.
- `close()` — удаляет модификатор `modal_active`.

События:
- `modal:close` — клик на крестик или оверлей.

---

### Card (`src/components/view/Card.ts`)

Базовый класс для всех карточек товара. Содержит общий функционал — цена и название.

Конструктор принимает контейнер карточки.

Поля:
- `priceElement: HTMLElement`
- `titleElement: HTMLElement`

Сеттеры:
- `set price(value: number | null)` — устанавливает цену, если `null` выводит «Бесценно».
- `set title(value: string)`

---

### CardCatalog (`src/components/view/CardCatalog.ts`)

Карточка товара в каталоге на главной странице. Наследуется от `Card`.

Конструктор принимает контейнер и `actions?: ICardCatalogActions`, вешает обработчик клика на контейнер.

Поля:
- `categoryElement: HTMLElement`
- `imageElement: HTMLImageElement`

Сеттеры:
- `set category(value: string)` — устанавливает категорию и CSS-модификатор через `categoryMap`.
- `set image(value: string)` — устанавливает изображение через `setImage`.

События передаются через `actions.onClick`, `emit` вызывается в презентере.

---

### CardPreview (`src/components/view/CardPreview.ts`)

Детальная карточка товара в модальном окне. Наследуется от `Card`.

Конструктор принимает контейнер и `actions?: ICardPreviewAction`, вешает обработчик клика на кнопку.

Поля:
- `categoryElement: HTMLElement`
- `imageElement: HTMLImageElement`
- `textElement: HTMLElement`
- `buttonElement: HTMLButtonElement`

Сеттеры:
- `set category(value: string)` — устанавливает категорию с CSS-модификатором.
- `set image(value: string)`
- `set text(value: string)`
- `set inCart(value: boolean)` — меняет текст кнопки («Купить» / «Удалить из корзины»).
- `set price(value: number | null)` — если `null`, блокирует кнопку и устанавливает текст «Недоступно».

События передаются через `actions.onClick`, `emit` вызывается в презентере.

---

### CardBasket (`src/components/view/CardBasket.ts`)

Карточка товара в корзине. Наследуется от `Card`.

Конструктор принимает контейнер и `actions?: ICardBasketActions`, вешает обработчик клика на кнопку удаления.

Поля:
- `buttonElement: HTMLButtonElement`
- `indexElement: HTMLElement`

Сеттеры:
- `set index(value: number)` — устанавливает порядковый номер.

События передаются через `actions.onRemove`, `emit` вызывается в презентере.

---

### Basket (`src/components/view/Basket.ts`)

Отображает корзину в модальном окне.

Конструктор принимает `events` и контейнер корзины, вешает обработчик на кнопку «Оформить».

Поля:
- `listElement: HTMLUListElement`
- `totalElement: HTMLElement`
- `buttonElement: HTMLButtonElement`

Сеттеры:
- `set items(items: HTMLElement[])` — заменяет список товаров.
- `set total(value: number)` — устанавливает итоговую сумму.
- `set valid(value: boolean)` — активирует/деактивирует кнопку оформления.

События:
- `order:open` — клик на кнопку «Оформить».

---

### Form (`src/components/view/Form.ts`)

Базовый класс для форм оформления заказа.

Конструктор принимает контейнер формы, находит кнопку сабмита и элемент ошибок.

Поля:
- `submitButton: HTMLButtonElement`
- `errorsElement: HTMLElement`

Сеттеры:
- `set valid(value: boolean)` — активирует/деактивирует кнопку сабмита.
- `set errors(value: string)` — выводит текст ошибки.

---

### OrderForm (`src/components/view/OrderForm.ts`)

Первый шаг оформления — выбор оплаты и адрес доставки. Наследуется от `Form`.

Конструктор принимает `events` и контейнер формы, вешает обработчики на кнопки оплаты, поле адреса и сабмит.

Поля:
- `cardButton: HTMLButtonElement`
- `cashButton: HTMLButtonElement`
- `addressInput: HTMLInputElement`

Сеттеры:
- `set payment(value: 'card' | 'cash')` — выделяет активную кнопку оплаты через `button_alt-active`.

События:
- `order:payment` — выбор способа оплаты, передаёт `{ payment }`.
- `order:change` — ввод адреса, передаёт `{ field, value }`.
- `orderForm:submit` — сабмит формы.

---

### ContactsForm (`src/components/view/ContactsForm.ts`)

Второй шаг оформления — email и телефон. Наследуется от `Form`.

Конструктор принимает `events` и контейнер формы, вешает обработчики на инпуты и сабмит.

Поля:
- `emailInput: HTMLInputElement`
- `phoneInput: HTMLInputElement`

Сеттеры:
- `set email(value: string)`
- `set phone(value: string)`

События:
- `contacts:change` — ввод данных, передаёт `{ field, value }`.
- `contactForm:submit` — сабмит формы.

---

### Success (`src/components/view/Success.ts`)

Экран успешного оформления заказа.

Конструктор принимает `events` и контейнер, вешает обработчик на кнопку.

Поля:
- `descriptionElement: HTMLElement`
- `buttonElement: HTMLButtonElement`

Сеттеры:
- `set description(value: string)` - устанавливает текст с суммой заказа.

События:
- `success:close` — клик на кнопку «За новыми покупками».

---

## События приложения

### View → Presenter

| `basket:open` | Header | — | Клик на иконку корзины |
| `modal:close` | Modal | — | Клик на крестик или оверлей |
| `order:open` | Basket | — | Клик на кнопку «Оформить» |
| `order:payment` | OrderForm | `{ payment }` | Выбор способа оплаты |
| `order:change` | OrderForm | `{ field, value }` | Ввод адреса доставки |
| `orderForm:submit` | OrderForm | — | Сабмит первой формы |
| `contacts:change` | ContactsForm | `{ field, value }` | Ввод email или телефона |
| `contactForm:submit` | ContactsForm | — | Сабмит второй формы |
| `success:close` | Success | — | Клик на кнопку «За новыми покупками» |

### Model → Presenter

| `catalogue:changed` | Catalogue | `{ products }` | Каталог товаров загружен или обновлён |
| `currProduct:changed` | Catalogue | `{ product }` | Пользователь выбрал товар для просмотра |
| `cart:changed` | Cart | `{ products }` | Содержимое корзины изменилось |
| `buyer:changed` | Buyer | `{ payment, email, phone, address }` | Данные покупателя обновились |

---

## Презентер (`src/main.ts`)

Презентер реализован в `main.ts` без выделения в отдельный класс. Он создаёт экземпляры всех слоёв, подписывается на события моделей и представлений и описывает логику их взаимодействия. Презентер не генерирует события — только обрабатывает их.

### Инициализация

При старте приложения создаются:
- `EventEmitter` — единая шина событий для всего приложения
- `Api` и `LarekApi` — коммуникационный слой
- Модели: `Catalogue`, `Cart`, `Buyer`
- Компоненты View: `Header`, `Gallery`, `Modal`, `Basket`, `OrderForm`, `ContactsForm`, `Success`

После инициализации выполняется запрос `getProducts()` — полученные товары сохраняются в `Catalogue`, что вызывает событие `catalogue:changed`.

### Обработчики событий

`catalogue:changed`
Рендерит каталог карточек на главной странице и обновляет счётчик корзины в шапке.

`currProduct:changed`
Создаёт `CardPreview` с данными выбранного товара и открывает модальное окно.

`cart:changed`
Обновляет счётчик корзины в шапке и перерисовывает список товаров в `Basket`.

`card:select`
Находит товар по `id` в каталоге и записывает его в `catalogue.currProduct`.

`basket:open`
Формирует список карточек корзины и открывает модальное окно с `Basket`.

`order:open`
Открывает модальное окно с первой формой оформления заказа `OrderForm`.

`order:payment`
Сохраняет способ оплаты в `Buyer`, обновляет состояние `OrderForm` — подсвечивает активную кнопку, валидирует форму.

`order:change`
Сохраняет адрес доставки в `Buyer`, валидирует `OrderForm` и обновляет её состояние.

`orderForm:submit`
Проверяет валидность первого шага — если ошибок нет, открывает `ContactsForm`.

`contacts:change`
Сохраняет email или телефон в `Buyer`, валидирует `ContactsForm` и обновляет её состояние.

`contactForm:submit`
Проверяет валидность второго шага — если ошибок нет, отправляет заказ на сервер через `postOrder`. После успешного ответа очищает корзину и данные покупателя, открывает экран `Success`.

`modal:close` / `success:close`
Закрывает модальное окно.