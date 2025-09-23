export type LayoutType = "grid" | "table";

export interface LayoutToggleProps {
  value: LayoutType;
  onChange: (newLayout: LayoutType) => void;
}
