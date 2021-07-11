import './App.css';
import { useState } from 'react';

function App() {

  var [Usels, setUsels] = useState([])
  var [Svyaz, setSvyaz] = useState([])
  var [StartPoint, setStartPoint] = useState(false)
  var [EndPoint, setEndPoint] = useState(false)


  var [NewUsezValue, setNewUsez] = useState("")
  var [NewUselRangeValue, setNewUselRange] = useState("")

  var onNewUsezValue = () => {
    setNewUsez(document.getElementById("NewUsez").value)
  }

  var onNewUselRangeValue = () => {
    setNewUselRange(document.getElementById('NewUselRange').value)
  }

  



  


  var SetNewUsel = () => {
    Usels.push({
      StartPoint: StartPoint == true ? 1 : 0,
      EndPoint: EndPoint == true ? 1 : 0,
      UselName: document.getElementById("NewUsez").value,
      UselRangeToCon: document.getElementById('NewUselRange').value
    })

    setNewUsez("")
    setNewUselRange("")
  }

  var CheckChange = (e) => {
    if (e.target.getAttribute('id') == 'NewUselStartCheck') {
      setStartPoint(!StartPoint)
    }
    else {
      setEndPoint(!EndPoint)
    }
  }

  var NewSvyaz = () => {
    var NewSvyaz = []
    for (let i = 0; i < Usels.length; i++) {
      for (let j = i + 1; j < Usels.length; j++) {
        NewSvyaz.push({
          From: Usels[i].UselName,
          To: Usels[j].UselName,
          Range: 0,
          H: 0
        })
      }
    }
    setSvyaz(NewSvyaz)
  }

  var SetNewRange = (e) => {
    var Id = e.target.getAttribute("id").split("/")
    var from = Id[1]
    var to = Id[2]
    var New = Svyaz
    for (let i = 0; i < Svyaz.length; i++) {
      if (New[i].From == from && New[i].To == to) {
        New[i].Range = document.getElementById(e.target.getAttribute("id")).value
        for (let j = 0; j < Usels.length; j++) {
          if (Usels[j].UselName == to) {
            New[i].H = parseInt(document.getElementById(e.target.getAttribute("id")).value) + parseInt(Usels[j].UselRangeToCon)
          }
        }
      }
    }
    setSvyaz(New)
  }

  var [PathToEnd, setPathToEnd] = useState([])

  var setPath = () => {
    var NewNewNew = []
    for (let i = 0; i < Svyaz.length; i++) {
      if (Svyaz[i].Range > 0) {
        NewNewNew.push(Svyaz[i])
      }
    }
    setSvyaz(NewNewNew)
    for (let i = 0; i < Usels.length; i++) {
      if (Usels[i].StartPoint == 1) {
        var Start = Usels[i].UselName
      }
      if (Usels[i].EndPoint == 1) {
        var End = Usels[i].UselName
      }
    }

    var NewNew = Svyaz
    var Path = []
    var EndIs = true
    var PathCo = 0


    while (Svyaz.length != PathCo) {
      for (let i = 0; i < NewNew.length; i++) {
        if (NewNew[i].From == Start && NewNew[i].Range > 0) {
          var PathPart = []
          for (let j = 0; j < Usels.length; j++) {
            if (Usels[j].UselName == NewNew[i].To) {
              var Uselco = Usels[j].UselRangeToCon
            }
          }
          var Range = 0
          for (let d = 0; d < Path.length; d++) {
            if (Path[d][1] == Start) {
              Range = parseInt(Path[d][2]) + parseInt(NewNew[i].Range)
            }
          }
          PathPart.push(Start, NewNew[i].To, Range > 0 ? Range : NewNew[i].Range, Uselco ? Uselco : 0, parseInt(Range > 0 ? Range : NewNew[i].Range) + parseInt(Uselco ? Uselco : 0))
          Path.push(PathPart)
        }
      }
        debugger
        Start = Path[PathCo][1]
        PathCo++
    }

    var pathpath = []

    var pathNode = ""
    for (let i = 0; i < Usels.length; i++) {
      if (Usels[i].StartPoint == 1) {
        var Start = Usels[i].UselName
      }
      if (Usels[i].EndPoint == 1) {
        var End = Usels[i].UselName
      }
    }
    while (pathNode != Start) {
      var min = 100000
      for (let i = 0; i < Path.length; i++) {
        if (Path[i][1] == End) {
          if (min > Path[i][4]) {
            pathNode = Path[i][0]
            min = Path[i][4]
          }
        }
      }
      var ma = {
        Point: End,
        Size: min
      }
      pathpath.push(ma)
      End = pathNode
    }
    pathpath.push({
      Point: Start,
      Size: 0
    })
    var NewPathPath = []
    debugger
    for (let i = pathpath.length - 1; i > -1; i--) {
      NewPathPath.push(pathpath[i])
    }
    setPathToEnd(NewPathPath)
  }

  
  return (
    <div className="App">
      <div className="Header">Алгоритм A Star</div>
      <div className="Znach">
        <div>
          <div>Введите узел</div>
          <div>Начальная точка<input type="checkbox" id="NewUselStartCheck" onChange={CheckChange}></input></div>
          <div>Конечная точка<input type="checkbox" id="NewUselEndCheck" onChange={CheckChange}></input></div>
          <input id="NewUsez" value={NewUsezValue} onChange={onNewUsezValue} placeholder="Введите название узла"></input>
          <input id="NewUselRange" value={NewUselRangeValue} onChange={onNewUselRangeValue} placeholder="Введите расстояние до конечной точки"></input>
          <button onClick={SetNewUsel}>Создать</button>
        </div>
      </div>
      <div>
        {Usels.map(u =>
          <div className="Usels">
            <div className="Va">{u.UselName}</div>
            <div className="Va"> {u.UselRangeToCon}</div>
            <div className="Va">{u.StartPoint ? "Начальная точка" : ""}</div>
            <div className="Va">{u.EndPoint ? "Конечная точка" : ""}</div>
          </div>)}
      </div>
      <div>
        <button onClick={NewSvyaz}>Создать связи</button>
        {Svyaz.map(u =>
          <div>
            <div className="Va">{u.From} -></div>
            <input id={`NewSvyaz/${u.From}/${u.To}`} onChange={SetNewRange} placeholder={u.Range}></input>
            <div className="Va">->{u.To}</div>
          </div>)}
      </div>
      <button onClick={setPath}>Вычислить маршрут</button>

      <div className="PathContainer">
        <div className="Header">Ответ</div>
        {PathToEnd.map(u =>
          <div className="Path">
            <div className="Va1">->{u.Point}</div>
            <div className="Va1">[{u.Size}]</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
