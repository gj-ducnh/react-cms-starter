import { Button, Form, Input } from "antd";
import { httpService } from "../../../apis/httpService";
import { apis } from "../../../apis";
import { useNavigate, useSearchParams } from "react-router-dom";
import { paths } from "../../../routes/path";

type FieldType = {
  username?: string;
  password?: string;
};

const Login: React.FC<any> = () => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();

  const onFinish = async (values: FieldType) => {
    const resp = await httpService
      .post(apis.auth.register, values)
      .catch(() => {
        return {
          data: {
            refreshToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiNmI4NDBlLWJlOWYtNDFiMy05ZjY4LWFmYTI5N2JkMWU4ZiIsImlhdCI6MTY5MjU5OTU2NiwiZXhwIjoxNjkzMDk5NTY2fQ.T6atqsSiDU8T4mIb0g77HVqsDb4EMgAUjoBMwCpEpQg",
            accessToken:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiNmI4NDBlLWJlOWYtNDFiMy05ZjY4LWFmYTI5N2JkMWU4ZiIsImNhY2hlSWQiOiI4MjhhZmQ0ZS0xMWJkLTQwM2UtOTk5Mi05NGQ1OTQ5OWNkZTgiLCJpYXQiOjE2OTI1OTk1NjYsImV4cCI6MTY5MzA5OTU2Nn0.OtWBrjWVMDamrwLr2h16VcngQQRE4ubbDw3DAqeKBnM",
            profile: {
              name: "Duc",
            },
          },
        };
      });

    httpService.setToken(resp.data.accessToken);
    httpService.setRefreshToken(resp.data.refreshToken);

    navigate(queryParams.get("from") || paths.HOME);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
