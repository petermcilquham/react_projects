import { HStack, Image } from '@chakra-ui/react';
import { ColorModeButton } from './ui/color-mode';

import logo from '/logo.webp';
import SearchInput from './SearchInput';

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack>
      <Image src={logo} boxSize='60px' background='green' />
      <SearchInput onSearch={onSearch} />
      <ColorModeButton></ColorModeButton>
    </HStack>
  );
};

export default NavBar;
