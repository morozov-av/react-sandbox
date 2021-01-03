import React from 'react';
import { ReactSVG } from 'react-svg';
import Dropdown from 'react-dropdown';
import * as _ from 'lodash';

import s from './styles/TicTacToy.module.scss';
import 'react-dropdown/style.css';

const classNames = require('classnames');

const options = [
  "Простой", "Средний", "Сложный", "Играть с другом"
];
const defaultOption = options[1];

const players = {
  o: {
    className: "circle",
    colorClassName: "svgColorLight",
    fileName: "TicTacToy/circle.svg"
  },
  x: {
    className: "cross",
    colorClassName: "svgColorDark",
    fileName: "TicTacToy/cross.svg"
  },
  firstPlayer: "o",
  secondPlayer: "x"
};

const reducer = (action) => (state, props) => {
  switch (action.type) {
    case "FILL_CELL": {
      const resultState = ( {...state}.field[action.key].value = action.value );
      return resultState;
    }
    case "FILL_CELL_AND_INITIALIZE_CURRENT_PLAYER": {
      let resultState = {...state};
      resultState.field[action.key].value = action.value;
      resultState.currentPlayer = action.currentPlayer;
      return resultState;
    }
    case "CHANGE_CURRENT_PLAYER": {
      return Object.assign({}, state, {
        currentPlayer: action.playerCode
      })
    }
    case "SET_WINNING_COMBINATION": {
      return Object.assign({}, state, {
        winning: {
          playerCode: action.playerCode,
          combinationName: action.combinationName
        }
      })
    }
    case "SET_STATE": {
      return action.state;
    }
    default:
      return state
  }
};




class TicTacToy extends React.Component {
  getInitialState() {
    return {
      currentPlayer: null,
      winning: {
        playerCode: null,
        combinationName: null
      },
      field: {
        "0_0": {value: null, onClick: this.makeTableCellOnClick("0_0")},
        "0_1": {value: null, onClick: this.makeTableCellOnClick("0_1")},
        "0_2": {value: null, onClick: this.makeTableCellOnClick("0_2")},
        "1_0": {value: null, onClick: this.makeTableCellOnClick("1_0")},
        "1_1": {value: null, onClick: this.makeTableCellOnClick("1_1")},
        "1_2": {value: null, onClick: this.makeTableCellOnClick("1_2")},
        "2_0": {value: null, onClick: this.makeTableCellOnClick("2_0")},
        "2_1": {value: null, onClick: this.makeTableCellOnClick("2_1")},
        "2_2": {value: null, onClick: this.makeTableCellOnClick("2_2")}
      }
    }
  }

  constructor(props) {
      super(props);

      this.state = this.getInitialState();
      this.onClickSetStateToInitial = this.onClickSetStateToInitial.bind(this);
  }

  render() {
    return(
      <div className={s.tictacContainer}>
        <div className={s.toolbarContainer}>
          <Dropdown className={s.levelSelector}
                    options={options}
                    onChange={this._onSelect}
                    value={defaultOption}
                    placeholder="Select an option" />
          <div className={s.choosePlayers}>
            <div className={ classNames(s.firstPlayer, s.activePlayer) }>First</div>
            <div className={ classNames(s.firstPlayer, s.activePlayer) }>Second</div>
          </div>
          <div className={s.currentPlayer}>
            Сейчас ходит
          </div>
        </div>
        <div className={s.fieldContainer}>
          <div className={s.fieldCentered}>
            { this.renderLattice() }
            { this.renderCrossOutWinCombination() }
            <div className={s.field}>
                { this.renderTable() }
            </div>
          </div>
        </div>
        <div className={s.restartButtonContainer}
             onClick={this.onClickSetStateToInitial}>
          <div className={s.restartText}>НАЧАТЬ ЗАНОВО</div>
        </div>
      </div>
    );
  }

  // ==================== RENDER ====================

  renderLattice() {
    return <ReactSVG className={s.lattice} src="TicTacToy/lattice.svg"/>;
  }

  renderTable() {
    return Object.entries(this.state.field).map(([key, value], i) => (
      <div key={ `tableCellKey_${i}` } className={s.fieldCell} onClick={value.onClick}>{this.renderTableCell(value)}</div>
    ))
  }

  renderTableCell(value) {
    if(value.value) {
      const player = players[value.value];
      return <ReactSVG className={ classNames(s[player.className], s[player.colorClassName]) }
                       src={player.fileName}/>;
    }
  }

  renderCrossOutWinCombination() {
    const combClassName = this.state.winning.combinationName;
    const currentPlayer = players[this.state.currentPlayer];
    if(combClassName && currentPlayer) {
      const colorClassName = currentPlayer.colorClassName;
      return <ReactSVG className={ classNames(s[combClassName], s[colorClassName]) }
                       src={`TicTacToy/${combClassName}.svg`} />
    }
  }

  // ==================== USER EVENTS ====================

  makeTableCellOnClick(key) {
    return () => {
      if (!this.state.field[key].value) {
        const currentPlayerIsInitialized = this.state.currentPlayer;
        const reducerAction = reducer(
          currentPlayerIsInitialized
            ? {
                type: "FILL_CELL",
                key: key,
                value: this.state.currentPlayer
              }
            : {
                type: "FILL_CELL_AND_INITIALIZE_CURRENT_PLAYER",
                key: key,
                value: this.getDefaultPlayerCode(),
                currentPlayer: this.getDefaultPlayerCode()
              }
        );
        this.setState(reducerAction, this.afterPlayerMove);
      }
    }
  }

  onClickSetStateToInitial() {
    this.setState(reducer({
      type: "SET_STATE",
      state: this.getInitialState()
    }))
  }

  // ==================== STATE MANAGMENT ====================

  changeCurrentPlayer(playerCode) {
    this.setState(reducer({
      type: "CHANGE_CURRENT_PLAYER",
      playerCode: playerCode
    }))
  }

  setWinningCombination(combinationName) {
    this.setState(reducer({
        type: "SET_WINNING_COMBINATION",
        playerCode: this.state.currentPlayer,
        combinationName: combinationName
    }))
  }

  // ==================== OTHER ====================

  nextPlayerCode() {
    const isFirstPlayer = this.state.currentPlayer === players.firstPlayer;
    return isFirstPlayer ? players.secondPlayer : players.firstPlayer
  }

  afterPlayerMove(){
    const playerCombination = this.getPlayerCells(this.state.currentPlayer);
    const emptyCellsCount = this.getEmptyCells().length;
    const combination = this.haveWinCombination(playerCombination);

    if (combination)
      this.setWinningCombination(combination)
    else if (emptyCellsCount === 0)
            alert("Всё, игра закончилась")
          else
            this.changeCurrentPlayer(this.nextPlayerCode());
  }

  getEmptyCells() {
    return this.getPlayerCells(null)
  }

  getDefaultPlayerCode() {
    return players.firstPlayer
  }

  getPlayerCells(playerCode) {
    return _.reduce( this.state.field , (result, value, key) => {
      (value.value === playerCode) && result.push(key);
      return result;
    }, []);
  }

  haveWinCombination(cells){
    const winCombinations = {
      horizontalFirst: ["0_0", "0_1", "0_2"],
      horizontalSecond: ["1_0", "1_1", "1_2"],
      horizontalThird: [ "2_0", "2_1", "2_2"],
      verticalFirst: ["0_0", "1_0", "2_0"],
      verticalSecond: ["0_1", "1_1", "2_1"],
      verticalThird: ["0_2", "1_2", "2_2"],
      fromTopLeftToRightBottom: ["0_0", "1_1", "2_2"],
      fromBottomLeftToRightTop: ["2_0", "1_1", "0_2"]
    };

    return _.findKey(winCombinations, (winComb, key) => {
              if(_.difference(winComb, cells).length === 0)
                return(key);
            });
  }
}

export default TicTacToy;
