import { GridLoader } from 'react-spinners'
const Loader = () => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <GridLoader color={'#f97316'} loading={true} size={18} />
        </div>
    )
}

export default Loader
