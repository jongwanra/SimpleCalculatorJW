import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";

const { width } = Dimensions.get("window");
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      result: "",
      store: ""
    };
  }

  validate = () => {
    const { result } = this.state;
    switch (result.slice(-1)) {
      case "+":
      case "-":
      case "*":
      case "/":
        return false;
    }
    return true;
  };

  calculateResult = () => {
    const { result } = this.state;
    this.setState({
      store: eval(result)
    });
  };

  _pressButton = num => {
    const { result } = this.state;

    if (num == "=") {
      return this.validate() && this.calculateResult();
    } else {
      this.setState({
        result: result + num
      });
    }
  };

  operate = operation => {
    const { result } = this.state;
    switch (operation) {
      case "←":
        const text = result.split("");
        text.pop();
        this.setState({
          result: text.join("")
        });
        break;

      case "+":
      case "-":
      case "*":
      case "/":
        if (result == "") return false;
        if (result.slice(-1) > 0) {
          this.setState({
            result: result + operation
          });
        }
    }
  };

  _pressReset = () => {
    this.setState({
      result: "",
      store: ""
    });
  };
  render() {
    let numbers = [[1, 2, 3, 0], [4, 5, 6, "."], [7, 8, 9, "="]];
    let row = [];
    for (let i = 0; i < 3; i++) {
      let numberBox = [];
      for (let j = 0; j < 4; j++) {
        numberBox.push(
          <View key={j} style={styles.numberView}>
            <TouchableOpacity
              key={numbers[i][j]}
              onPress={() => {
                this._pressButton(numbers[i][j]);
              }}
            >
              <Text style={styles.numberText}>{numbers[i][j]}</Text>
            </TouchableOpacity>
          </View>
        );
      }
      row.push(
        <View key={i} style={styles.numberLineView}>
          {numberBox}
        </View>
      );
    }

    let operation = ["+", "-", "*", "/", "←"];
    let operationBox = [];
    for (let k = 0; k < 5; k++) {
      if (k === 2) {
        operationBox.push(
          <TouchableOpacity
            key={operation[k]}
            onPress={() => {
              this.operate(operation[k]);
            }}
          >
            <View key={k} style={[styles.box, { paddingTop: "20%" }]}>
              <Text style={styles.boxInnerText}>{operation[k]}</Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        operationBox.push(
          <TouchableOpacity
            key={operation[k]}
            onPress={() => {
              this.operate(operation[k]);
            }}
          >
            <View key={k} style={styles.box}>
              <Text style={styles.boxInnerText}>{operation[k]}</Text>
            </View>
          </TouchableOpacity>
        );
      }
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle={"light-content"} />
        <View style={styles.screenView}>
          <View style={styles.innerScreenView}>
            <Text style={{ fontSize: 40 }}>{this.state.result}</Text>
          </View>

          <View style={styles.resultView}>
            <Text style={{ fontSize: 30, color: "blue" }}>
              {this.state.store}
            </Text>
          </View>
        </View>

        <View style={styles.titleView}>
          <TouchableOpacity onPress={() => this._pressReset()}>
            <Text style={styles.title}>Simple Calculator</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonView}>{operationBox}</View>
        <View style={styles.numberPadView}>{row}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
    //alignItems: "center"
  },

  screenView: {
    paddingTop: "5%",
    flex: 4.5,
    backgroundColor: "transparent"
    //alignItems: ""
  },

  innerScreenView: {
    flex: 8,
    backgroundColor: "white",
    width: "100%",
    height: 250,
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: "#bbb",
    alignItems: "flex-end"
    //justifyContent: "center"
  },

  resultView: {
    flex: 2,
    backgroundColor: "white",
    width: "100%",
    alignItems: "flex-end"
  },

  titleView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center"
  },

  title: {
    fontSize: 40,
    fontWeight: "100",
    color: "white",
    backgroundColor: "transparent"
  },

  buttonView: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row"
  },
  numberPadView: {
    flex: 3.5,
    backgroundColor: "transparent"
  },

  box: {
    width: width / 5,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "white"
  },

  boxInnerText: {
    fontSize: 35,
    fontWeight: "100",
    color: "white"
  },

  numberLineView: {
    flex: 0.3,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "white"
  },
  numberView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  numberText: {
    fontSize: 40,
    fontWeight: "100",
    color: "white"
  }
});
