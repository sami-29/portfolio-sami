/* eslint-disable no-unused-vars */
// TODO: Complete this labs component - currently under development
import React, { useRef, useEffect, useCallback, useState } from "react";
import { Box } from "@chakra-ui/react";
import { GridState } from "../../../utils/labs/path-finding/v2/core/types";
import { getGeometry } from "../../../utils/labs/path-finding/v2/core/geometry";

interface CanvasGridProps {
  grid: GridState;
  renderState: Map<number, { visited: boolean; path: boolean }>;
  onNodeClick: (id: number) => void;
  isRunning: boolean;
}

const COLORS = {
  empty: "#ffffff",
  wall: "#1a202c",
  start: "#48bb78",
  finish: "#f56565",
  visited: "#9f7aea",
  path: "#ecc94b",
  border: "#e2e8f0",
};

const CanvasGrid: React.FC<CanvasGridProps> = ({
  grid,
  renderState,
  onNodeClick,
  isRunning,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [lastClickedId, setLastClickedId] = useState<number | null>(null);

  const geometry = getGeometry(grid.spec.gridType);

  const drawSquare = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      fillColor: string,
      strokeColor: string = COLORS.border,
      lineWidth: number = 0.5
    ) => {
      ctx.fillStyle = fillColor;
      ctx.fillRect(x - size / 2, y - size / 2, size, size);

      if (lineWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(x - size / 2, y - size / 2, size, size);
      }
    },
    []
  );

  const drawHexagon = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      centerX: number,
      centerY: number,
      radius: number,
      fillColor: string,
      strokeColor: string = COLORS.border,
      lineWidth: number = 0.5
    ) => {
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 + Math.PI / 6;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points.push({ x, y });
      }

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();

      ctx.fillStyle = fillColor;
      ctx.fill();

      if (lineWidth > 0) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    },
    []
  );

  const drawNode = useCallback(
    (ctx: CanvasRenderingContext2D, id: number) => {
      const { cols, nodeSize } = grid.spec;
      const center = geometry.pixelCenterOf(id, grid);
      const nodeRenderState = renderState.get(id);

      let fillColor = COLORS.empty;
      let strokeColor = COLORS.border;
      let lineWidth = 0.5;

      if (grid.walls.has(id)) {
        fillColor = COLORS.wall;
        strokeColor = COLORS.wall;
        lineWidth = 0.5;
      } else if (id === grid.startId) {
        fillColor = COLORS.start;
        strokeColor = COLORS.start;
        lineWidth = 1;
      } else if (id === grid.finishId) {
        fillColor = COLORS.finish;
        strokeColor = COLORS.finish;
        lineWidth = 1;
      } else if (nodeRenderState?.path) {
        fillColor = COLORS.path;
        strokeColor = "#d69e2e";
        lineWidth = 1.5;
      } else if (nodeRenderState?.visited) {
        fillColor = COLORS.visited;
        strokeColor = "#805ad5";
        lineWidth = 0.8;
      }

      if (grid.spec.gridType === "Square") {
        drawSquare(
          ctx,
          center.x,
          center.y,
          nodeSize,
          fillColor,
          strokeColor,
          lineWidth
        );
      } else {
        const radius = nodeSize * 0.45;
        drawHexagon(
          ctx,
          center.x,
          center.y,
          radius,
          fillColor,
          strokeColor,
          lineWidth
        );
      }
    },
    [grid, renderState, geometry, drawSquare, drawHexagon]
  );

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { rows, cols } = grid.spec;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const id = row * cols + col;
        drawNode(ctx, id);
      }
    }
  }, [grid, drawNode]);

  const handleMouseEvent = useCallback(
    (e: React.MouseEvent) => {
      if (isRunning) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const canvasX = (e.clientX - rect.left) * scaleX;
      const canvasY = (e.clientY - rect.top) * scaleY;

      const id = geometry.idAtPixel(canvasX, canvasY, grid);
      if (id !== null && id !== lastClickedId) {
        setLastClickedId(id);
        onNodeClick(id);
      }
    },
    [isRunning, geometry, grid, onNodeClick, lastClickedId]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    handleMouseEvent(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMouseDown) {
      handleMouseEvent(e);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setLastClickedId(null);
  };

  useEffect(() => {
    drawGrid();
  }, [drawGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { rows, cols, nodeSize } = grid.spec;
    let maxX = 0;
    let maxY = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const id = row * cols + col;
        const center = geometry.pixelCenterOf(id, grid);
        maxX = Math.max(maxX, center.x + nodeSize / 2);
        maxY = Math.max(maxY, center.y + nodeSize / 2);
      }
    }

    canvas.width = maxX;
    canvas.height = maxY;

    drawGrid();
  }, [grid, geometry, drawGrid]);

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      p={4}
      bg='gray.50'
      borderRadius='xl'
      border='1px'
      borderColor='gray.200'>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          border: "2px solid #cbd5e0",
          borderRadius: "12px",
          cursor: isRunning ? "default" : "crosshair",
          maxWidth: "100%",
          maxHeight: "75vh",
          backgroundColor: "#ffffff",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      />
    </Box>
  );
};

export default CanvasGrid;
