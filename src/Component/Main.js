import {Switch , Route} from 'react-router-dom'
import Home from './Home'
import Bill from './Bill'
import Formcomponent from './Form'

function Main(){
    return (
        <Switch>
            <Route path='/Add' component={Formcomponent}/>
            <Route exact path='/' component={Home}/>
            <Route path='/:id' component={Bill} />
        </Switch>
    )
}

export default Main