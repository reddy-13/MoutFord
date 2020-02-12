import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

export default class LoadingScreen extends React.Component {
  static navigationOptions = {
    title: "Loading",
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      mobile_no: "",
      opt_status: ""
    };
  }
  componentDidMount() {
    this._loadData().done();
  }

  _loadData = async () => {
    try {
      //   AsyncStorage.clear(); //for testing purpose
      let mobile_no = await AsyncStorage.getItem("mobile_no");
      //   console.log(mobile_no);
      let opt_status = await AsyncStorage.getItem("opt_status");
      //   let user_type = await AsyncStorage.getItem("user_type");
      //   let username = await AsyncStorage.getItem("username");
      //   console.log(username);
      if (mobile_no !== null && opt_status == "sent") {
        this.props.navigation.replace("OTPScreen", { mobile_no: mobile_no });
      } else if (mobile_no !== null && opt_status == "verified") {
        this.props.navigation.replace("HomeScreen", { mobile_no: mobile_no });
      } else {
        this.props.navigation.replace("LoginScreen");
      }
    } catch (error) {
      alert(error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>user id : {this.state.user_id}</Text> */}
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
