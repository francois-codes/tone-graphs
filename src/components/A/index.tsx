import React, { CSSProperties } from "react";
import * as R from "ramda";

type Props = {
  children?: string;
  href: string;
  style?: CSSProperties;
  target?: string;
};

export function A({ children = "", href, style = {}, target = "_self" }: Props) {
  const baseLinkStyles: CSSProperties = {
    textDecoration: "none",
  };

  return (
    <a href={href} style={R.mergeDeepRight(baseLinkStyles, style)} target={target}>
      {children}
    </a>
  );
}
