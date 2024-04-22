import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router,Routes ,Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
            {/* <Route path="/"><News pageSize={6} country="in" category="general" /></Route>
            <Route path="/business"><News pageSize={6} country="in" category="business" /></Route>
            <Route path="/science"><News pageSize={6} country="in" category="science" /></Route>
            <Route path="/sports"><News pageSize={6} country="in" category="sports" /></Route>
            <Route path="/health"><News pageSize={6} country="in" category="health" /></Route>
            <Route path="/entertainment"><News pageSize={6} country="in" category="entertainment" /></Route>
            <Route path="/technology"><News pageSize={6} country="in" category="technology" /></Route>
         */}
            {/* <Route path="/" exact render={() => <News pageSize={6} country="in" category="general" />} />
          <Route path="/business" render={() => <News pageSize={6} country="in" category="business" />} />
          <Route path="/science" render={() => <News pageSize={6} country="in" category="science" />} />
          <Route path="/sports" render={() => <News pageSize={6} country="in" category="sports" />} />
          <Route path="/health" render={() => <News pageSize={6} country="in" category="health" />} />
          <Route path="/entertainment" render={() => <News pageSize={6} country="in" category="entertainment" />} />
          <Route path="/technology" render={() => <News pageSize={6} country="in" category="technology" />} /> */}
        
          <Routes>
            <Route path="/" element={<News  key="general" pageSize={6} country="in" category="general" />} />
            <Route path="/business" element={<News key="business" pageSize={6} country="in" category="business" />} />
            <Route path="/science" element={<News key="science" pageSize={6} country="in" category="science" />} />
            <Route path="/sports" element={<News key="sports" pageSize={6} country="in" category="sports" />} />
            <Route path="/health" element={<News key="health" pageSize={6} country="in" category="health" />} />
            <Route path="/entertainment" element={<News key="entertainment" pageSize={6} country="in" category="entertainment" />} />
            <Route path="/technology" element={<News key="technology" pageSize={6} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
