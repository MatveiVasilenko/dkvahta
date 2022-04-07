import { act } from "react-dom/test-utils"

const ReducerUsers = (state, action) => {
	switch (action.type) {
		case "AUTH":
		return {
			...state,
			auth: action.payload
		}
		case "FETCH_DATA":
		return {
			...state,
			users: action.payload.fusers,
			eventfusers: action.payload.eventfusers,
			events: action.payload.events,
			companies: action.payload.companies
		}

		case "FETCH_COMPANIES":
		
		return {
			...state,
			companies: action.payload
		}
		case "FETCH_EVENTS":
		
		return {
			...state,
			eventsfusers: action.payload
		}
		default:
		return state
	}
}
export default ReducerUsers