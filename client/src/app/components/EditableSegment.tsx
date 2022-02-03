import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { TextareaAutosize } from "@mui/material";
import { useDeleteSegment } from "../../api/hooks/useDeleteSegment";
import { usePatchSegment } from "../../api/hooks/usePatchSegment";
import { SegmentWrapper } from "./SegmentWrapper";

const StyledTextArea = styled(TextareaAutosize)`
  width: 100%;
  font-size: 18px;
  border: transparent;
  resize: none;
  background: transparent;
  font-family: "Roboto";
`;

export function EditableSegment({
  data,
}: {
  data: { content: string; order: number; pk: number };
}) {
  const [value, setValue] = useState(data.content);
  const ref = useRef<HTMLTextAreaElement>(null);

  const { mutate: patchSegment } = usePatchSegment(data.pk);
  const { mutate: deleteSegment } = useDeleteSegment(data.pk);
  return (
    <SegmentWrapper>
      <StyledTextArea
        value={value}
        ref={ref}
        onKeyDown={(e) => {
          const key = e.code;

          if (["Backspace", "Delete"].includes(key) && value.length === 0) {
            deleteSegment();
          }
        }}
        onChange={(e) => {
          if (e.target.value[e.target.value.length - 1] === "\n") {
            ref?.current?.blur();
            return;
          }

          setValue(e.target.value);
        }}
        onBlur={() => {
          if (value) patchSegment({ content: value });
        }}
        minRows={1}
      />
    </SegmentWrapper>
  );
}
