import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'


const reducer = (state=[],action)=>{
    if(action.type==='REMOVE'){
        const newstate=[...state].filter(st=>st.id !== action.payload)
        return newstate
    }
    else if(action.type==='UPDATE'){
        const newstate=[...state].map(st=> st.id !== action.payload.id ? st:action.payload)
        return newstate
    }
    else if(action.type==='ADD'){
        const newstate=[...state].concat(action.payload)
        return newstate
    }
    else if(action.type==='FETCH'){
        return action.payload
    }
    return state;
}

export const store = createStore(reducer, applyMiddleware(thunk));


