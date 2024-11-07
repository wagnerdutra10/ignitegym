import { HistoryCard } from '@/components/HistoryCard';
import { ScreenHeader } from '@/components/ScreenHeader';
import { Heading, Text, VStack } from '@gluestack-ui/themed';
import { useState } from 'react';
import { SectionList } from 'react-native';

export default function History() {
  const [exercises, setExercises] = useState([
    {
      title: '22.07.24',
      data: ['Puxada frontal', 'Remada unilateral']
    },
    {
      title: '23.07.24',
      data: ['Puxada frontal']
    }
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />
      <SectionList
        style={{ paddingHorizontal: 32 }}
        sections={exercises}
        keyExtractor={(item) => item}
        renderSectionHeader={({ section }) => (
          <Heading color="$gray200" fontSize="$md" mt="$10" mb="$3" fontFamily="$heading">
            {section.title}
          </Heading>
        )}
        renderItem={({ item }) => <HistoryCard />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
        ListEmptyComponent={() => (
          <Text color="$gray100" textAlign="center">
            Não há exercícios registrados ainda. {'\n'}Vamos fazer exercícios hoje?
          </Text>
        )}
      />
    </VStack>
  );
}
