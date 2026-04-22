import { createElement } from 'react';
import { getParallaxStyle } from '../lib/parallax';

export default function Parallax({
  as: Tag = 'div',
  x = 0,
  y = 0,
  z = 0,
  rotate = 0,
  scale = 1,
  style,
  children,
  ...props
}) {
  return createElement(
    Tag,
    {
      ...props,
      style: {
        ...getParallaxStyle({ x, y, z, rotate, scale }),
        ...style,
      },
    },
    children,
  );
}
