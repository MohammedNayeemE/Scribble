
import { useEffect, useRef, MutableRefObject } from 'react';

const canvasWidth = 3500;
const canvasHeight = 3500;

const Board = ({
  onDraw,
  containerRef,
}: {
  onDraw: (ctx: CanvasRenderingContext2D) => void;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    onDraw(ctx);
  }, [onDraw]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(
        canvasWidth / 2 - window.innerWidth / 2,
        canvasHeight / 2 - window.innerHeight / 2
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'scroll',
        position: 'relative',
        background: '#f8f8f8',
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
	tabIndex={0}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
	  background: 'radial-gradient(rgb(192, 197, 206) 1px, white 1px)',
          backgroundSize: '15px 15px',
        }}
      />
    </div>
  );
};

export default Board;

