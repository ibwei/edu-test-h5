import { Form, Input, Button } from 'antd';
import { connect, history, Loading, getDvaApp, useDispatch } from 'umi';
import { UserStateType } from '@/models/user';
import './login.less';
import { HttpResponse } from '@/@types/api';
import Cookies from 'js-cookie';

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

export interface UserLoginPageProps {
  user: any;
  loading: Loading;
}

const UserLoginPage: React.FunctionComponent<UserLoginPageProps> = (props) => {
  const { loading } = props;

  const dispatch = useDispatch();

  console.log('props111', props);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 16 },
  };

  // 登录事件
  const onFinish = async (form: any) => {
    new Promise((resolve, reject) => {
      dispatch({
        type: 'user/userLogin',
        payload: { data: form, resolve, reject },
      });
    }).then((res: any) => {
      if (res?.status === 200) {
        if (res.data.resultCode === 0) {
          Cookies.set('token', res.data.data.token);
          history.push('/home');
        }
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="login_container">
      <h2 style={{ color: '#fff' }}>登录</h2>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          style={{ color: '#fff' }}
          label="Username"
          name="username"
          initialValue="白唯"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          initialValue="admin"
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="default"
            htmlType="submit"
            shape="round"
            block
            size="large"
            loading={loading.models.user}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const creator = {
  login: () => ({
    type: 'skk',
    payload: {},
  }),
};

export default connect(mapStateToProps)(UserLoginPage);
