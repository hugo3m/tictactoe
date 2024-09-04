import {FC} from 'react'
import { HTMLFactory } from 'react';
import { Nullable } from "../utils/type"

type Props = {
    index: number,
    value: Nullable<number>,
    onClick: (index: number) => void,
}

const Cell: FC<Props> = ({
    index,
    onClick,
    value
}) => {


    const getDiv = (value: Nullable<number>): JSX.Element => {
        switch(value)
        {
            case 0:
                return <div className='w-[60px] h-[60px] border-[16px] rounded-full border-purple-5'/>
            case 1:
                return <div className='w-[60px] h-[60px] border-[16px] border-green-3' />
            case null:
                return <div onClick={() => {onClick ? onClick(index) : null}} className='w-[60px] h-[60px] rounded bg-beige-2' />
            default:
                return <div className='w-[60px] h-[60px] rounded bg-beige-2' />
        }
    }

   return getDiv(value);


};

export default Cell