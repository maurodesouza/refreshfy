import { FormEvent, useCallback, useRef } from 'react';

import { useAuth } from 'hooks/useAuth';
import { asGuest } from 'auth/asGuest';

import styles from './index.module.css';

const Home = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const { signIn } = useAuth();

  const handleOnSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const form = formRef.current;

      const email = (form[0] as HTMLInputElement).value;
      const password = (form[1] as HTMLInputElement).value;

      signIn({ email, password });
    },
    [signIn]
  );

  return (
    <div className={styles.container}>
      <form ref={formRef} onSubmit={handleOnSubmit} className={styles.form}>
        <input type="text" className={styles.input} />
        <input type="password" className={styles.input} />
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Home;

export const getServerSideProps = asGuest(async () => {
  return {
    props: {},
  };
});
