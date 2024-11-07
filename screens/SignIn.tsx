import {
  Center,
  Heading,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useToast,
  VStack
} from '@gluestack-ui/themed';
import BackgroundImage from '@/assets/images/background.png';
import Logo from '@/assets/images/logo.svg';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSession } from '@/context/AuthContext';
import { AppError } from '@/utils/AppError';
import { ToastMessage } from '@/components/ToastMessage';
import { useState } from 'react';

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required('Informe o email.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve conter pelo menos 6 dígitos')
});

export function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({ resolver: yupResolver(signInSchema) });
  const { signIn, user } = useSession();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível entrar. Tente novamente mais tarde';
      toast.show({
        placement: 'top',
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        )
      });
      setIsLoading(false);
    }
  }

  function handleNewAccount() {
    router.navigate('/sign-up');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <VStack flex={1}>
          <Image
            source={BackgroundImage}
            defaultSource={BackgroundImage}
            alt="pessoas-treinando"
            w="$full"
            h={624}
            position="absolute"
          />
          <VStack flex={1} px="$10" pb="$16">
            <Center my="$24">
              <Logo />
              <Text color="$gray100" fontSize="$sm">
                Treine sua mente e o seu corpo
              </Text>
            </Center>
            <Center gap="$2">
              <Heading color="$gray100">Acesse a conta</Heading>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Senha"
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
              <Button
                title="Acessar"
                onPress={handleSubmit(handleSignIn)}
                isLoading={isLoading}
              />
            </Center>
            <Center flex={1} justifyContent="flex-end" mt="$4">
              <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">
                Ainda não tem acesso?
              </Text>
              <Button
                title="Criar conta"
                variant="outline"
                onPress={handleNewAccount}
              />
            </Center>
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
