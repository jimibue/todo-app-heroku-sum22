import React from "react";
import axios from "axios";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Input,
  List,
  Segment,
} from "semantic-ui-react";

export default class TodoList extends React.Component {
  state = {
    name: "",
    todos: [],
  };

  componentDidMount = async () => {
    console.log("here");
    try {
      let res = await axios.get("/api/todos");
      console.log(res);
      this.setState({
        todos: res.data,
      });
    } catch (err) {
      alert("err");
      console.log(err);
    }
  };

  handleSubmit = async (e) => {
      // add to db
    let res = await axios.post('/api/todos', {name:this.state.name})
      // add to UI
    let newTodos = [
      res.data,
      ...this.state.todos,
    ];
    this.setState({
      todos: newTodos,
      name: "",
    });
  };

  toggleTodo = async (id) => {
    // update to db
    let res = await axios.put(`/api/todos/${id}`)
    // update ui
    let newTodos = this.state.todos.map((t) => {
      return t.id !== id ? t : res.data;
    });
    this.setState({ todos: newTodos });
  };

  render() {
    return (
      <Container>
        <Segment>
          <Header as="h1">TodoList Yo!!!</Header>
          <p>Card import added</p>
          <Form onSubmit={this.handleSubmit}>
            <Input
              label="Todo name:"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
            <Divider />
            <Button type="submit" color="blue">
              Add
            </Button>
          </Form>
          <Divider />
          <List>
            {this.state.todos.map((t) => (
              <List.Item
                style={{ textDecoration: t.complete ? "line-through" : "" }}
                onClick={() => this.toggleTodo(t.id)}
                key={t.id}
              >
                {t.name}
              </List.Item>
            ))}
          </List>
        </Segment>
      </Container>
    );
  }
}
