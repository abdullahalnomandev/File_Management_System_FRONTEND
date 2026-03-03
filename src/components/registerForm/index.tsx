"use client";

import { useState } from "react";
import { Form, Input, Button, Row, Col, Card, message } from "antd";
import Link from "next/link";
import { Cloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api/api-fech";

function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formFields = [
    {
      name: "name",
      label: "Full Name",
      rules: [{ required: true, message: "Please enter your full name" }],
      input: (
        <Input
          placeholder="Enter your full name"
          size="large"
          className="rounded-md"
        />
      ),
    },
    {
      name: "email",
      label: "Email",
      rules: [
        { required: true, message: "Please enter your email" },
        { type: "email", message: "Please enter a valid email" },
      ],
      input: (
        <Input
          placeholder="Enter your email"
          size="large"
          className="rounded-md"
        />
      ),
    },
    {
      name: "password",
      label: "Password",
      rules: [
        { required: true, message: "Please enter your password" },
        { min: 6, message: "Password must be at least 6 characters" },
      ],
      input: (
        <Input.Password
          placeholder="Enter your password"
          size="large"
          className="rounded-md"
        />
      ),
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      dependencies: ["password"],
      rules: [
        { required: true, message: "Please confirm your password" },
        ({ getFieldValue }: any) => ({
          validator(_: any, value: string) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("Passwords do not match")
            );
          },
        }),
      ],
      input: (
        <Input.Password
          placeholder="Confirm your password"
          size="large"
          className="rounded-md"
        />
      ),
    },
  ];

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      const res = await apiFetch("/user", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      router.push("/verify-otp?email=" + values.email);
      form.resetFields();
    } catch (err: any) {
      message.error(err.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-5">
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} md={14}>
          <Card
            className="shadow-md rounded-lg max-w-lg mx-auto!"
            variant="borderless"
            style={{ boxShadow: "0px 4px 6px 2px #00000014" }}
          >
            <div className="rounded-full bg-yellow-400/10 flex items-center justify-center mx-auto w-8 h-8">
              <Cloud className="w-8 h-8 text-yellow-500" />
            </div>

            <h3 className="text-2xl font-bold mb-2 text-center">
              Create Account
            </h3>

            <p className="text-sm text-gray-600 text-center mb-6">
              Register to access offers and benefits.
            </p>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              {formFields.map((field) => (
                <Form.Item
                  key={field.name}
                  label={
                    <span className="text-base text-gray-700">
                      {field.label}
                    </span>
                  }
                  name={field.name}
                  rules={field.rules as any}
                  dependencies={field.dependencies}
                >
                  {field.input}
                </Form.Item>
              ))}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  className="h-12 text-base font-medium rounded-md w-full"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-yellow-400! font-medium">
                  Login here
                </Link>
              </span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Register;