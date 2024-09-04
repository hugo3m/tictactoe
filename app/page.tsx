'use client';

import { ReactNode, useEffect, useState } from 'react';
import { divPlayer0, divPlayer1, divPlayer2, divPlayer3, divUnclaimed } from './utils/players';

import Cell from './components/Cell';
import { Nullable } from './utils/type';

function TickTacToe() {
  // Edit the logic here
  // Remember you can change this however you like, into different files, using different libraries etc. This is just a starting point.

  // this is a client component, so you can use react hooks here, .i.e.

  const createCells = (numberPlayers: number): Nullable<number>[][]  => {
    let result: Nullable<number>[][] = [];
    for(let i = 0; i < numberPlayers + 1; i++) {
        let innerArray: Nullable<number>[] = [];
        for(let j = 0; j < numberPlayers + 1; j++) {
            innerArray.push(null);
        }
        result.push(innerArray);
    }
    return result;
  }

  const [numberPlayers, setNumberPlayers] = useState<number>(2);
  const [input, setInput] = useState<string>(numberPlayers.toString());
  const [player, setPlayer] = useState(0);
  const [cells, setCells] = useState<Nullable<number>[][]>(createCells(numberPlayers));
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

  const parseInput = (input: string) => {
    const value = parseInt(input);
    if (value && value > 1 && value < 5)
    {
      setNumberPlayers(value);
      setPlayer(0);
    }
  }

  const checkWinner = (cells: Nullable<number>[][]): Nullable<number> => {
    for (let rowI = 0; rowI < cells.length; rowI++)
    {
      const row = cells[rowI]
      for (let columnI = 0; columnI < row.length; columnI++)
      {
        const cell = row[columnI];
        if(cell == null) continue;
        let check = 0;
        let checkColumnIndex = columnI + 1;
        // check horizontal
        while(checkColumnIndex !== columnI && check < 2)
        {
          // do not continue to the other border
          if(checkColumnIndex >= row.length) break;
          if(row[checkColumnIndex] !== cell) break;
          check += 1;
          checkColumnIndex = checkColumnIndex + 1;
        }
        if (check == 2) return cell;
        // check vertical
        check = 0;
        let checkRowIndex = rowI + 1;
        while(checkRowIndex !== rowI && check < 2)
        {
          // do not continue to the other border
          if(checkRowIndex >= cells.length) break;
          if(cells[checkRowIndex][columnI] !== cell) break;
          check += 1;
          checkRowIndex = checkRowIndex + 1

        }
        if (check == 2) return cell;
        // check diagonal descending
        check = 0;
        checkColumnIndex = columnI + 1;
        checkRowIndex = rowI + 1;
        while(checkRowIndex !== rowI && checkColumnIndex !== columnI && check < 2)
        {
          // do not continue to the other border
          if (checkColumnIndex >= row.length || checkRowIndex >= cells.length) break;
          if(cells[checkRowIndex][checkColumnIndex] !== cell) break;
          check += 1;
          checkRowIndex = checkRowIndex + 1;
          checkColumnIndex = checkColumnIndex + 1;

        }
        if (check == 2) return cell;
        // check diagonal ascending
        check = 0;
        checkColumnIndex = columnI + 1;
        checkRowIndex = rowI - 1
        while(checkRowIndex !== rowI && checkColumnIndex !== columnI && check < 2)
        {
          // do not continue to the other border
          if (checkColumnIndex >= row.length || checkRowIndex >= cells.length || checkRowIndex < 0) break;
          if(cells[checkRowIndex][checkColumnIndex] !== cell) break;
          check += 1;
          checkRowIndex = checkRowIndex - 1;
          checkColumnIndex = checkColumnIndex + 1;
        }
        if (check == 2) return cell;
      }
    }
    return null;
  }

  useEffect(() => {
    setWinner(checkWinner(cells));
  }, [cells]);

  useEffect(() => {
    setCells(createCells(numberPlayers));
  }, [numberPlayers]);

  useEffect(() => {
    parseInput(input);
  }, [input])

  // no time to create proper function
  const displayLegend = (numberPlayer: number) => {
    if (numberPlayer == 2)
    {
      return (
        <>
        <div className='flex gap-4'>
            {divPlayer0}
            <p>Player 1</p>
          </div>
          <div className='flex gap-4'>
            {divPlayer1}
            <p>Player 2</p>
          </div>
          <div className='flex gap-4'>
            {divUnclaimed}
            <p>Unclaimed</p>
          </div>
          </>
      )
    }
    if (numberPlayer == 3)
      {
        return (
          <>
          <div className='flex gap-4'>
              {divPlayer0}
              <p>Player 1</p>
            </div>
            <div className='flex gap-4'>
              {divPlayer1}
              <p>Player 2</p>
            </div>
            <div className='flex gap-4'>
              {divPlayer2}
              <p>Player 3</p>
            </div>
            <div className='flex gap-4'>
              {divUnclaimed}
              <p>Unclaimed</p>
            </div>
            </>
        )
      }
      if (numberPlayer == 4)
        {
          return (
            <>
            <div className='flex gap-4'>
                {divPlayer0}
                <p>Player 1</p>
              </div>
              <div className='flex gap-4'>
                {divPlayer1}
                <p>Player 2</p>
              </div>
              <div className='flex gap-4'>
                {divPlayer2}
                <p>Player 3</p>
              </div>
              <div className='flex gap-4'>
                {divPlayer3}
                <p>Player 4</p>
              </div>
              <div className='flex gap-4'>
                {divUnclaimed}
                <p>Unclaimed</p>
              </div>
              </>
          )
        }
  }

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
        <span>Number of players from 2 to 4</span>
        <div className='flex gap-4'>
            <input placeholder='Enter number of player' onChange={(event) => setInput(event.target.value)} value={input}></input>
          </div>
          {displayLegend(numberPlayers)}
        </div>


      </div>
    </div>
  );
}

export default TickTacToe;
