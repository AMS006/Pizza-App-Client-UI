import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"
import ToppingList from "./topping-list"
import { ShoppingBasket } from "lucide-react"
import { Suspense } from "react"


interface ProductModalProps {
    product: Product
}


const ProductModal = ({ product }: ProductModalProps) => {
    return (
        <Dialog>
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
                                        <RadioGroup defaultValue={String(value.availableOptions[0])} className="grid grid-cols-3 gap-4 mt-2">
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
                                <ToppingList />
                            </Suspense>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">₹220</span>
                            <Button className="bg-primary  text-white px-4 py-2 rounded-lg">
                                <ShoppingBasket className="mr-2" size={24} />
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductModal
