import { Form, Input, Button } from 'antd';
import { connect } from '@/.umi/plugin-dva/exports';
import { UserStateType } from '@/models/user';
import { LoginParams } from '../../../api/user';
import { Loading } from '../../../.umi/plugin-dva/connect';
import styles from './login.less';

const mapStateToProps = ({
  user,
  loading,
}: {
  user: UserStateType;
  loading: Loading;
}) => {
  return {
    user,
    token: user.token,
    loading,
  };
};

const actionCreater = {
  dispatchByKey: (payload: LoginParams): any => ({
    type: 'user/userLogin',
    payload,
  }),
};

export interface UserLoginPageProps {
  dispatchByKey: typeof actionCreater.dispatchByKey;
  user: any;
  loading: Loading;
}

const UserLoginPage: React.FunctionComponent<UserLoginPageProps> = (props) => {
  const { dispatchByKey, user, loading } = props;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  // 登录事件
  const onFinish = async (form: any) => {
    try {
      await dispatchByKey(form);
    } finally {
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.login_container}>
      <h2>登录</h2>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading.models.user}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(mapStateToProps, actionCreater)(UserLoginPage);
