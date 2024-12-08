import { CopyIcon } from '@/components/case/copy/atoms/CopyIcon';
import * as Tooltip from '@radix-ui/react-tooltip';
import { type ComponentProps, type FC, useState } from 'react';

import './style.css';

export type RepositoryCopyButtonPresentationalProps = Readonly<
  ComponentProps<'button'> & {
    isOpenTooltip: boolean;
  }
>;

export const RepositoryCopyButtonPresentational: FC<
  RepositoryCopyButtonPresentationalProps
> = ({ isOpenTooltip, onClick, ...rest }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root open={isOpenTooltip}>
        <Tooltip.Trigger asChild>
          <button type="button" onClick={onClick} {...rest}>
            <CopyIcon className="copy" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="right">Copied!</Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export type RepositoryCopyButtonProps = Readonly<
  Omit<RepositoryCopyButtonPresentationalProps, 'isOpenTooltip'>
>;

export const RepositoryCopyButton: FC<RepositoryCopyButtonProps> = ({
  ...props
}) => {
  const [isOpen, setIsOpen] =
    useState<RepositoryCopyButtonPresentationalProps['isOpenTooltip']>(false);

  const handleClick: RepositoryCopyButtonPresentationalProps['onClick'] =
    () => {
      if (!navigator.clipboard) {
        return;
      }

      const location = window.location.toString();
      const [, , , author, repo] = location.split('/');
      if (!author || !repo) {
        return;
      }

      navigator.clipboard.writeText(`${author}/${repo}`);
      setIsOpen(true);

      setTimeout(() => setIsOpen(false), 1000);
    };
  return (
    <RepositoryCopyButtonPresentational
      isOpenTooltip={isOpen}
      onClick={handleClick}
      {...props}
    />
  );
};
