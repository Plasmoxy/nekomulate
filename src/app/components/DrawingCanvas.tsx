'use-client';
import React, { useEffect, useRef, useState } from 'react';

type Props = {};

const DrawingCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [imageBase64, setImageBase64] = useState('');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');

            if (ctx) {
                setContext(ctx);
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 5;
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
            }
        }
    }, []);

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
        if (canvas) {
            const image = canvas.toDataURL('image/png');
            setImageBase64(image);
            console.log('Saving!!' + image);
        }
    }, [isDrawing]);

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
