import React, { Component } from "react";
import Header from "./Header";

let i = 1;
let j = 100000;
let k = 99999999;
class Statement extends Component {
  render() {
    i = 1;
    console.log(this.props);
    return (
      <div>
        <Header heading="TRIPTI BANK STATEMENTS" history={this.props.history} />
        {this.props.location.response !== undefined &&this.props.location.response.statement !== undefined
          ? this.props.location.response.statement.map((statement) => {
              return (
                <div key={k++}>
                  <ol>
                    <li key={i} value={i++}>
                      <ul key={j++}>
                        <li key={j++}>Balance = {statement.balance}</li>
                        <li key={j++}>Credit = {statement.credit}</li>
                        <li key={j++}>Date={statement.date.toString()}</li>
                        <li key={j++}>Debit={statement.debit}</li>
                        <li key={j++}>
                          Reference Number = {statement.reference_number}/
                        </li>
                        <li key={j++}>Status = {statement.status}</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              );
            })
          : this.props.history.push({ pathname: "/" })}
      </div>
    );
  }
}
export default Statement;
