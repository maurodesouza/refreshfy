import { useCallback, useRef, useState } from 'react';

import * as C from '@chakra-ui/react';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';

import { MdEmail as EmailIcon, MdLock as LockIcon } from 'react-icons/md';

import { Input, Logo } from 'components';

import { useAuth } from 'hooks';
import { asGuest } from 'auth/asGuest';

import { getValidationErrors } from 'utils/getValidationErrors';

type FormData = {
  email: string;
  password: string;
};

const Home = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleOnSubmit: SubmitHandler<FormData> = useCallback(
    async data => {
      setLoading(true);
      formRef.current.setErrors({});

      try {
        const schema = Yup.object().shape({
          email: Yup.string().email().required(),
          password: Yup.string().required(),
        });

        await schema.validate(data, { abortEarly: false });

        const { email, password } = data;

        await signIn({ email, password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current.setErrors(errors);
        }

        setLoading(false);
      }
    },
    [signIn]
  );

  return (
    <C.Flex w="100%" h="100vh" align="center" justify="center">
      <C.Box w="100%" maxW="360px">
        <Form ref={formRef} onSubmit={handleOnSubmit}>
          <C.Flex
            w="100%"
            flexDir="column"
            px={['6', '8']}
            pt={['10', '12']}
            pb={['6', '8']}
            mb="4"
            borderRadius="lg"
            boxShadow="xs"
            align="center"
          >
            <Logo mb="8" />
            <C.Stack spacing={4} alignSelf="stretch">
              <Input icon={EmailIcon} name="email" placeholder="Email" />
              <Input
                icon={LockIcon}
                name="password"
                placeholder="Sua senha"
                type="password"
              />
            </C.Stack>

            <C.Button
              type="submit"
              alignSelf="stretch"
              colorScheme="teal"
              size="lg"
              mt="6"
              isLoading={loading}
            >
              Entrar
            </C.Button>
          </C.Flex>
        </Form>

        <C.Alert status="info" borderRadius="lg" flexDir={['column', 'row']}>
          <C.AlertIcon />
          <C.Box alignItems="center">
            Use&nbsp;<C.Text as="strong">user@user.com</C.Text>
            &nbsp;e senha&nbsp;
            <C.Text as="strong">123</C.Text>
          </C.Box>
        </C.Alert>
      </C.Box>
    </C.Flex>
  );
};

export default Home;

export const getServerSideProps = asGuest(async () => {
  return {
    props: {},
  };
});
