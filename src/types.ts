export type MergeableProps = Pick<React.HTMLAttributes<Element>,
  'className' |
  'style' |
  keyof React.DOMAttributes<Element>
>;
