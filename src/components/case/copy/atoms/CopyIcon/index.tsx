import type { ComponentProps, FC } from 'react';

export type CopyIconPresentationalProps = Readonly<ComponentProps<'svg'>>;

export const CopyIconPresentational: FC<CopyIconPresentationalProps> = ({
  ...props
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      <title>copy</title>
    </svg>
  );
};

export type CopyIconProps = Readonly<CopyIconPresentationalProps>;

export const CopyIcon: FC<CopyIconProps> = ({ ...props }) => {
  return <CopyIconPresentational {...props} />;
};
