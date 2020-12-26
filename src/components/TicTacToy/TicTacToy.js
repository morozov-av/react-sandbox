import React from 'react';
import './styles/TicTacToy.scss';
import { ReactSVG } from 'react-svg'

class TicTacToy extends React.Component {
  render() {
    return(
      <div className="tictac-container">
        <ReactSVG className="lattice" src="lattice.svg"/>
        <table>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>4</td>
              <td>5</td>
              <td>6</td>
            </tr>
            <tr>
              <td>7</td>
              <td>8</td>
              <td>9</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TicTacToy;
