import { SimpleGrid, Text } from '@chakra-ui/react';
import { GameCardSkeleton } from './GameCardSkeleton';
import type { GameQuery } from '~/screens/GameHub';
import GameCard from './GameCard';
import GameCardContainer from './GameCardContainer';
import useGames from './hooks/useGames';

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  const { data, error, isLoading } = useGames(gameQuery);
  const skeletons = [...Array(10).keys()];

  if (error) return <Text>{error}</Text>;
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 5 }} paddingTop='10px' gap={3}>
      {isLoading &&
        skeletons.map((skeleton) => (
          <GameCardContainer key={skeleton}>
            <GameCardSkeleton />
          </GameCardContainer>
        ))}
      {data.map((game) => (
        <GameCardContainer key={game.id}>
          <GameCard game={game} />
        </GameCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default GameGrid;
