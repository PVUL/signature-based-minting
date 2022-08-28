import { DynamicP5 } from '../utils/DynamicP5';
import { Sketch } from 'react-p5-wrapper';

/**
 * This is a component used to test p5 drawings
 *
 * @param p5
 */

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(0);
    // p5.noCursor();
  };

  p5.draw = () => {
    // p5.print(p5.frameCount);
    p5.colorMode('hsb', p5.width, p5.height, 100);
    p5.rectMode('center');
    p5.noStroke();
    // p5.background(p5.mouseY / 2, 100, 100);

    let stepX = p5.mouseX + 2;
    let stepY = p5.mouseY + 2;

    for (let gridY = 0; gridY < p5.height; gridY += stepY) {
      for (let gridX = 0; gridX < p5.width; gridX += stepX) {
        p5.fill(gridX, p5.height - gridY, 100);
        p5.rect(gridX, gridY, stepX, stepY);
      }
    }
  };
};

export const ArtTest = () => <DynamicP5 sketch={sketch} />;
