import { useFonts } from 'expo-font';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Stack } from 'expo-router';
import { Box, GluestackUIProvider, StatusBar } from '@gluestack-ui/themed';
import { config, gluestackUIConfig } from '@/config/gluestack-ui.config';
import { Loading } from '@/components/Loading';
import { DefaultTheme } from '@react-navigation/native';

export default function RootLayout() {
  const [loaded, error] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  DefaultTheme.colors.background = gluestackUIConfig.tokens.colors.gray700;

  return (
    <Box flex={1} bg="$gray700">
      <GluestackUIProvider config={config}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        {loaded ? (
          <Stack screenOptions={{ headerShown: false }} />
        ) : (
          <Loading />
        )}
      </GluestackUIProvider>
    </Box>
  );
}
