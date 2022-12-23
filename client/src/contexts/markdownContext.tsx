import React, { createContext } from "react";

interface MarkdownProps {
  setMarkdownText: (markdownText: string) => void;
  markdownText: string;
}

export const MarkdownContext = createContext<MarkdownProps>({
  setMarkdownText: () => {},
  markdownText: "",
});
