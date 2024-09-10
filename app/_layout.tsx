import { useFonts } from "expo-font";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { GluestackUIProvider, StatusBar } from "@gluestack-ui/themed";
import { config } from "@/config/gluestack-ui.config";
import { Loading } from "@/components/Loading";

export default function RootLayout() {
  const [loaded, error] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <View style={{ flex: 1 }}>
      <GluestackUIProvider config={config}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        {loaded ? (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        ) : (
          <Loading />
        )}
      </GluestackUIProvider>
    </View>
  );
}
