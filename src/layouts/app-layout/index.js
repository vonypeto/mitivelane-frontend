import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import SideNav from "components/layout-components/SideNav";
import TopNav from "components/layout-components/TopNav";
import Loading from "components/shared-components/Loading";
import MobileNav from "components/layout-components/MobileNav";
import HeaderNav from "components/layout-components/HeaderNav";
import PageHeader from "components/layout-components/PageHeader";
import Footer from "components/layout-components/Footer";
import AppViews from "views/app-views";
import { Layout, Grid } from "antd";
import { useAuth } from "../../contexts/AuthContext";

import navigationConfig from "configs/NavigationConfig";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_TYPE_SIDE,
  NAV_TYPE_TOP,
  DIR_RTL,
  DIR_LTR,
} from "constants/ThemeConstant";
import utils from "utils";
import { useThemeSwitcher } from "react-css-theme-switcher";

const { Content } = Layout;
const { useBreakpoint } = Grid;

export const AppLayout = ({ navCollapsed, navType, location, direction }) => {
  const { currentBarangay } = useAuth();
  const [id, setId] = useState(currentBarangay);

  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = screens.length === 0 ? false : !screens.includes("lg");
  const isNavSide = navType === NAV_TYPE_SIDE;
  const isNavTop = navType === NAV_TYPE_TOP;
  useEffect(() => {
    console.log("layout", currentBarangay);
    return currentBarangay;
  });
  useEffect(() => {
    const unsubscribe = setId(currentBarangay);

    return unsubscribe;
  }, [currentBarangay]);

  // useEffect(() => {
  //   setCurrent(localStorage.getItem("auth_barangay"));
  //   setBarangay(localStorage.getItem("auth_barangay"));
  //   // if (currentBarangay) {
  //   //   setCurrent(currentBarangay);
  //   //   console.log("setdata");
  //   // }
  //   const data = localStorage.getItem("auth_barangay");
  //   if (data) {
  //     setCurrent(currentBarangay);
  //   }
  // }, [currentBarangay, localStorage.getItem("auth_barangay")]);

  const currentRouteInfo = utils.getRouteInfo(
    navigationConfig,
    location.pathname
  );
  const getLayoutGutter = () => {
    if (isNavTop || isMobile) {
      return 0;
    }
    return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH;
  };

  const { status } = useThemeSwitcher();

  if (status === "loading") {
    return <Loading cover="page" />;
  }

  const getLayoutDirectionGutter = () => {
    if (direction === DIR_LTR) {
      return { paddingLeft: getLayoutGutter() };
    }
    if (direction === DIR_RTL) {
      return { paddingRight: getLayoutGutter() };
    }
    return { paddingLeft: getLayoutGutter() };
  };

  return (
    <Layout>
      <HeaderNav isMobile={isMobile} />
      {isNavTop && !isMobile ? <TopNav routeInfo={currentRouteInfo} /> : null}
      <Layout className="app-container">
        {isNavSide && !isMobile ? (
          <SideNav routeInfo={currentRouteInfo} />
        ) : null}
        <Layout className="app-layout" style={getLayoutDirectionGutter()}>
          <div className={`app-content ${isNavTop ? "layout-top-nav" : ""}`}>
            <PageHeader
              display={currentRouteInfo?.breadcrumb}
              title={currentRouteInfo?.title}
            />
            {/* {localStorage.getItem("auth_barangay")} */}
            {/* {id} */}
            <Content>
              <AppViews />
            </Content>
          </div>
          <Footer />
        </Layout>
      </Layout>
      {isMobile && <MobileNav />}
    </Layout>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, navType, locale } = theme;
  return { navCollapsed, navType, locale };
};

export default connect(mapStateToProps)(React.memo(AppLayout));
