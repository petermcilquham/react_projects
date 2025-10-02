import { useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import type { Genre } from '~/components/gamehub/hooks/useGenres';
import type { Platform } from '~/components/gamehub/hooks/useGames';
import GameGrid from '~/components/gamehub/GameGrid';
import GameHeading from '~/components/gamehub/GameHeading';
import GenreList from '~/components/gamehub/GenreList';
import NavBar from '~/components/gamehub/NavBar';
import PlatformSelector from '~/components/gamehub/PlatformSelector';
import { Provider } from '~/components/gamehub/ui/provider';
// import '~components/gamehub/gamehub.css';

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  searchText: string;
}

export function GameHub() {
  console.log(import.meta.env.GAMEHUB_KEY);
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  return (
    <Provider>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`, //wider than 1024px
        }}
        templateColumns={{
          base: '1fr',
          lg: '200px 1fr',
        }}
      >
        <GridItem area='nav'>
          <NavBar onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })} />
        </GridItem>
        <GridItem area='aside' hideBelow='lg'>
          <GenreList selectedGenre={gameQuery.genre} onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })} />
        </GridItem>
        <GridItem area='main'>
          <GameHeading gameQuery={gameQuery} />
          <PlatformSelector selectedPlatform={gameQuery.platform} onSelectPlatform={(platform) => setGameQuery({ ...gameQuery, platform })} />
          <GameGrid gameQuery={gameQuery} />
        </GridItem>
      </Grid>
    </Provider>
  );
}
