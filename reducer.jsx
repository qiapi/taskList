const reducer = (state = { isFetching:false,complete:false,event:'' } ,action) => {
	switch(action.type) {
		case 'gainData': return { isFetching:true,complete:false };
		case 'fetchComplete': return { isFetching:false,complete:true };
		case 'changeTaskState': return { event: action.event };
		default: return state;
	}
}

module.exports = reducer;