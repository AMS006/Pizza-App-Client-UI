interface Product {
    _id: string
    name: string;
    image: string;
    description: string;
    price: number;
    categoryId: string;
    category: Category
    priceConfiguration: ProductPriceConfiguration
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
    name: string;
    mobile: string;
    house: string;
    area: string;
    landmark?: string;
    pincode: string;
    city: string;
    state: string;
}
