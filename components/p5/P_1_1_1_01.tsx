import { DynamicP5 } from '../DynamicP5';
import { P5CanvasInstance, Sketch } from 'react-p5-wrapper';

/**
 * Color spectrum in a grid
 *
 * @param p
 */

const sketch: Sketch = (p: P5CanvasInstance) => {
  p.setup = () => {
    p.createCanvas(800, 400);
    p.background(0);
    // p.noCursor();
  };

  p.draw = () => {
    // p.print(p.frameCount);
    p.colorMode('hsb', p.width, p.height, 100);
    p.rectMode('center');
    p.noStroke();
    // p.background(p.mouseY / 2, 100, 100);

    let stepX = p.mouseX + 2;
    let stepY = p.mouseY + 2;

    for (let gridY = 0; gridY < p.height; gridY += stepY) {
      for (let gridX = 0; gridX < p.width; gridX += stepX) {
        p.fill(gridX, p.height - gridY, 100);
        p.rect(gridX, gridY, stepX, stepY);
      }
    }
  };
};

export const P_1_1_1_01 = () => <DynamicP5 sketch={sketch} />;
