import {
  AlipayCircleOutlined,
  LockTwoTone,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Space, Tabs, Button } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import type { CurrentUser } from 'umi';
import type { Dispatch, UserTestModelState } from 'umi';
import type { StateType } from '@/models/login';
// import type { LoginParamsType } from '@/services/login';
// import type { ConnectState } from '@/models/connect';
// import firebase from '@/services/firebase';
import styles from './index.less';
// import { GoogleLogin } from '@/services/login';

export type LoginProps = {
  dispatch: Dispatch;
  currentUser?: CurrentUser;
  userLogin: StateType;
  submitting?: boolean;
  userTest: UserTestModelState;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { dispatch } = props;
  const { status, type: loginType } = userLogin;
  const [type, setType] = useState<string>('account');
  const intl = useIntl();

  const handleSubmit = async () => {
    await dispatch({
      type: 'userTest/setUser',
      payload: '',
    });

    await dispatch({
      type: 'userTest/getCurrentUser',
      payload: '',
    });
    // getFakeCaptcha();
    // console.log(userTest);
  };

  // dispatch({
  //   type: 'login/login',
  //   payload: { ...values, type },
  // })

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: false,
        }}
        // submitter={{
        //   render: (_, dom) => dom.pop(),
        //   submitButtonProps: {
        //     loading: submitting,
        //     size: 'large',
        //     style: {
        //       width: '100%',
        //     },
        //   },
        // }}
        // onFinish={() => {
        //   handleSubmit();
        //   return Promise.resolve();
        // }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="account"
            tab={intl.formatMessage({
              id: 'pages.login.accountLogin.tab',
              defaultMessage: '??????????????????',
            })}
          />
          {/* <Tabs.TabPane
            key="mobile"
            tab={intl.formatMessage({
              id: 'pages.login.phoneLogin.tab',
              defaultMessage: '???????????????',
            })}
          /> */}
        </Tabs>

        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage
            content={intl.formatMessage({
              id: 'pages.login.accountLogin.errorMessage',
              defaultMessage: '????????????????????????admin/ant.design)',
            })}
          />
        )}

        {type === 'account' && (
          <>
            <ProFormText
              name="userName"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: '?????????: admin or user',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="??????????????????!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockTwoTone className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: '??????: ant.design',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="??????????????????"
                    />
                  ),
                },
              ]}
            />
          </>
        )}

        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="????????????" />
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            <FormattedMessage id="pages.login.forgotPassword" defaultMessage="????????????" />
          </a>
        </div>
        <Button
          style={{
            width: '100%',
            marginBottom: 24,
            height: 'auto',
            padding: '1em',
          }}
          type="primary"
          block
          onClick={handleSubmit}
        >
          Login with Google
        </Button>
      </ProForm>
      <Space className={styles.other}>
        <FormattedMessage id="pages.login.loginWith" defaultMessage="??????????????????" />
        <AlipayCircleOutlined className={styles.icon} />
        <TaobaoCircleOutlined className={styles.icon} />
        <WeiboCircleOutlined className={styles.icon} />
      </Space>
    </div>
  );
};

export default connect((state) => ({
  ...state,
}))(Login);
