import { Heading, HStack, Text, VStack } from '@gluestack-ui/themed';
import { ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Icon } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import BodySvg from '@/assets/images/body.svg';
import SeriesSvg from '@/assets/images/series.svg';
import RepetitionsSvg from '@/assets/images/repetitions.svg';
import { Image } from '@gluestack-ui/themed';
import { gluestackUIConfig } from '@/config/gluestack-ui.config';
import { Button } from '@/components/Button';
import { Box } from '@gluestack-ui/themed';

export default function Exercise() {
  function handleGoBack() {
    router.back();
  }

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt="$4"
          mb="$8"
        >
          <Heading
            color="$gray100"
            fontFamily="$heading"
            fontSize="$lg"
            flexShrink={1}
          >
            Puxada frontal
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="$gray200" ml="$1" textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <VStack p="$8">
          <Image
            source={{
              uri: 'https://w1.pngwing.com/pngs/463/549/png-transparent-man-fitness-centre-exercise-squat-physical-fitness-bodybuilding-muscle-bench.png'
            }}
            alt="Exercício"
            mb="$3"
            resizeMode="cover"
            rounded="$lg"
            w="$full"
            h="$80"
          />
          <Box
            px="$12"
            style={{
              paddingHorizontal: gluestackUIConfig.tokens.space[4],
              paddingBottom: gluestackUIConfig.tokens.space[4],
              borderRadius: gluestackUIConfig.tokens.radii.md,
              backgroundColor: gluestackUIConfig.tokens.colors.gray600
            }}
          >
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb="$6"
              mt="$5"
            >
              <HStack>
                <SeriesSvg />
                <Text color="$gray200" ml="$2">
                  3 séries
                </Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text color="$gray200" ml="$2">
                  12 repetições
                </Text>
              </HStack>
            </HStack>
            <Button title="Marcar como realiado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
