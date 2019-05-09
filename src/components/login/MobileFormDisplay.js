import React from 'react'
import GridItem from "../theme/Grid/GridItem.jsx";
import Card from "../theme/Card/Card";
import CustomTabs from "../theme/CustomTabs/CustomTabs.jsx";
import LoginForm from "../forms/login/LoginForm";
import RegisterForm from "../forms/register/RegisterForm";

const MobileFormDisplay = () => {
    return (
        <div style={{ backgroundColor: "#F4CCCC", zIndex: 5, height: "100vh" }} >
            <GridItem xs={12} sm={10} md={10}
              style={{
                position: "fixed",
                right: "0px",
                top: "70px",
                zIndex: 10,
                minWidth: "100vw",
                width: 'auto'
              }} >
              <Card style={{ padding: '0px'}}>
                <CustomTabs
                  headerColor="success"
                  tabs={[
                    {
                      tabName: "LOG IN",
                      tabIcon: "",
                      tabContent: <LoginForm />
                    },
                    {
                      tabName: "SIGN UP",
                      tabIcon: "",
                      tabContent: <RegisterForm />
                    }
                  ]}
                />
              </Card>
            </GridItem>
        </div>
    )
}
export default MobileFormDisplay;
