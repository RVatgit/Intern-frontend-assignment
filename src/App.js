import {store} from './redux/store'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import Main from './Component/Main'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
