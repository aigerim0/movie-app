import Movies from "./Movies";
import {BrowserRouter, Route} from "react-router-dom";
import MoviesDetails from "./MoviesDetails";
import AllActors from "./AllActors";
import ActorInfo from "./ActorInfo/ActorInfo";
import Search from "./Search/Search";
import Header from "./Header";
import Footer from "./Footer";


function App() {
    return (


        <BrowserRouter>
            <Header/>
            <div className='container my-5'>
                <Route exact path='/'><Movies/></Route>
                <Route path='/movie/:id'><MoviesDetails/></Route>
                <Route path='/actors/:id'><AllActors/></Route>
                <Route path='/person/:id'><ActorInfo/></Route>
                <Route path='/search/multi/:name'><Search/></Route>
            </div>
            <Footer/>
        </BrowserRouter>


    );
}

export default App;
