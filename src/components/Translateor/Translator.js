import React, { Component } from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
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
  Right,
  Item,
  Input
} from "native-base";

export default class Translator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      translated: '',
      language: '',
      translationLanguage: '',
      supportedLanguages: []
    }
    this.handleInputchange = this.handleInputchange.bind(this)
  }

  handleInputchange(typedText) {
    this.setState({
      ...this.state,
      text: typedtext,
      translated: typedText
    })
    // this.detectLanguage()
  }

  // detectLanguage() {
  //   let text = this.state.text
  //   if (!text) return
  //   let language = ''
  //   googleTranslate.detectLanguage('Gracias', function (err, detection) {
  //     this.setState({
  //       translationLanguage: detection.language || ''
  //     })
  //   });
  // }

  // getTranslation() {
  //   let text = this.state.text
  //   if (!text) return
  //   this.setState({
  //     translated: text
  //   })
  // }

  // getSupportedLanguages() {
  //   googleTranslate.getSupportedLanguages(function (err, languageCodes) {
  //     this.setState({
  //       supportedLanguages: languageCodes
  //     })
  //   });
  // }

  componentWillMount() {
    // this.getSupportedLanguages()
  }

  render() {
    const { text, translated } = this.state
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
            <Title>Translator</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Item>
                  <KeyboardAvoidingView behavior='padding' >
                    <Input placeholder="Sentence to translate" onChange={this.handleInputchange} value={text} style={Styles.inputStyle} />
                  </KeyboardAvoidingView>
                </Item>
                <Item>
                  <Text> {translated} </Text>
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Button
            full
            rounded
            dark
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Chat")}
          >
            <Text>Chat With People</Text>
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
        </Content>
      </Container>
    );
  }
}

const Styles = {
  inputStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: 300,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
  },
}