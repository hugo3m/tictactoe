'use client';

import { ReactNode, useEffect, useState } from 'react';

import Cell from './components/Cell';
import { Nullable } from './utils/type';

function TickTacToe() {
  // Edit the logic here
  // Remember you can change this however you like, into different files, using different libraries etc. This is just a starting point.

  // this is a client component, so you can use react hooks here, .i.e.
  const numberPlayers = 2;

  const [player, setPlayer] = useState(0);
  const [cells, setCells] = useState<Nullable<number>[][]>([[null, null, null], [null, null, null], [null, null, null]]);
  const [winner, setWinner] = useState<Nullable<number>>(null);

  const nextPlayer = () => {
    setPlayer((player) => { return (player + 1) % numberPlayers });
  }

  const affectCell = (index: number) => {
    if(winner !== null) return;
    const row = Math.floor(index / cells[0].length);
    const column = index % cells[0].length
    setCells((cells) => {
      const newCells = [...cells];
      newCells[row][column] = player;
      return newCells;
    });
    nextPlayer();
  }

  const renderCell = (cells: Nullable<number>[][]): ReactNode => {
    const render = cells.map((column: Nullable<number>[], index: number) => {
      return <div className='flex gap-16' key={index}>{column.map((player: Nullable<number>, nextIndex: number) => {
        return <Cell key={`${index}${nextIndex}`} value={player} onClick={affectCell} index={(column.length * index) + nextIndex}/>
      })}</div>
    });
    return render;
  }

  const checkWinner = (cells: Nullable<number>[][]): Nullable<number> => {
    for (let rowI = 0; rowI < cells.length; rowI++)
    {
      const row = cells[rowI]
      for (let columnI = 0; columnI < row.length; columnI++)
      {
        const cell = row[columnI];
        if(cell == null) continue;
        let same = true;
        let checkColumnIndex = (columnI + 1) % row.length;
        // check horizontal
        while(checkColumnIndex !== columnI && same)
        {
          same = row[checkColumnIndex] == cell;
          checkColumnIndex = (checkColumnIndex + 1) % row.length;
        }
        if (same) return cell;
        // check vertical
        same = true;
        let checkRowIndex = (rowI + 1) % cells.length;
        while(checkRowIndex !== rowI && same)
        {
          same = cells[checkRowIndex][columnI] == cell;
          checkRowIndex = (checkRowIndex + 1) % cells.length;
        }
        if (same) return cell;
        // check diagonal
        same = true;
        checkColumnIndex = (columnI + 1) % row.length;
        checkRowIndex = (rowI + 1) % cells.length;
        while(checkRowIndex !== rowI && checkColumnIndex !== columnI && same)
        {
          same = cells[checkRowIndex][checkColumnIndex] == cell;
          checkRowIndex = (checkRowIndex + 1) % cells.length;
          checkColumnIndex = (checkColumnIndex + 1) % cells[checkRowIndex].length;
        }
        if (same) return cell;
      }
    }
    return null;
  }

  useEffect(() => {
    console.log(checkWinner(cells));
    setWinner(checkWinner(cells));
  }, [cells]);


  return (
    <div className='h-screen w-screen bg-beige-3 '>
      <div className='container mx-auto py-12 prose flex gap-32'>
        {/*Main content */}

        <div className='flex-1 flex flex-col gap-16'>
          {/* Turn or winner */}
          <h1>{winner !== null ? `Player ${winner + 1} won!` : `Player ${player + 1} turn`}</h1>
          {renderCell(cells)}
          {/* Winner */}
        </div>

        {/* Legend */}
        <div className='w-auto'>
          <div className='flex gap-4'>
            <div className='w-[60px] h-[60px] border-[16px] rounded-full border-purple-5' />
            <p>Player 1</p>
          </div>
          <div className='flex gap-4'>
            <div className='w-[60px] h-[60px] border-[16px] border-green-3' />
            <p>Player 2</p>
          </div>
          <div className='flex gap-4'>
            <div className='w-[60px] h-[60px] rounded bg-beige-2' />
            <p>Unclaimed</p>
          </div>
        </div>


      </div>
    </div>
  );
}

export default TickTacToe;
