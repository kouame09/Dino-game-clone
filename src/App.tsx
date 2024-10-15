import React, { useState, useEffect, useCallback } from 'react';
import { Dino } from './components/Dino';
import { Cactus } from './components/Cactus';
import { Cloud } from './components/Cloud';
import { GameOver } from './components/GameOver';

const App: React.FC = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [cactusPosition, setCactusPosition] = useState(window.innerWidth);

  const jump = useCallback(() => {
    if (!isJumping && !gameOver) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  }, [isJumping, gameOver]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        jump();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [jump]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setScore((prevScore) => prevScore + 1);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [gameOver]);

  useEffect(() => {
    if (!gameOver) {
      const moveCactus = setInterval(() => {
        setCactusPosition((prevPosition) => {
          if (prevPosition < -20) {
            return window.innerWidth;
          }
          return prevPosition - 5;
        });
      }, 20);

      return () => clearInterval(moveCactus);
    }
  }, [gameOver]);

  useEffect(() => {
    const dinoBottom = isJumping ? 100 : 0;
    if (cactusPosition > 0 && cactusPosition < 50 && dinoBottom < 60) {
      setGameOver(true);
    }
  }, [cactusPosition, isJumping]);

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setCactusPosition(window.innerWidth);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-2xl h-64 bg-white border-b-4 border-gray-400 overflow-hidden">
        <div className="absolute top-4 right-4 text-2xl font-bold">
          Score: {score}
        </div>
        <Dino isJumping={isJumping} />
        <Cactus position={cactusPosition} />
        <Cloud />
        {gameOver && <GameOver score={score} onRestart={restartGame} />}
      </div>
      <p className="mt-4 text-gray-600">Press spacebar to jump</p>
    </div>
  );
};

export default App;