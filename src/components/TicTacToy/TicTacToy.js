import React from 'react';
import './styles/TicTacToy.scss';
import { ReactSVG } from 'react-svg'

const players = {
  o: {
    className: "circle",
    fileName: "circle.svg"
  },
  x: {
    className: "cross",
    fileName: "cross.svg"
  },
  firstPlayer: "o",
  secondPlayer: "x"
};

const reducer = (action) => (state, props) => {
  switch (action.type) {
    case "FILL_CELL": {
      console.log("FILL_CELL");
      let resultState = {...state};
      resultState.field[action.key].value = action.value;
      return resultState;
    }
    case "CHANGE_CURRENT_PLAYER": {
      console.log("CHANGE_CURRENT_PLAYER");
      return Object.assign({}, state, {
        currentPlayer: action.playerCode
      });
    }
    default:
      return state
  }
};

class TicTacToy extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        fieldIsReady: true,
        currentPlayer: "x",
        firstPlayer: null,
        field: {
                  "0_0": {value: null, onClick: this.makeTableCellOnClick("0_0")},
                  "0_1": {value: "o", onClick: this.makeTableCellOnClick("0_1")},
                  "0_2": {value: null, onClick: this.makeTableCellOnClick("0_2")},
                  "1_0": {value: null, onClick: this.makeTableCellOnClick("1_0")},
                  "1_1": {value: null, onClick: this.makeTableCellOnClick("1_1")},
                  "1_2": {value: "x", onClick: this.makeTableCellOnClick("1_2")},
                  "2_0": {value: null, onClick: this.makeTableCellOnClick("2_0")},
                  "2_1": {value: null, onClick: this.makeTableCellOnClick("2_1")},
                  "2_2": {value: null, onClick: this.makeTableCellOnClick("2_2")}
                }
      }
  }

  render() {
    return(
      <div className="tictac-container">
        <ReactSVG className="lattice" src="lattice.svg"/>
        <div className="field">
            {this.renderTable()}
        </div>
      </div>
    );
  }

  renderTable() {
    return Object.entries(this.state.field).map(([key, value], i) =>
      <div key={i + 1} className="field-cell" onClick={value.onClick}>{this.renderTableCell(value)}</div>
    )
  }

  renderTableCell(value) {
    if(value.value) {
      let player = players[value.value];
      return <ReactSVG className={player.className} src={player.fileName}/>;
    } else {
      return "";
    }
  }

  makeTableCellOnClick(key) {
    return () => {
      if (!this.state.field[key].value) {
        console.log(key);
        this.setState(reducer({
          type: "FILL_CELL",
          key: key,
          value: this.state.currentPlayer
        }));
        this.setState(reducer({
            type: "CHANGE_CURRENT_PLAYER",
            playerCode: this.nextPlayerCode()
        }))
      }
    }
  }

  nextPlayerCode() {
      return this.state.currentPlayer == players.firstPlayer ? players.secondPlayer : players.firstPlayer
  }
}

export default TicTacToy;
