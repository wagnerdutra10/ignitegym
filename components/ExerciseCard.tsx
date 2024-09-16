import { Heading, Text, Icon } from '@gluestack-ui/themed';
import { HStack, Image, VStack } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import { TouchableOpacityProps } from 'react-native-gesture-handler';
import { ChevronRight } from 'lucide-react-native';

type Props = TouchableOpacityProps;

export function ExerciseCard(props: Props) {
  return (
    <TouchableOpacity {...props}>
      <HStack bg="$gray500" alignItems="center" p="$2" pr="$4" rounded="$md" mb="$3">
        <Image
          source={{
            uri: 'https://w1.pngwing.com/pngs/463/549/png-transparent-man-fitness-centre-exercise-squat-physical-fitness-bodybuilding-muscle-bench.png'
          }}
          alt="imagem do exercício"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize="$lg" color="$white" fontFamily="$heading">
            Puxada frontal
          </Heading>
          <Text fontSize="$sm" color="$gray200" mt="$1" numberOfLines={2}>
            3 sérios x 12 repetições
          </Text>
        </VStack>
        <Icon as={ChevronRight} color="$gray300" />
      </HStack>
    </TouchableOpacity>
  );
}
