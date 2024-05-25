import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button';
import { MdAdd } from 'react-icons/md';
import AddressForm from './address-form';

interface AddAddressModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;

}

const AddAddressModal = ({ modalOpen, setModalOpen }: AddAddressModalProps) => {
    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger className="flex items-center justify-between gap-1.5 shadow outline-none border border-[#f97316]  focus:outline-none ease-linear duration-150 py-2 rounded-lg">
                <div className='flex flex-col justify-center items-center gap-2 w-full'>
                    <MdAdd size={20} />
                    <span>Add New Address</span>
                </div>

            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0">
                <AddressForm setModalOpen={setModalOpen} />
            </DialogContent>
        </Dialog>
    )
}

export default AddAddressModal
