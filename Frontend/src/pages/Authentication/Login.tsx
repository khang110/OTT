import React, { useEffect, useState } from "react";
import {
  Alert,
  Row,
  Col,
  Form,
  Label,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import axios from "axios";
import * as url from "../../api/urls";
//Social Media Imports
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

// router
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

// validations
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

// config
import config from "../../config";

// hooks
import { useProfile, useRedux } from "../../hooks/index";

//actions
import { loginUser, socialLogin } from "../../redux/actions";

// components
import NonAuthLayoutWrapper from "../../components/NonAutnLayoutWrapper";
import AuthHeader from "../../components/AuthHeader";
import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";

interface LocationTypes {
  from?: Location;
}
interface LoginProps {}
const Login = (props: LoginProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();

  const { isUserLogin, error, loginLoading, isUserLogout } = useAppSelector(
    state => ({
      isUserLogin: state.Login.isUserLogin,
      error: state.Login.error,
      loginLoading: state.Login.loading,
      isUserLogout: state.Login.isUserLogout,
    })
  );

  const history: any = useHistory();
  const location = useLocation<LocationTypes>();
  const [redirectUrl, setRedirectUrl] = useState("/");
  useEffect(() => {
    const url =
      location.state && location.state.from
        ? location.state.from.pathname
        : "/";
    setRedirectUrl(url);
  }, [location]);
  useEffect(() => {
    if (isUserLogin && !loginLoading && !isUserLogout) {
      history.push(redirectUrl);
    }
  }, [isUserLogin, history, loginLoading, isUserLogout, redirectUrl]);

  const resolver = yupResolver(
    yup.object().shape({
      email: yup.string().required("Vui lòng nhập E-mail."),
      password: yup.string().required("Xin vui lòng nhập mật khẩu."),
    })
  );

  const defaultValues: any = {
    email: "",
    password: "",
  };

  const methods = useForm({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;
  
  const onSubmitForm = (values: object) => {
    dispatch(loginUser(values));
  };

  const { userProfile, loading } = useProfile();

  if (userProfile && !loading) {
    return <Redirect to={{ pathname: redirectUrl }} />;
  }

  const signIn = (res: any, type: "google" | "facebook") => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, type));
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        token: res.accessToken,
      };
      dispatch(socialLogin(postData, type));
    }
  };

  //handleFacebookLoginResponse
  const facebookResponse = (response: object) => {
    signIn(response, "facebook");
  };

  //handleGoogleLoginResponse
  const googleResponse = (response: object) => {
    signIn(response, "google");
  };

  return (
    <NonAuthLayoutWrapper>
      <Row className=" justify-content-center my-auto">
        <Col sm={6} lg={6} xl={5} className="col-sm-6">
          <div className="py-md-5 py-4">
            <AuthHeader
              title="Đăng nhập"
              // subtitle="Đăng nhập"
            />

            {error && <Alert color="danger">{error}</Alert>}

            <Form
              onSubmit={handleSubmit(onSubmitForm)}
              className="position-relative"
            >
              {loginLoading && <Loader />}
              <div className="mb-3">
                <FormInput
                  label="Tên đăng nhập"
                  type="text"
                  name="email"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  placeholder="Nhập tên đăng nhập"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <FormInput
                  label="Mật khẩu"
                  type="password"
                  name="password"
                  register={register}
                  errors={errors}
                  control={control}
                  labelClassName="form-label"
                  className="form-control pe-5"
                  placeholder="Nhập mật khẩu"
                />
              </div>

              <div className="form-check form-check-info font-size-16">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember-check"
                />
                <Label
                  className="form-check-label font-size-14"
                  htmlFor="remember-check"
                >
                  Duy trì đăng nhập
                </Label>
              </div>

              <div className="text-center mt-4">
                <Button color="primary" className="w-100" type="submit">
                  Đăng nhập
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <Col xl={9} lg={8}>
          <div className="authentication-page-content">
            <div className="d-flex flex-column h-100 px-4 pt-4">
              <Row className="">
                <Col xl={12}>
                  <div className="text-center text-muted p-4">
                    <p className="mb-0">
                      Ứng dụng OTT Sở điện lực Bình Thuận
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </NonAuthLayoutWrapper>
  );
};

export default Login;
