import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Header, Form, Input } from 'semantic-ui-react';

import { UserActions } from '../../store/user/types';

import './login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['Login']);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loading = false;

  const updateUsername = (event: any, data: any) => {
    setUsername(data.value);
  };

  const updatePassword = (_: any, data: any) => {
    setPassword(data.value);
  };

  const login = () => {
    const payload = { username, password };
    dispatch({
      type: UserActions.FETCH_USER,
      payload,
    });
  };

  return (
    <article className="login">
      <Form className="login__form">
        <Header as="h2" className="login__form__header">
          {t('header')}
        </Header>

        <Form.Field className="login__form__input">
          <label>{t('username')}</label>
          <Input id="username" placeholder={t('username')} onChange={updateUsername} />
        </Form.Field>

        <Form.Field className="login__form__input">
          <label>{t('password')}</label>
          <Input
            id="password"
            placeholder={t('password')}
            onChange={updatePassword}
            type="password"
          />
        </Form.Field>

        <div className="login__form__submit">
          <Button id="login-button" loading={loading} onClick={login}>
            {t('submit')}
          </Button>
        </div>
      </Form>
    </article>
  );
};

export default Login;
