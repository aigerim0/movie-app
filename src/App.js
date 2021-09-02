import Movies from "./Movies";
import {BrowserRouter, Route} from "react-router-dom";
import MoviesDetails from "./MoviesDetails";


function App() {
    return (


        <BrowserRouter>
            <div className={'container'}>
                <Route exact path='/'><Movies/></Route>
                <Route path='/movie/:id'><MoviesDetails/></Route>
            </div>
        </BrowserRouter>


    );
}

export default App;
