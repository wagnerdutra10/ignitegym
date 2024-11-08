import { FontAwesome } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import HomeSvg from '@/assets/images/home.svg';
import HistorySvg from '@/assets/images/history.svg';
import ProfileSvg from '@/assets/images/profile.svg';
import { gluestackUIConfig } from '@/config/gluestack-ui.config';
import { useSession } from '@/context/AuthContext';
import { Loading } from '@/components/Loading';
export default function AppLayout() {
  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space['6'];
  const { user, isLoading } = useSession();

  if (isLoading) {
    return <Loading />;
  }

  if (!user.id) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tokens.colors.green500,
        tabBarInactiveTintColor: tokens.colors.gray200,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: tokens.colors.gray600,
          borderTopWidth: 0
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />
      <Tabs.Screen
        name="exercise"
        options={{
          href: null,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          )
        }}
      />
    </Tabs>
  );
}
