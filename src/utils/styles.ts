import { CreateCSSProperties } from "@material-ui/core/styles/withStyles";

export function lineClamp(lines: number): CreateCSSProperties {
  return {
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
};
