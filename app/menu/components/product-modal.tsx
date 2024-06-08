'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import ToppingList from "./topping-list"
import { CircleCheck, ShoppingBasket } from "lucide-react"
import React, { Suspense, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { addToCart } from "@/lib/redux/features/cart/cartSlice"
import { cn, hashItem } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"


interface ProductModalProps {
    product: Product
}

type ChosenConfig = {
    [key: string]: string;
};

const SucessToast = () => {
    return (
        <>
            <div className="flex items-center gap-2">
                <CircleCheck className="text-green-700" />
                <span className="font-bold">Added to cart</span>
            </div>
        </>
    );
};


const ProductModal = ({ product }: ProductModalProps) => {

    const dispatch = useAppDispatch();
    const [modalOpen, setModalOpen] = useState(false)
    const { cartItems } = useAppSelector(state => state.cart);
    const { toast } = useToast();


    const [selectedToppings, setSelectedToppings] = useState<Topping[]>([])
    const onToppingSelect = (topping: Topping) => {
        if (selectedToppings.includes(topping)) {
            setSelectedToppings(selectedToppings.filter((selectedTopping) => selectedTopping._id !== topping._id))
        } else {
            setSelectedToppings([...selectedToppings, topping])
        }
    }

    const defaultConfiguration = Object.entries(product.category.priceConfiguration)
        .map(([key, value]) => {
            return { [key]: value.availableOptions[0] };
        })
        .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const [chosenConfig, setChosenConfig] = useState<ChosenConfig>(
        defaultConfiguration as unknown as ChosenConfig
    );

    const handleConfigChange = (key: string, value: string) => {
        setChosenConfig((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    const handleAddToCart = () => {

        const cartItem = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            chosenConfiguration: {
                priceConfiguration: chosenConfig,
                selectedToppings: selectedToppings,
            },
            totalPrice,
            qty: 1,

        };

        // Add cart Item to localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const hash = hashItem(cartItem);
        localStorage.setItem('cart', JSON.stringify([...cart, { ...cartItem, hash }]));
        dispatch(addToCart(cartItem));
        setModalOpen(false);

        toast({
            // @ts-ignore
            description: <SucessToast />,


        })
    }

    const totalPrice = React.useMemo(() => {
        const toppingsTotal = selectedToppings.reduce((acc, curr) => acc + curr.price, 0);

        const configTotal = Object.entries(chosenConfig).reduce((acc, [key, value]) => {

            const price = product.priceConfiguration[key].availableOptions[value];
            return acc + price;
        }, 0);

        return configTotal + toppingsTotal;
    }, [chosenConfig, selectedToppings, product.priceConfiguration]);

    const isItemInCart = React.useMemo(() => {
        const cartData = {
            _id: product._id,
            name: product.name,
            image: product.image,
            priceConfiguration: product.priceConfiguration,
            chosenConfiguration: {
                priceConfiguration: chosenConfig,
                selectedToppings: selectedToppings,
            },
            totalPrice,
            qty: 1,

        };
        const hash = hashItem(cartData);

        return cartItems.some((item) => item.hash === hash);


    }, [cartItems, chosenConfig, selectedToppings, totalPrice, product]);




    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger className="bg-orange-200 hover:bg-orange-300  text-orange-500 px-4 shadow outline-none focus:outline-none ease-linear duration-150 py-2 rounded-lg">
                Choose
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0">
                <div className="flex">
                    <div className="bg-white h-full w-1/3 flex justify-center items-center px-4">
                        <Image src={product.image} alt="Product Image" width={450} height={450} />
                    </div>
                    <div className="flex flex-col gap-4 bg-background w-2/3 px-4 py-6">

                        {
                            Object.entries(product.category.priceConfiguration).map(([key, value]) => {
                                return (
                                    <div key={key}>
                                        <h3 className="">Choose the {key}</h3>
                                        <RadioGroup
                                            onValueChange={(value) => handleConfigChange(key, value)}
                                            defaultValue={String(value.availableOptions[0])} className="grid grid-cols-3 gap-4 mt-2">
                                            {
                                                value.availableOptions && value?.availableOptions?.map((item) => {
                                                    return (
                                                        <div key={item}>
                                                            <RadioGroupItem
                                                                value={String(item)}
                                                                id={String(item)}
                                                                aria-label={String(item)}
                                                                className="peer sr-only"
                                                            />

                                                            <Label
                                                                htmlFor={String(item)}
                                                                className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                            >
                                                                {item}
                                                            </Label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                    </div>
                                )
                            })
                        }

                        <div>
                            <h3>Extra Toppings</h3>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ToppingList selectedToppings={selectedToppings} onToppingSelect={onToppingSelect} />
                            </Suspense>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">₹{totalPrice}</span>
                            <Button
                                disabled={isItemInCart}
                                onClick={handleAddToCart}
                                className={cn("bg-primary  text-white px-4 py-2 rounded-lg", isItemInCart && 'bg-green-700')}
                            >
                                <ShoppingBasket className="mr-2" size={24} />
                                {isItemInCart ? 'Item Already In Cart' : 'Add to Cart'}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductModal
