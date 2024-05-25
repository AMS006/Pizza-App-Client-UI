import { Card, CardContent, CardHeader } from "@/components/ui/card"
import CustomerDetails from "./components/customer-details"
import OrderSummary from "./components/order-summary"


const Checkout = async () => {

    return (
        <div className="container py-4">
            <div className="flex gap-4">
                <CustomerDetails />
                <OrderSummary />
            </div>
        </div>
    )
}

export default Checkout
