var ReactDOM = require('react-dom');
var React = require('react');
var store = require('./store');

var taskList=[];
var response=[];
var itemNumber;
var isChange = false;
function fetch(filename) {
	return new Promise((resolve,reject)=>{
		$.getJSON(filename,(data) => {
			resolve(data);
			console.log(data);
		});
	})
}
const fetchPosts = () => (dispatch,getState) => {
	dispatch({type:'gainData'});
	return fetch('taskdata.json').then((data)=> {
		response = data;
		console.log(response);
		dispatch({type:'fetchComplete'});
	});
}
class TaskBox extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.statusChange = this.statusChange.bind(this);
	}
	handleClick() {
		store.dispatch(fetchPosts());
		$("table").addClass("taskTable");
	}
	statusChange() {
		isChange = true;
		store.dispatch({type:'changeTaskState',event:itemNumber});
		console.log(itemNumber);
	}
	render() {
		const isFetching = this.props.value.isFetching;
		const complete = this.props.value.complete;
		if(!isFetching && complete) {
			taskList = response;
		}
		return(
			<div>
				<h2>任务清单</h2>
				<TaskTable tableTaskList={taskList} click={this.statusChange}/>
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
		var clickChange = this.props.click;
		var tasksItem =[];
		if(isChange) {
			tasks=tasks.map(function(element,index) {
				if(element.event===itemNumber) {
					element.isDone= !element.isDone;
				}
				return element;
			});
			isChange = false;
		}
		tasks.sort(function(element1,element2) {
			if(!element1.isDone && element2.isDone) {
				return -1
			}
			else return 1;
		});
		tasksItem = tasks.map(function(element,index) {
			return <TaskItem time={element.time} event={element.event} isDone={element.isDone} key={index} click={clickChange}/>
		});
		return(
			<table><tbody>{tasksItem}</tbody></table>
		);
	}
}

class TaskItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		itemNumber = this.props.event;
		this.props.click();
	}
	render() {
		var time = this.props.time;
		var event = this.props.event;
		var isDone = this.props.isDone?"完成":"未完成";
		return(
			<tr>
				<td>{time}</td>
				<td>{event}</td>
				<td><button onClick={this.handleClick} className="changeTaskStateBtn">{isDone}</button></td>
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
			<button onClick={this.handleClick} className="gainTaskBtn">获取任务清单</button>
		);
	}
}

module.exports = TaskBox;