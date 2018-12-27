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

  _validate = () => {
    const { result } = this.state;
    switch (result.slice(-1)) {
      case "+":
      case "-":
      case "*":
      case "/":
      case ".":
        return false;
    }
    return true;
  };

  _calculateResult = () => {
    const { result } = this.state;
    this.setState({
      store: eval(result)
    });
  };

  _pressButton = num => {
    const { result } = this.state;
    if (result == "" && num == ".") return false;
    else if (result.slice(-1) == "." && num == ".") return false;
    else if (num == "=") {
      return this._validate() && this._calcultateResult();
    } else {
      this.setState({
        result: result + num
      });
    }
  };

  _operate = operation => {
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
        if (result.slice(-1) >= 0) {
          this.setState({
            result: result + operation
          });
        }
    }
  };

  _resetButton = () => {
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
              this._operate(operation[k]);
            }}
          >
            <View key={k} style={[styles.box, { paddingTop: "25%" }]}>
              <Text style={styles.boxInnerText}>{operation[k]}</Text>
            </View>
          </TouchableOpacity>
        );
      } else {
        operationBox.push(
          <TouchableOpacity
            key={operation[k]}
            onPress={() => {
              this._operate(operation[k]);
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
          <TouchableOpacity onPress={() => this._resetButton()}>
            <Text style={styles.titleText}>Simple Calculator</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.operatorView}>{operationBox}</View>
        <View style={styles.numberPadView}>{row}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
    flex: 1,
    backgroundColor: "black"
  },

  screenView: {
    flex: 4.5,
    backgroundColor: "transparent"
  },

  innerScreenView: {
    padding: "3%",
    flex: 8,
    backgroundColor: "white",
    width: "100%",
    height: 250,
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: "#bbb",
    alignItems: "flex-end"
  },

  resultView: {
    paddingTop: "3%",
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

  titleText: {
    fontSize: 40,
    fontWeight: "100",
    color: "white",
    backgroundColor: "transparent"
  },

  operatorView: {
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
