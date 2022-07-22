import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <div>
                <h3>What to learn</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={true}/><span>HTML</span></li>
                    <li><input type="checkbox" checked={false}/><span>React</span></li>
                    <li><input type="checkbox" checked={true}/><span>CSS</span></li>
                    <li><input type="checkbox" checked={false}/><span>JS</span></li>
                </ul>
                <div>
                    <button>ALL</button>
                    <button>Complited</button>
                    <button>Undone</button>
                </div>
            </div>
        </div>
    );
}

export default App;
