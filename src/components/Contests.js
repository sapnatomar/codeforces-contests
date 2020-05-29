import React, { Component } from "react";
import axios from "axios";

import "antd/dist/antd.css";
import { List, Button } from "antd";

const contestURL = "https://codeforces.com/contest/";

const data = [
  {
    title: "Codeforces Beta Round",
    type: "Codeforces Beta Round",
    div: "",
    key: "1",
  },
  {
    title: "Codeforces Round (Div. 1)",
    type: "Codeforces Round",
    div: "(Div. 1)",
    key: "2",
  },
  {
    title: "Codeforces Round (Div. 2)",
    type: "Codeforces Round",
    div: "(Div. 2)",
    key: "3",
  },
  {
    title: "Educational Codeforces Round",
    type: "Educational Codeforces Round",
    div: "",
    key: "4",
  },
  {
    title: "Codeforces Round (Div. 3)",
    type: "Codeforces Round",
    div: "(Div. 3)",
    key: "5",
  },
  {
    title: "Codeforces Round (Div. 4)",
    type: "Codeforces Round",
    div: "(Div. 4)",
    key: "6",
  },
];

export default class Contests extends Component {
  state = {
    user: "",
    contestTypeSelected: "",
    contests: [],
    showMenu: true,
    pageSize: 15,
  };

  handleChange = (e) => {
    const { type, div } = e.target.dataset;
    this.setState({ showMenu: false, contestTypeSelected: type + " " + div });

    axios
      .get("https://codeforces.com/api/contest.list")
      .then((res) => {
        const data = [];
        res.data.result.map((item) =>
          item.name.includes(`${type}`) &&
          item.name.includes(`${div}`) &&
          item.phase !== "BEFORE" &&
          item.phase !== "CODING"
            ? data.push({
                id: item.id,
                title: item.name,
                url: contestURL + item.id,
                // difficulty: item.difficulty ? item.difficulty : "NA",
              })
            : ""
        );

        this.setState({
          contests: [...this.state.contests, ...data],
        });
      })
      .catch((err) => console.log(err));
  };

  reset = () => {
    this.setState({ contests: [], showMenu: true });
  };

  verify = (e) => {};

  render() {
    const { contests, showMenu, contestTypeSelected } = this.state;
    const contestItems = contests.length;

    const menuList = (
      <div>
        <h1 style={{ fontStyle: "italic", marginBottom: "2em" }}>
          CODEFORCES CONTESTS
        </h1>
        {/* <p style={{ marginBottom: "4em" }}>
          Welcome, <b>Sapna</b>!
        </p> */}

        <List
          className="contests-menu"
          header={<div>Codeforces Contests</div>}
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <button
                className="contest-type-button"
                data-type={item["type"]}
                data-div={item["div"]}
                onClick={this.handleChange}
              >
                {item["title"]}
              </button>
              {/* <div>{item["count"]}</div> */}
            </List.Item>
          )}
        />
      </div>
    );

    const contestsList = (
      <div>
        <div className="button-container">
          <Button type="ghost" onClick={this.reset}>
            Go back
          </Button>
        </div>

        <List
          className="contests-list"
          header={<div>{contestTypeSelected}</div>}
          bordered
          loading={
            contestItems === 0
              ? "<Space size='middle'><Spin size='large' /></Space>"
              : false
          }
          pagination={
            contestItems > 20
              ? {
                  onChange: (page) => {
                    console.log(page);
                  },
                  size: "small",
                  pageSize: Math.min(contestItems, 15),
                  position: "bottom",
                }
              : false
          }
          dataSource={contests}
          renderItem={(item) => (
            <List.Item>
              <a href={item["url"]} target="_blank" rel="noopener noreferrer">
                {item["title"]}
              </a>
              {/* <div>difficulty: {item["difficulty"]}</div> */}
            </List.Item>
          )}
        />
      </div>
    );

    return <div>{showMenu ? menuList : contestsList}</div>;
  }
}
