// LS is Local Storage

export const resetLSBlotterForm = () => {
	return localStorage.setItem("blotter_form", JSON.stringify(
		{
			reporters: [],
			victims: [],
			suspects: [],
			respondents: []
		}))
}

export const setInitialBlotterData = (data) => {
	var blotterLocalStorage = JSON.parse(localStorage.getItem("blotter_form"))
	blotterLocalStorage = data
	return localStorage.setItem("blotter_form", JSON.stringify(blotterLocalStorage))
}

export const setLSBlotterForm = (data, name) => {
	var blotterLocalStorage = JSON.parse(localStorage.getItem("blotter_form"))
	blotterLocalStorage[name] = data
	return localStorage.setItem("blotter_form", JSON.stringify(blotterLocalStorage))
}

export const getLSBlotterForm = () => {
	return JSON.parse(localStorage.getItem("blotter_form"))
}


