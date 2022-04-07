import NET from './../../network';

const fetchData = async (
    dispatchMain, 
    setPreload = false, 
    method = 'POST', 
    url = `${NET.APP_URL}/fusers`
    ) => {
    
    
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
        
        dispatchMain({
            type: "FETCH_DATA",
            payload: result
        })
        if (setPreload) {
            setPreload(0)
        }
    } catch (e) {
        console.log(e)
    }
}
export default fetchData