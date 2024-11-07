import { ExerciseCard } from '@/components/ExerciseCard';
import { Group } from '@/components/Group';
import { HomeHeader } from '@/components/HomeHeader';
import { Heading, HStack } from '@gluestack-ui/themed';
import { VStack, Text } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList } from 'react-native';

export default function Home() {
  const [exercises, setExercises] = useState([
    'Puxada frontal',
    'Remada curvada',
    'Remada unilateral',
    'Levantamento terra',
    'Puxada frontal12',
    'Remada curvada23',
    'Remada unilateral23',
    'Levantamento terra123'
  ]);
  const [groups, setGroups] = useState<string[]>([
    'Costas',
    'Bíceps',
    'Tríceps',
    'Ombro'
  ]);
  const [groupSelected, setGroupSelected] = useState('Costas');

  function handleOpenExerciseDetails() {
    router.navigate('/exercise');
  }

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32, gap: 12 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />
      <VStack px="$8" flex={1}>
        <HStack justifyContent="space-between" mb="$5" alignItems="center">
          <Heading color="$gray200" fontSize="$md">
            Exercícios
          </Heading>
          <Text color="$gray200" fontSize="$sm" fontFamily="$body">
            {exercises.length}
          </Text>
        </HStack>
        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={() => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
