import { ListRoot, ListItem, HStack, Image, Spinner, Button, Heading } from '@chakra-ui/react';

import useGenres, { type Genre } from './hooks/useGenres';
import getCroppedImageUrl from './services/imageUrl';

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectGenre, selectedGenre }: Props) => {
  const { data, isLoading, error } = useGenres();

  if (error) return null;
  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading>Genres</Heading>
      <ListRoot variant='plain'>
        {data.map((genre) => (
          <ListItem key={genre.id} paddingY='5px' paddingX='0px'>
            <HStack justifyContent='start'>
              <Image boxSize='32px' borderRadius={8} objectFit='cover' src={getCroppedImageUrl(genre.image_background)} />
              <Button padding='5px' fontWeight={genre.id === selectedGenre?.id ? 'bold' : 'normal'} onClick={() => onSelectGenre(genre)} variant='outline'>
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </ListRoot>
    </>
  );
};

export default GenreList;
