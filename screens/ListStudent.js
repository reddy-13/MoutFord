import React from "react";
import {
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
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

// import NavigationService from "@Service/Navigation";

import Style from "../Theme/Style";
import MESSAGES from "./Messages";
// import Style from '@Theme/Style'
// import Styles from '@Screen/Student/Messages/Style'

//const {width, height} = Dimensions.get('window')
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export default class ListStudent extends React.Component {
  render() {
    return (
      <Container style={Style.bgMain}>
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
                this.props.navigation.navigate("StudentHome");
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
            <Text style={Style.actionBarText}>{"Messages".toUpperCase()}</Text>
          </View>
          <View style={Style.actionBarRight}></View>
        </Header>

        <Content
          style={Style.layoutInner}
          contentContainerStyle={Style.layoutContent}
        >
          <ImageBackground
            source={require("../assets/images/profile-bg.png")}
            style={Styles.homeBg}
          >
            <View style={Styles.section}>
              <FlatList
                data={MESSAGES}
                style={Styles.item}
                renderItem={({ item, separators }) => (
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => {
                      this.props.navigation.navigate("StudentMessageView");
                    }}
                  >
                    <View style={Styles.record}>
                      <Image
                        source={item.illustration}
                        style={Styles.itemImg}
                      />
                      <View style={Styles.itemInfo}>
                        <Text style={Styles.itemTitle}>{item.title}</Text>
                        <Text style={Styles.itemDesc}>{item.desc}</Text>
                      </View>
                      {/* <Text style={Styles.itemDate}>01 Jul 2018</Text> */}
                    </View>
                  </TouchableHighlight>
                )}
              />
            </View>
          </ImageBackground>
        </Content>

        <Footer style={Style.greyTopLine}>
          <FooterTab style={Style.bgBot}>
            <Button
              style={Style.bgBot}
              onPress={() => {
                this.props.navigation.navigate("StudentHome");
              }}
            >
              <Icon name="home" type="FontAwesome" style={Style.textBlue} />
            </Button>
            <Button
              style={Style.bgBot}
              onPress={() => {
                this.props.navigation.navigate("StudentAttendance");
              }}
            >
              <Icon name="checklist" type="Octicons" style={Style.textBlue} />
            </Button>
            <Button
              style={Style.bgBot}
              onPress={() => {
                this.props.navigation.navigate("StudentProfile");
              }}
            >
              <Icon name="user" type="FontAwesome" style={Style.textBlue} />
            </Button>
            <Button
              style={Style.bgBot}
              onPress={() => {
                this.props.navigation.navigate("StudentMarks");
              }}
            >
              <Icon name="trophy" type="Ionicons" style={Style.textBlue} />
            </Button>
            <Button
              badge
              style={Style.bgBot}
              onPress={() => {
                this.props.navigation.navigate("StudentMessages");
              }}
            >
              <Badge>
                <Text>3</Text>
              </Badge>
              <Icon name="bell" type="Entypo" style={Style.textBlueActive} />
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

  homeBg: {
    flex: 1,
    paddingBottom: 30
  },

  section: {
    flex: 1,
    paddingLeft: 0,
    alignItems: "center",
    width: "100%"
  },

  item: {
    width: "100%",
    flexDirection: "column"
  },
  record: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#DDD",
    marginLeft: 0,
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: "#FFF"
  },
  recordLast: {
    flexDirection: "row",
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingVertical: 10
  },
  itemImg: {},
  itemInfo: {
    flex: 1,
    paddingHorizontal: 15
  },
  itemTitle: {
    color: "#333",
    fontSize: 12,
    fontFamily: "Montserrat-SemiBold",
    marginBottom: 0
  },

  itemDesc: {
    color: "#666",
    fontSize: 11,
    fontFamily: "Montserrat-Regular",
    marginBottom: 5,
    lineHeight: 16
  },
  itemDate: {
    color: "#999",
    fontSize: 10,
    fontFamily: "Montserrat-Regular"
  },
  crv: {
    borderRadius: 8
  },

  detail: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    borderRadius: 8,
    backgroundColor: "#FFF",
    elevation: 4,
    shadowOffset: {
      width: 15,
      height: 15
    },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20
  },

  img: {
    flex: 1,
    marginBottom: 20
  },
  desc: {
    color: "#666",
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
    marginBottom: 5,
    lineHeight: 20
  }
});
