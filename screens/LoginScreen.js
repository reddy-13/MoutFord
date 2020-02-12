import React from "react";
import {
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
  FlatList,
  ToastAndroid,
  AsyncStorage
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

// import NavigationService from "@Service/Navigation";

import Style from "../Theme/Style";
// import Styles from "/Style";
import api from "../constants/api";
//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_no: "",
      status: ""
    };
  }

  Toast = message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
  };

  login = () => {
    if (this.state.mobile_no == "") {
      this.Toast("Please enter mobile number");
    }
    //  else if (this.state.mobile_no.length <= 9) {
    //   this.Toast("Please enter valid mobile number");
    // }
    else {
      console.log(this.state);
      fetch(api.ws_url + "login_req", {
        method: "POST",
        headers: {
          Accept: "applicaton/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_mobile: this.state.mobile_no
        })
      })
        .then(response => response.json())
        .then(res => {
          console.log(res);
          // alert(res.msg);
          if (res.status === "success") {
            this.setState({ mobile_no: res.mobile_no });

            console.log(res);
            AsyncStorage.setItem("mobile_no", this.state.mobile_no);
            AsyncStorage.setItem("opt_status", "sent");
            //   AsyncStorage.setItem("user_type", "doctor");
            this.props.navigation.navigate("OTPScreen", {
              mobile_no: this.state.mobile_no
            });
          } else {
            alert(res.msg);
          }
        });
    }
  };
  render() {
    return (
      <Container style={Style.bgMainIntro}>
        <Content
          style={Style.layoutInner}
          contentContainerStyle={Styles.layoutContent}
        >
          <View style={Styles.loginBg}>
            <Image
              source={require("../assets/images/logo.png")}
              style={Styles.logoImg}
            />
            <Text style={Styles.logoText}>{"GVHSSM".toUpperCase()}</Text>
            <View>
              <Text style={Styles.textLabel}>{"Mobile No.".toUpperCase()}</Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="number-pad"
                maxLength={10}
                style={Styles.textInput}
                onChangeText={mobile_no => this.setState({ mobile_no })}
              />
              <Button
                style={Styles.loginBtn}
                onPress={() => {
                  this.login();
                  // this.props.navigation.navigate("OTPScreen");
                }}
              >
                <Text style={Styles.loginBtnText}>{"Login".toUpperCase()}</Text>
                <Icon
                  active
                  name="arrow-right"
                  type="MaterialCommunityIcons"
                  style={Styles.loginBtnIcon}
                />
              </Button>
            </View>
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
  logoImg: {
    marginBottom: 20,
    alignSelf: "center"
  },
  logoText: {
    color: "#F3BA1D",
    fontFamily: "Montserrat-SemiBold",
    alignSelf: "center",
    marginBottom: 30,
    fontSize: 20,
    lineHeight: 28,
    textAlign: "center"
  },
  textLabel: {
    fontFamily: "Montserrat-Regular",
    color: "#FFF",
    fontSize: 13,
    marginBottom: 10
  },
  textInput: {
    backgroundColor: "#48556E",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: "#fff"
  },

  loginBtn: {
    width: "100%",
    backgroundColor: "#F3BA1D",
    borderRadius: 5,
    paddingVertical: 20
  },
  loginBtnText: {
    fontFamily: "Montserrat-SemiBold",
    color: "#101E3D",
    fontSize: 14
  },
  loginBtnIcon: {
    color: "#101E3D",
    fontSize: 24
  }
});
