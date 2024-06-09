import { CircleCheck, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Rating } from '@smastrom/react-rating'
import { useState } from "react"
import '@smastrom/react-rating/style.css'
import { useToast } from "@/components/ui/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addReview } from "@/api/http"
import { useAppSelector } from "@/lib/redux/hooks"
import LoadingButton from "@/components/common/loading-button"

const SucessToast = () => {
    return (
        <>
            <div className="flex items-center gap-2">
                <CircleCheck className="text-green-700" />
                <span className="font-bold">Review Added Successfully</span>
            </div>
        </>
    );
};



export function ReviewModal() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { toast } = useToast();

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ['addReview'],
        mutationFn: (review: ReviewType) => addReview(review),
        onSuccess: (data) => {
            console.log('Review Added', data);
            toast({
                description: <SucessToast />,
            });
            queryClient.invalidateQueries({ queryKey: ['userOrderItems'] });
        },
    });
    const { selectedOrder } = useAppSelector(state => state.order);
    const { user } = useAppSelector(state => state.user);

    const handleSubmit = () => {
        if (rating === 0 || review === '') {
            toast({
                description: 'Please enter rating and review',
            });
            return;
        }
        const tenant = localStorage.getItem('selectedTenant');
        const tenantInfo = tenant ? JSON.parse(tenant) : null;

        console.log('tenantInfo', tenantInfo);
        const newReview = {
            rating,
            review,
            restaurantId: tenantInfo?.id,
            restaurantName: tenantInfo?.name,
            orderId: selectedOrder?._id,
            userName: user?.firstName + ' ' + user?.lastName,
        }

        mutate(newReview)
        // Submit review
        setIsModalOpen(false);
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Write Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Write a review
                    </DialogTitle>

                </DialogHeader>
                <div className="flex flex-col  items-center space-y-4 mt-4">
                    <Rating style={{ maxWidth: 180 }}
                        halfFillMode="box"
                        value={rating}
                        onChange={setRating} />
                    <Textarea id="rating" rows={3} placeholder="Enter you review" onChange={e => setReview(e.target.value)} />
                </div>
                <DialogFooter className="sm:justify-end mt-2">
                    {/* <DialogClose asChild> */}
                    <LoadingButton onClick={handleSubmit} text="Submit" loading={isPending} type="submit" variant="default" />

                    {/* </DialogClose> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
