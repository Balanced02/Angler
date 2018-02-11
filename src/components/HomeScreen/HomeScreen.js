import React from "react";
import { StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right
} from "native-base";
import FontAwesome, { Icons } from 'react-native-fontawesome'

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Container >
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>HomeScreen</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Button style={{ marginTop: 10 }} onPress={() => this.props.navigation.navigate("Registration")} >
            <Card >
              <CardItem header>
                <Text>Register</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <FontAwesome > {Icons.registered} </FontAwesome>
                </Body>
              </CardItem>
            </Card>
          </Button>
          <Button style={{ marginTop: 10 }} onPress={() => this.props.navigation.navigate("TranslateScreen")} >
            <Card >
              <CardItem header>
                <Text>Verify</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <FontAwesome > {Icons.checkSquareO} </FontAwesome>
                </Body>
              </CardItem>
            </Card>
          </Button>
          <Button style={{ marginTop: 10 }} onPress={() => this.props.navigation.navigate("TranslateScreen")} >
            <Card >
              <CardItem header>
                <Text>Communicate</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <FontAwesome > {Icons.commentsO} </FontAwesome>
                </Body>
              </CardItem>
            </Card>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("ProfileScreen")}
          >
            <Text>Goto Profiles</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("TranslateScreen")}
          >
            <Text>Translate</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}