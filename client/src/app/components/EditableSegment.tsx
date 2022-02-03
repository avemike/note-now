import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { TextareaAutosize } from "@mui/material";
import { patchSegment } from "../../api/queries/segments";

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
  data: { content: string; order: number; pk: number };
}) {
  const [value, setValue] = useState(data.content);
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <StyledTextArea
      value={value}
      ref={ref}
      onChange={(e) => {
        if (e.target.value[e.target.value.length - 1] === "\n") {
          ref?.current?.blur();
        }

        setValue(e.target.value);
      }}
      onBlur={() => {
        if (value) patchSegment({ content: value, pk: data.pk });
      }}
      minRows={3}
    />
  );
}
