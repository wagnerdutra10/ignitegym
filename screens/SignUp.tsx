import {
  Center,
  Heading,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack
} from '@gluestack-ui/themed';
import BackgroundImage from '@/assets/images/background.png';
import Logo from '@/assets/images/logo.svg';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Alert, Platform } from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api } from '@/services/api';
import axios from 'axios';
import { AppError } from '@/utils/appError';
import { useToast } from '@gluestack-ui/themed';
import { ToastMessage } from '@/components/ToastMessage';
import { useSession } from '@/context/AuthContext';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o email.').email('E-mail inválido.'),
  password: yup
    .string()
    .required('Informe a senha.')
    .min(6, 'A senha deve conter pelo menos 6 dígitos'),
  confirm_password: yup
    .string()
    .required('Informe a senha de confirmação.')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere.')
});

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) });
  const toast = useToast();

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      const response = await api.post('/users', { name, email, password });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde.';

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
    }
  }

  function handleGoBack() {
    router.navigate('/sign-in');
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
            <Center gap="$2" flex={1}>
              <Heading color="$gray100">Crie sua conta</Heading>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Nome"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
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
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                    errorMessage={errors.password?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="confirm_password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Confirme a Senha"
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                    errorMessage={errors.confirm_password?.message}
                  />
                )}
              />
              <Button
                title="Criar e acessar"
                onPress={handleSubmit(handleSignUp)}
              />
            </Center>
            <Button
              title="Voltar para o login"
              variant="outline"
              mt="$12"
              onPress={handleGoBack}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
