interface Product {
    _id: string
    name: string;
    image: string;
    description: string;
    price: number;
    categoryId: string;
    category: Category
    priceConfiguration: ProductPriceConfiguration
    isToppingAvailable: boolean;
}

interface Topping {
    _id: string;
    name: string;
    price: number;
    image: string;
}

interface Tenant {
    id: number;
    name: string;
    address: string;
}

interface Category {
    _id: string
    name: string
    priceConfiguration: PriceConfiguration

}

interface PriceConfiguration {
    [key: string]: {
        priceType: "base" | "aditional";
        availableOptions: number[];
    };
}

interface ProductPriceConfiguration {
    [key: string]: {
        priceType: 'base' | 'aditional';
        availableOptions: {
            [key: string]: number;
        };
    };
}

interface LoginUserData {
    email: string;
    password: string;
}

interface RegisterUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface AddressType {
    _id: string;
    name: string;
    mobile: string;
    addressLine1: string;
    addressLine2?: string;
    pincode: string;
    city: string;
    state: string;
    userId?: string;
}

interface OrderItemType {
    _id: string;
    qty: number;
    totalPrice: number;
    hash: string;
    image: string;
    name: string;
    chosenConfiguration: {
        priceConfiguration: {
            [key: string]: string;
        };
        selectedToppings: Topping[];
    };
    priceConfiguration: {
        [key: string]: {
            priceType: 'base' | 'aditional';
            availableOptions: {
                [key: string]: number;
            };
        };
    };
}

interface OrderType {
    _id?: string;
    orderId?: string;
    orderDate?: Date;
    orderItems: OrderItemType[];
    paymentMethod: string;
    restaurantId: string;
    restaurantName: string;
    addressId: string;
    userEmail: string;
    comment?: string;
    paymentStatus: string;
    orderAmount: number;
    customerName: string;
    discountPercent?: number;
    orderStatus?: string;
    address?: AddressType;
    isConfirmed?: boolean;
    isDelivered?: boolean;
    deliveryDate?: Date;
    isCancelled?: boolean;
    cancelDate?: Date;
    cancelReason?: string;
    isReviewAdded?: boolean;
}

interface ReviewType {
    _id?: string;
    userId?: string;
    userName: string;
    orderId?: string;
    review: string;
    rating: number;
    restaurantId: string;
}
