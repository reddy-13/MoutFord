import React from "react";
import {
  StatusBar,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  Platform,
  SafeAreaView,
  View,
  FlatList
} from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Text,
  Title,
  Left,
  Right,
  Body,
  Input,
  Item,
  Footer,
  FooterTab,
  Badge
} from "native-base";
import OtpInputs from "react-native-otp-inputs";
// import NavigationService from '@Service/Navigation'

import Style from "../Theme/Style";
// import Styles from "/Style";
import api from "../constants/api";

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export default class OTPScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_no: "",
      otp: "",
      status: ""
    };
  }

  // componentDidMount() {
  //   // this._loadData().done();
  // }
  veryfyOTP = async () => {
    try {
      //   let mobile_no = await AsyncStorage.getItem('mobile_no');

      const mobile_no = await this.props.navigation.getParam("mobile_no");
      this.setState({ mobile_no: mobile_no });

      // this.setState({ visible: true });
      console.log("sending data ");
      console.log("otp" + this.state.otp);

      fetch(api.ws_url + "otp_req", {
        method: "POST",
        headers: {
          Accept: "applicaton/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_mobile: this.state.mobile_no,
          opt: this.state.otp
        })
      })
        .then(responce => responce.json())
        .then(res => {
          // this.setState({ visible: false });
          console.log(res);
          // if (res.msg === "success") {
          //   this.setState({
          //     data: res.schedule_data.filter(p => {
          //       return p.patient_name != null;
          //     })
          //   });
          //   console.log(res.schedule_data[0].doctor_name);
          // } else {
          //   alert(res.msg);
          //   this.setState({ data: [] });
          // }
        });
    } catch (error) {
      alert(error);
    }
  };
  render() {
    return (
      <Container style={Style.bgMainIntro}>
        <Header style={Style.navigation}>
          <StatusBar
            backgroundColor="#101E3D"
            animated
            barStyle="light-content"
          />

          <View style={Style.actionBarLeft}>
            <Button
              transparent
              style={Style.actionBarBtn}
              onPress={() => {
                // this.props.navigation.navigate("HomeScreen");
                // NavigationService.navigate("StudentLogin");
                this.veryfyOTP();
              }}
            >
              <Icon
                active
                name="arrow-left"
                style={Style.textWhite}
                type="MaterialCommunityIcons"
              />
            </Button>
          </View>
          <View style={Style.actionBarMiddle}>
            <Text style={Style.actionBarText}>
              {"Verification".toUpperCase()}
            </Text>
          </View>
          <View style={Style.actionBarRight}></View>
        </Header>

        <Content
          style={Style.layoutInner}
          contentContainerStyle={Styles.layoutContent}
        >
          <View style={Styles.loginBg}>
            <Text style={Styles.title}>
              We sent you a code to verify your mobile number
            </Text>
            <Text style={Styles.subTitle}>Enter your OTP Code here</Text>
            <View>
              <View style={Styles.textInputGroup}>
                {/* <TextInput style={Styles.textInput} />
                <TextInput style={Styles.textInput} />
                <TextInput style={Styles.textInput} />
                <TextInput style={Styles.textInput} /> */}

                <OtpInputs
                  handleChange={code => console.log(code)}
                  numberOfInputs={4}
                  inputStyles={Styles.textInput}
                  handleChange={otp => {
                    this.setState({ otp: otp });
                    console.log("otp: " + otp);
                  }}
                />
              </View>
              <Button
                style={Styles.loginBtn}
                onPress={() => {
                  //   NavigationService.navigate("StudentHome");
                  // this.props.navigation.navigate("HomeScreen");
                  this.veryfyOTP();
                }}
              >
                <Text style={Styles.loginBtnText}>
                  {"Submit".toUpperCase()}
                </Text>
                <Icon
                  active
                  name="arrow-right"
                  type="MaterialCommunityIcons"
                  style={Styles.loginBtnIcon}
                />
              </Button>
            </View>
            <Text style={Styles.text}>I didn't receive a code!</Text>
            <Text style={Styles.textLink}>Resend Code</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const Styles = StyleSheet.create({
  layoutContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },

  loginBg: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 30
  },
  title: {
    color: "#FFF",
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 50
  },
  subTitle: {
    color: "#FFF",
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15
  },
  textInputGroup: {
    flexDirection: "row"
  },
  textInput: {
    backgroundColor: "#48556E",
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 2,
    justifyContent: "space-between",
    flexGrow: 1,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: "#FFF"
  },

  loginBtn: {
    width: "100%",
    backgroundColor: "#F3BA1D",
    borderRadius: 5,
    paddingVertical: 15
  },
  loginBtnText: {
    fontFamily: "Montserrat-Regular",
    color: "#101E3D",
    fontSize: 14
  },
  loginBtnIcon: {
    color: "#101E3D",
    fontSize: 24
  },

  text: {
    color: "#FFF",
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 5
  },
  textLink: {
    color: "#F3BA1D",
    fontFamily: "Montserrat-SemiBold",
    textAlign: "center",
    fontSize: 13
  }
});
