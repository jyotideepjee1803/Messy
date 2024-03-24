import React, { forwardRef, HTMLAttributes } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

import Box from '@mui/material/Box';

interface SvgColorProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  sx?: SxProps<Theme>;
}

const SvgColor = forwardRef<HTMLSpanElement, SvgColorProps>(
  ({ src, sx, ...other }, ref) => (
    <Box
      component="span"
      className="svg-color"
      ref={ref}
      sx={{
        width: 24,
        height: 24,
        display: 'inline-block',
        bgcolor: 'currentColor',
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  )
);

export default SvgColor;
