import { useState } from "react";
import styled from "@emotion/styled";
import { TextareaAutosize } from "@mui/material";

const StyledTextArea = styled(TextareaAutosize)`
  width: 100%;
  font-size: 18px;
  border: transparent;
  resize: none;
  font-family: "Roboto";
`;

export function EditableSegment({
  data,
}: {
  data: { content: string; order: number };
}) {
  const [value, setValue] = useState(data.content);

  return (
    <StyledTextArea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      minRows={3}
    />
  );
}
