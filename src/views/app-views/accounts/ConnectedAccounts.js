import { React, useState, useEffect } from "react";
import { Button, Row, Col, Card, Form, message } from "antd";
import { FacebookFilled, CloseCircleFilled } from "@ant-design/icons";
import { useAuth } from "contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { googleAuthProvider, facebookAuthProvider } from "auth/FirebaseAuth";
import firebase from "firebase/app";
import { set } from "react-hook-form";

const ConnectedAccount = () => {
  const auth = firebase.auth();

  const { currentUser } = useAuth();
  const [editOrganization, setEditOrganization] = useState(false);
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const [isLoading, setIsLoading] = useState(true);
  const [connectAccount, setConnectAccount] = useState(false);
  const [getGoogleProvider, setGoogleProvider] = useState();
  const [getFaceBookProvider, setFaceBookProvider] = useState();
  const [currentDataUser, setCurrentDataUser] = useState(auth.currentUser);
  // useEffect(() => {
  //   if (connectAccount) setConnectAccount(!connectAccount);
  // }, [connectAccount]);
  useEffect(() => {
    setGoogleProvider(
      currentDataUser.providerData.filter(
        (provider) => provider.providerId === "google.com"
      )
    );
    setFaceBookProvider(
      currentDataUser.providerData.filter(
        (provider) => provider.providerId === "facebook.com"
      )
    );
    if (isLoading)
      setTimeout(() => {
        setIsLoading(!isLoading);
      }, 1000);
  }, [isLoading, currentDataUser]);
  const mergeAndUnmergeWithFacebook = () => {
    setIsLoading(true);
    const user = auth.currentUser;

    //treatment thus using it in an if statement.
    setTimeout(() => {
      if (user) {
        //should be triggered (merge or unmerge).
        const providerIndex = checkIfLinked(user, "facebook.com");
        if (providerIndex != -1) {
          unmerge(user, providerIndex);
        } else {
          merge(user, facebookProvider);
        }
      }
    }, 1000);
  };

  // Same code as above except it's for merging with a Google account
  const mergeAndUnmergeWithGoogle = () => {
    setConnectAccount(true);
    setIsLoading(true);
    const user = auth.currentUser;
    setTimeout(() => {
      if (user) {
        const providerIndex = checkIfLinked(user, "google.com");
        if (providerIndex != -1) {
          unmerge(user, providerIndex);
        } else {
          merge(user, googleProvider);
        }
      }
    }, 1000);
  };

  const unmerge = (user, providerIndex) => {
    user
      .unlink(user.providerData[providerIndex].providerId)
      .then(() => {
        setTimeout(() => {
          setCurrentDataUser(user);
          setConnectAccount(false);
          setGoogleProvider(
            user.providerData.filter(
              (provider) => provider.providerId === "google.com"
            )
          );
          setFaceBookProvider(
            user.providerData.filter(
              (provider) => provider.providerId === "facebook.com"
            )
          );
          setEditOrganization(false);
          setIsLoading(false);
          console.log("Unlinked successfully!");
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        setTimeout(() => {
          setConnectAccount(false);
          setEditOrganization(false);
          setIsLoading(false);
        }, 1000);
      });
  };

  const checkIfLinked = (user, providerId) => {
    //provider Data is an array that contains the providers linked to their account
    // "google.com", "twitter.com", etc..
    const userProviders = user.providerData;
    let providerIndex = -1;
    for (let i = 0; i < userProviders.length; i++) {
      if (userProviders[i].providerId === providerId) providerIndex = i;
    }
    //-1 if the provider doesn't exist
    return providerIndex;
  };
  const merge = (previousUser, provider) => {
    previousUser
      .linkWithPopup(provider)
      .then((result) => {
        setConnectAccount(false);

        setTimeout(() => {
          setCurrentDataUser(result.user);
          setGoogleProvider(
            result.user.providerData.filter(
              (provider) => provider.providerId === "google.com"
            )
          );
          setFaceBookProvider(
            result.user.providerData.filter(
              (provider) => provider.providerId === "facebook.com"
            )
          );
          setEditOrganization(false);
          setIsLoading(false);

          console.log("Accounts linked successfully!");
        }, 1000);
        // Accounts successfully linked.
        // const secondAccountCred = result.credential;
        // previousUser.linkWithCredential(secondAccountCred);
        // auth.signInWithCredential(secondAccountCred);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          setConnectAccount(false);
          setEditOrganization(false);
          setIsLoading(false);
        }, 1000);
      });
  };
  const onClickEdit = () => {
    setEditOrganization(!editOrganization);
  };

  const ConnectedAccountData = () => {
    return (
      <Col xs={24} sm={24} md={24} className="w-100">
        {" "}
        <Row className="pt-2 border-top">
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={6}
            xl={4}
            className="pt-2 text-left "
          >
            <h5 className=" font-weight-bold">
              {" "}
              <span style={{ color: "#2EA1F5", fontSize: "20px" }}>
                {" "}
                <FacebookFilled />
              </span>{" "}
              Facebook:
            </h5>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={18}
            xl={20}
            className="text-left form-input-mb"
          >
            <Form.Item>
              {editOrganization ? (
                <div className="d-flex justify-content-between">
                  {getFaceBookProvider[0]?.uid ? (
                    <>
                      <Button size="medium">Connected</Button>{" "}
                      <Button
                        loading={connectAccount}
                        size="medium"
                        onClick={() => {
                          mergeAndUnmergeWithFacebook();
                        }}
                      >
                        <CloseCircleFilled />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        loading={connectAccount}
                        size="medium"
                        onClick={() => {
                          mergeAndUnmergeWithFacebook();
                        }}
                      >
                        {connectAccount ? "Connecting..." : "Connect"}
                      </Button>{" "}
                    </>
                  )}
                </div>
              ) : (
                <div className="pt-2 font-size-md">
                  {isLoading
                    ? "Loading..."
                    : getFaceBookProvider[0]?.displayName}
                </div>
              )}
            </Form.Item>
          </Col>
        </Row>{" "}
        <Row className="pt-2 border-top">
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={6}
            xl={4}
            className="pt-2 text-left "
          >
            <h5 className=" font-weight-bold">
              {" "}
              <span style={{ fontSize: "20px" }}>
                {" "}
                <FcGoogle className="anticon" />
              </span>{" "}
              Google:
            </h5>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={18}
            xl={20}
            className="text-left form-input-mb"
          >
            <Form.Item>
              {editOrganization ? (
                <div className="d-flex justify-content-between ">
                  {getGoogleProvider[0]?.uid ? (
                    <>
                      <Button size="medium">Connected</Button>{" "}
                      <Button
                        loading={connectAccount}
                        size="medium"
                        onClick={() => mergeAndUnmergeWithGoogle()}
                      >
                        <CloseCircleFilled />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        loading={connectAccount}
                        size="medium"
                        onClick={() => mergeAndUnmergeWithGoogle()}
                      >
                        {connectAccount ? "Connecting..." : "Connect"}{" "}
                      </Button>{" "}
                    </>
                  )}
                </div>
              ) : (
                <div className="pt-2 font-size-md ">
                  {isLoading ? "Loading..." : getGoogleProvider[0]?.displayName}
                </div>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} gutter={16} className="pt-4 w-100">
            {editOrganization ? (
              <>
                <Button onClick={() => onClickEdit()}>Cancel</Button>
              </>
            ) : (
              <Button onClick={() => onClickEdit()} type="primary">
                Edit Information
              </Button>
            )}
          </Col>
        </Row>
      </Col>
    );
  };
  return (
    <>
      <Col xs={24} sm={24} md={8}>
        <div className="pl-1">
          <h3>Connected Accounts</h3>
          <p className="mt-1 text-sm text-gray-600">
            Connect your MitiveLane account to one or more Social providers to
            make logging in and collaborating with your team easier.
          </p>
        </div>
      </Col>
      <Col xs={24} sm={24} md={15} className="ant-body-pt">
        <Form>
          <Card title="Account Connections">
            <ConnectedAccountData />
          </Card>
        </Form>
      </Col>
    </>
  );
};

export default ConnectedAccount;
