import { divPlayer0, divPlayer1, divPlayer2, divPlayer3, divUnclaimed } from '../utils/players';

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
                return divPlayer0;
            case 1:
                return divPlayer1;
            case 2:
                return divPlayer2;
            case 3:
                return divPlayer3;
            case null:
                return <div onClick={() => {onClick ? onClick(index) : null}} className='w-[60px] h-[60px] rounded bg-beige-2' />
            default:
                return divUnclaimed;
        }
    }

   return getDiv(value);


};

export default Cell