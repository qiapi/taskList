import React from 'react';
import ReactDOM from 'react-dom';

class TaskBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			taskList:[]
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		var TASKLIST=[];
		console.log(TASKLIST);
		var that = this;
		$.getJSON("taskdata.json",function(data) {
			TASKLIST = data;
			console.log(data);
			that.setState({
				taskList: TASKLIST
			});
		});
	}
	render() {
		return(
			<div>
				<h2>任务清单</h2>
				<TaskTable tableTaskList={this.state.taskList}/>
				<TaskBtn onClick={this.handleClick}/>
			</div>
		);
	}
}

class TaskTable extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var tasks = this.props.tableTaskList;
		var tasksItem =[];
		tasksItem = tasks.map(function(element,index) {
			return <TaskItem time={element.time} event={element.event} isDone={element.isDone} key={index}/>
		});
		return(
			<table className="taskTable"><tbody>{tasksItem}</tbody></table>
		);
	}
}

class TaskItem extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var time = this.props.time;
		var event = this.props.event;
		var isDone = this.props.isDone?"完成":"未完成";
		return(
			<tr>
				<td>{time}</td>
				<td>{event}</td>
				<td><button>{isDone}</button></td>
			</tr>
		);
	}
}

class TaskBtn extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.props.onClick();
	}
	render() {
		return(
			<button onClick={this.handleClick}>获取任务清单</button>
		);
	}
}
ReactDOM.render(
	<TaskBox/>,
	document.getElementById("root")
);