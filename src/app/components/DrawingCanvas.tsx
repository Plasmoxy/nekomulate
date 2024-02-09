'use-client';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
    image: string;
    setImage: (image: string) => void;
};

const DrawingCanvas: React.FC<Props> = (props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 5;
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                setContext(ctx);
            }
        }
    }, []);

    useEffect(() => {
        // preload existing img
        if (context && props.image) {
        }
    }, [context, props.image]);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!context) return;

        const { offsetX, offsetY } = e.nativeEvent;
        context.beginPath();
        context.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !context) return;

        const { offsetX, offsetY } = e.nativeEvent;
        context.lineTo(offsetX, offsetY);
        context.stroke();
    };

    const stopDrawing = () => {
        if (context) {
            context.closePath();
            setIsDrawing(false);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas && !isDrawing) {
            const image = canvas.toDataURL('image/png');
            props.setImage(image);
            console.log('Saving!!' + image);
        }
    }, [isDrawing, props]);

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={300}
                height={300}
                style={{ backgroundColor: '#27272a', borderRadius: '10px', margin: 5 }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
            />
        </div>
    );
};

export default DrawingCanvas;
