import { DynamicP5 } from '../DynamicP5';
import { P5CanvasInstance, Sketch } from 'react-p5-wrapper';

/**
 * Color Spectrum in a circle
 *
 * @param p
 */

const sketch: Sketch = (p: P5CanvasInstance) => {
  let segmentCount = 12;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
  };

  p.draw = () => {
    const angleStep = 360 / segmentCount;
    const radius = 300;

    p.colorMode(p.HSB, 360, p.width, p.width);
    p.background(360);
    p.beginShape(p.TRIANGLE_FAN);
    p.vertex(p.width / 2, p.height / 2);

    for (let angle = 0; angle <= 360; angle += angleStep) {
      const vx = p.width / 2 + p.cos(p.radians(angle)) * radius;
      const vy = p.height / 2 + p.sin(p.radians(angle)) * radius;
      p.vertex(vx, vy);
      p.fill(angle, p.mouseX, p.mouseY);
    }
    p.endShape();
  };

  p.keyReleased = () => {
    switch (p.key) {
      case '1':
        segmentCount = 360;
        break;
      case '2':
        segmentCount = 45;
        break;
      case '3':
        segmentCount = 24;
        break;
      case '4':
        segmentCount = 12;
        break;
      case '5':
        segmentCount = 6;
        break;

      default:
        segmentCount = 540;
    }
    1;
  };
};

export const P_1_1_2_01 = () => <DynamicP5 sketch={sketch} />;
