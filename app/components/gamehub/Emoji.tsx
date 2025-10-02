import bullsEye from '/bulls-eye.webp';
import thumpsUp from '/thumbs-up.webp';
import meh from '/meh.webp';
import { Image } from '@chakra-ui/react';
import type { ImageProps } from '@chakra-ui/react';

interface Props {
  rating: number;
}
const Emoji = ({ rating }: Props) => {
  if (rating < 3) return null;

  const emojiMap: { [key: number]: ImageProps } = {
    3: { src: meh, alt: 'meh', boxSize: '15px' },
    4: { src: thumpsUp, alt: 'recommended', boxSize: '15px' },
    5: { src: bullsEye, alt: 'exceptional', boxSize: '25px' },
  };

  return <Image {...emojiMap[rating]} />;
};

export default Emoji;
