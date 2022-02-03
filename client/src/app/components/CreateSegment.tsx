import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { TextareaAutosize } from "@mui/material";
import { SegmentWrapper } from "./SegmentWrapper";

const StyledTextArea = styled(TextareaAutosize)`
  width: 100%;
  font-size: 18px;
  border: transparent;
  resize: none;
  font-family: "Roboto";
  background: transparent;
`;

export function CreateSegment({
  order,
  postSegment,
}: {
  order: number;
  postSegment: ({ content, order }: { content: string; order: number }) => void;
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <SegmentWrapper>
      <StyledTextArea
        value={value}
        ref={ref}
        placeholder={"Add new note here..."}
        onChange={(e) => {
          if (e.target.value[e.target.value.length - 1] === "\n") {
            ref?.current?.blur();
          }

          setValue(e.target.value);
        }}
        onBlur={() => {
          if (value) postSegment({ content: value, order });
        }}
        minRows={1}
      />
    </SegmentWrapper>
  );
}
