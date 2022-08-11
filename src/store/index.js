class Store {
	constructor() {
		const state = JSON.parse(localStorage.getItem("state"));
		this.state = state ? state : {days: {}};
		this.listeners = [];
	}

	setState(newState) {
		this.state = newState;
		localStorage.setItem("state", JSON.stringify(this.state));
		// Оповещаем всех подписчиков об изменении стейта
		for (const listener of this.listeners) {
			listener();
		}
	}

	subscribe(callback) {
		this.listeners.push(callback);
		// Возвращаем функцию для удаления слушателя
		return () => {
			this.listeners = this.listeners.filter(item => item !== callback);
		};
	}

	addEvent(day, time, event) {
		const events = this.state.days[day.toLocaleDateString()] ? this.state.days : {[day.toLocaleDateString()]: {}};
		events[day.toLocaleDateString()][time.toString()] = event;
		this.setState({...this.state, days: {...this.state.days, ...events}});
	}

	getEvents(day) {
		return this.state.days[day.toLocaleDateString()];
	}

	deleteEvent(day, time) {
		//Иммутабельность
		const newEvents = {};
		Object.assign(newEvents, this.state.days[day.toLocaleDateString()]);
		delete newEvents[time];
		this.setState({...this.state, days: {...this.state.days, [day.toLocaleDateString()]: newEvents}});
	}
}


export default Store;
