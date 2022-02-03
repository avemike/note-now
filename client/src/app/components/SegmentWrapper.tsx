import { ReactNode } from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const StyledBox = styled(Box)<{ ghost: boolean }>`
  background: #fffcbf;
  padding: 1rem 2rem;
  margin: 4px 0;
  border: 2px solid #000;
  box-shadow: 2px 2px 0 0 #000;
  opacity: ${({ ghost }) => (ghost ? 0.5 : 1)};
`;

export function SegmentWrapper({
  children,
  ghost = false,
}: {
  children: ReactNode;
  ghost?: boolean;
}) {
  return <StyledBox ghost={ghost}>{children}</StyledBox>;
}
