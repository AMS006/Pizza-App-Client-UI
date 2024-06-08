import React from 'react'
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps {
    loading: boolean;
    onClick: () => void;
    variant: 'default' | 'destructive' | 'ghost' | 'secondary' | 'link' | 'outline';
    text: string;
    type: 'button' | 'submit' | 'reset';
    className?: string;
}

const LoadingButton = ({ loading, text, onClick, variant, type = 'button', className }: LoadingButtonProps) => {
    return (
        <Button type={type} variant={variant} className={className} disabled={loading} onClick={onClick}>
            {loading && <LoaderCircle size={24} className='animate-spin mr-1.5' />}
            {text}
        </Button>

    )
}

export default LoadingButton
