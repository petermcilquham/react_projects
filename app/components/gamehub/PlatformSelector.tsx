import { Button, Menu, MenuItem, Portal } from '@chakra-ui/react';
import { BsChevronDown } from 'react-icons/bs';

import type { Platform } from './hooks/useGames';
import usePlatforms from './hooks/usePlatforms';

interface Props {
  onSelectPlatform: (platform: Platform) => void;
  selectedPlatform: Platform | null;
}

const PlatformSelector = ({ onSelectPlatform, selectedPlatform }: Props) => {
  const { data, error } = usePlatforms();

  if (error) return null;
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Button variant='outline' size='sm'>
          {selectedPlatform?.name || 'Platforms'}
          {<BsChevronDown />}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {data.map((platform) => (
              <MenuItem value={''}>
                <Button variant='outline' onClick={() => onSelectPlatform(platform)}>
                  {platform.name}
                </Button>
              </MenuItem>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default PlatformSelector;
