import { cn } from '@/lib/utils'


interface TagProps {
    children: React.ReactNode
    type: 'success' | 'danger' | 'warning' | 'info'
}

const Tag = ({ children, type }: TagProps) => {



    return (
        <span className={cn('font-semibold border text-xs px-2 py-1 rounded-lg'
            , type === 'success' && 'text-green-500 border-green-500'
            , type === 'danger' && 'text-red-500 border-red-500'
            , type === 'warning' && 'text-yellow-500 border-yellow-500'
            , type === 'info' && 'text-blue-500 border-blue-500'

        )}>
            {children}
        </span>
    )
}

export default Tag