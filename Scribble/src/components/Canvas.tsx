
import { useRef, useCallback,useEffect} from 'react';
import Board from './Board';

const Canvas = () => {
  const isDrawing = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const undoStack = useRef<ImageData[]>([]);
  const redoStack = useRef<ImageData[]>([]);

  const saveStack = (ctx : CanvasRenderingContext2D) => {
	  const snapShot = ctx.getImageData(0 , 0 , ctx.canvas.width , ctx.canvas.height);
	  undoStack.current.push(snapShot);
	  redoStack.current = [];
  }

  const undo = (ctx : CanvasRenderingContext2D) => {
	  if(undoStack.current.length == 0) return;
	  const currState = ctx.getImageData(0 , 0 , ctx.canvas.width , ctx.canvas.height);
	  redoStack.current.push(currState);
	  const prevState = undoStack.current.pop();
	  if(prevState) {
		  ctx.putImageData(prevState , 0 , 0);
	  }
  }

  const redo = (ctx : CanvasRenderingContext2D) => {
	  if(redoStack.current.length == 0) return;
	  const currState = ctx.getImageData(0 , 0 , ctx.canvas.width , ctx.canvas.height);
	  undoStack.current.push(currState);
	  const nextState = redoStack.current.pop();
	  if(nextState) {
		  ctx.putImageData(nextState , 0 , 0);
	  }
  }

  useEffect(()=> {
	  const handler = (e : KeyboardEvent) => {
		  const canvas = canvasRef.current;
		  if(!canvas) return;

		  const ctx = canvas.getContext('2d');
		  if(!ctx) return ;

		  if(e.ctrlKey && e.key === 'u') {
			  e.preventDefault();
			  console.log('pressed');
			  undo(ctx);
		  }
		  else if(e.ctrlKey && e.key === 'z'){
			  e.preventDefault();
			  console.log('pressed');
			  redo(ctx);
		  } 
	  }

	  window.addEventListener('keydown' , handler);
	  return () => window.removeEventListener('keydown' , handler);
  } , []);

  useEffect(() => {
	window.focus();
  } , []);

  const handleDraw = useCallback((ctx: CanvasRenderingContext2D) => {
	    const canvas = ctx.canvas;
	    canvasRef.current = canvas;
	    ctx.strokeStyle = 'black';
	    ctx.lineWidth = 5;
	    ctx.lineCap = 'round';
	    ctx.lineJoin = 'round';

	    const handleMouseDown = (e: MouseEvent) => {
	      if (!containerRef.current) return;
	      isDrawing.current = true;

	      const x = e.clientX + (containerRef.current?.scrollLeft || 0);
	      const y = e.clientY + (containerRef.current?.scrollTop || 0);
	      lastX.current = x;
	      lastY.current = y;
	      saveStack(ctx);
    };

    const handleMouseMove = (e: MouseEvent) => {
	      if (!isDrawing.current || !containerRef.current) return;

	      const x = e.clientX + (containerRef.current?.scrollLeft || 0);
	      const y = e.clientY + (containerRef.current?.scrollTop || 0);

	      ctx.beginPath();
	      ctx.moveTo(lastX.current, lastY.current);
	      ctx.lineTo(x, y);
	      ctx.stroke();

	      lastX.current = x;
	      lastY.current = y;
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, []);

  return <Board onDraw={handleDraw} containerRef={containerRef} />;
};

export default Canvas;

