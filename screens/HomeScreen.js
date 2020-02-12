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
  FlatList,
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
  View,
  FooterTab,
  Badge
} from "native-base";

// import NavigationService from "@Service/Navigation";

import ACTIVITIES from "./Activities";

import Style from "../Theme/Style";
// import Styles from "@Screen/Student/Home/Style";
import api from "../constants/api";
//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_no: 8547861657
    };
  }
  componentDidMount() {
    this._loadData();
  }

  _loadData = () => {
    console.log("loding");

    fetch(api.ws_url + "stu_view", {
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
          console.log(res.students);

          // this.setState({ mobile_no: res.mobile_no });

          // let data = res.students.map((student, index) => {
          //   AsyncStorage.setItem(
          //     "student" + index + "",
          //     JSON.stringify(student)
          //   );
          //   console.log("student" + index + ">> " + JSON.stringify(student));
          // });
          //   AsyncStorage.setItem("user_id", user_id);
          //   AsyncStorage.setItem("name", name);
          //   AsyncStorage.setItem("user_type", "doctor");
          //   NavigationService.navigate('StudentLoginOTP');
        } else {
          alert(res.msg);
        }
      })
      .catch(error => {
        console.error(error);
      });
    this.getData();
  };
  getData = async () => {
    let data = await AsyncStorage.getItem("student1");
    console.log("localdata >>>>>>>>>>>>>>>>>>>>>>>" + data.json());
  };

  render() {
    return (
      <Container style={Style.bgMain}>
        <Header style={Style.navigation}>
          <StatusBar
            backgroundColor="#101E3D"
            animated
            barStyle="light-content"
          />

          {/* <View style={Style.actionBarLeft}>
            <Button
              transparent
              onPress={() => {
                // this.props.navigation.openDrawer();
              }}
            >
              <Image source={require("../assets/images/menu.png")} />
            </Button>
          </View> */}
          <View style={Style.actionBarMiddle}>
            <Text style={Style.actionBarText}>{"Home".toUpperCase()}</Text>
          </View>
          <View style={Style.actionBarRight}></View>
        </Header>

        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          <View style={Styles.profile}>
            <View>
              <Image
                source={require("../assets/images/student-avatar.png")}
                style={Styles.profileImg}
              />
            </View>
            <View style={Styles.studentInfo}>
              <Text style={Styles.name}>{"Valentino C".toUpperCase()}</Text>
              <Text style={Styles.study}>I Std - A</Text>
            </View>
          </View>

          <ImageBackground
            source={require("../assets/images/white-bg.png")}
            imageStyle={"cover"}
            style={Styles.homeBg}
          >
            <View style={Styles.btnLayout}>
              <TouchableOpacity
                style={Styles.btnBox}
                onPress={() => {
                  // this.props.navigation.navigate('StudentAttendance');
                }}
              >
                <Image
                  source={require("../assets/images/btn-attendance.png")}
                  resizeMode={"cover"}
                  style={Styles.btnImg}
                />
                <Text style={Styles.btnText}>Attendance</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={Styles.btnBox}
                onPress={() => {
                  // this.props.navigation.navigate('StudentMessages');
                }}
              >
                <Image
                  source={require("../assets/images/btn-messages.png")}
                  style={Styles.btnImg}
                />
                <Text style={Styles.btnText}>Messages</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={Styles.btnBox}
                onPress={() => {
                  // this.props.navigation.navigate('StudentProfile');
                }}
              >
                <Image
                  source={require("../assets/images/btn-boy.png")}
                  style={Styles.btnImg}
                />
                <Text style={Styles.btnText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={Styles.btnBox}
                onPress={() => {
                  // this.props.navigation.navigate('StudentMarks');
                }}
              >
                <Image
                  source={require("../assets/images/btn-marks.png")}
                  style={Styles.btnImg}
                />
                <Text style={Styles.btnText}>Marks</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={Styles.btnBox}
                onPress={() => {
                  // this.props.navigation.navigate('StudentTrackLocation');
                }}
              >
                <Image
                  source={require("../assets/images/btn-track-location.png")}
                  style={Styles.btnImg}
                />
                <Text style={Styles.btnText}>Track Location</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={Styles.btnBox}
                onPress={() => {
                  // this.props.navigation.navigate("StudentFees");
                }}
              >
                <Image
                  source={require("../assets/images/btn-fees.png")}
                  style={Styles.btnImg}
                />
                <Text style={Styles.btnText}>Fees</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <View style={Styles.section}>
            <View style={Styles.headerBg}>
              <Icon
                name="library-music"
                type="MaterialCommunityIcons"
                style={Style.textBlack}
              />
              <Text style={Styles.sHeader}>{"Activities".toUpperCase()}</Text>
              <Right>
                <Button
                  small
                  rounded
                  style={Styles.sBtn}
                  onPress={() => {
                    // this.props.navigation.navigate('StudentActivities');
                  }}
                >
                  <Text style={Styles.sLink}>See All</Text>
                </Button>
              </Right>
            </View>
            <FlatList
              data={ACTIVITIES}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, separators }) => (
                <TouchableOpacity
                  style={Styles.item}
                  underlayColor="transparent"
                  onPress={() => {
                    // this.props.navigation.navigate('StudentActivities');
                  }}
                >
                  <View>
                    <View style={Styles.itemBg}>
                      <Image
                        source={item.illustration}
                        style={Styles.itemImg}
                      />
                    </View>
                    <Text style={Styles.itemTitle}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Content>

        <Footer style={Style.greyTopLine}>
          <FooterTab style={Style.bgBot}>
            <Button
              style={Style.bgBot}
              onPress={() => {
                // this.props.navigation.navigate('StudentHome');
              }}
            >
              <Icon
                name="home"
                type="FontAwesome"
                style={Style.textBlueActive}
              />
            </Button>
            <Button
              style={Style.bgBot}
              onPress={() => {
                // this.props.navigation.navigate('StudentAttendance');
              }}
            >
              <Icon name="checklist" type="Octicons" style={Style.textBlue} />
            </Button>
            <Button
              style={Style.bgBot}
              onPress={() => {
                // this.props.navigation.navigate('StudentProfile');
              }}
            >
              <Icon name="user" type="FontAwesome" style={Style.textBlue} />
            </Button>
            <Button
              style={Style.bgBot}
              onPress={() => {
                // this.props.navigation.navigate('StudentMarks');
              }}
            >
              <Icon name="trophy" type="Ionicons" style={Style.textBlue} />
            </Button>
            <Button
              badge
              style={Style.bgBot}
              onPress={() => {
                // this.props.navigation.navigate('StudentMessages');
              }}
            >
              <Badge>
                <Text>3</Text>
              </Badge>
              <Icon name="bell" type="Entypo" style={Style.textBlue} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const Styles = StyleSheet.create({
  layoutContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  profile: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#101E3D",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30
  },
  profileImg: {
    /*borderWidth: 1,
      borderColor: '#F3BA1D',*/
    borderRadius: 30
  },
  studentInfo: {
    flexDirection: "column",
    marginLeft: 20
  },
  name: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 5,
    marginTop: 5,
    fontFamily: "Montserrat-Regular"
  },
  study: {
    fontSize: 14,
    color: "#F3BA1D",
    fontFamily: "Montserrat-Regular"
  },

  homeBg: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  btnLayout: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  btnBox: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: "33%",
    marginBottom: 1
  },
  btnImg: {
    marginBottom: 10
  },
  btnText: {
    color: "#333",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 12,
    textAlign: "center"
  },

  section: {
    flex: 1,
    paddingLeft: 20,
    paddingVertical: 30,
    backgroundColor: "#f0f0f0"
  },
  sectionGrey: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#f0f0f0"
  },
  headerBg: {
    flexDirection: "row",
    marginBottom: 15
  },
  sHeader: {
    color: "#333",
    marginLeft: 3,
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    marginTop: 5
  },
  sBtn: {
    padding: 1,
    backgroundColor: "#e7e7e7",
    color: "#FFF",
    marginRight: 10
  },
  sLink: {
    color: "#666",
    fontSize: 10,
    fontFamily: "Montserrat-SemiBold"
  },

  itemList: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10
  },
  item: {
    width: 110,
    marginRight: 15
  },
  itemBg: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 15
  },
  itemImg: {},
  itemTitle: {
    color: "#333",
    fontSize: 12,
    fontFamily: "Montserrat-SemiBold",
    marginBottom: 5,
    textAlign: "center"
  },
  crv: {
    borderRadius: 8
  }
});
