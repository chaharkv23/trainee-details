import '../src/index.css';
import DataOperations from './components/DataOperations';
import {backend} from './components/BackendEmployee';
import {frontend} from './components/FrontendEmployee';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';


function App() {
  const [frontendEmployees, setFrontendEmployees] = useState([]);
  const [backendEmployees, setBackendEmployees] = useState([]);
  const [allocateEmployees, setAllocateEmployees] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("frontend"))
      localStorage.setItem("frontend", JSON.stringify(frontend));

    if (!localStorage.getItem("backend"))
      localStorage.setItem("backend", JSON.stringify(backend));
  }, []);

  useEffect(() => {
    var frontendMems = localStorage.getItem("frontend");
    setFrontendEmployees(JSON.parse(frontendMems));

    var backendMems = localStorage.getItem("backend");
    setBackendEmployees(JSON.parse(backendMems));
  }, []);

  useEffect(() => {
    var allocatedMems = localStorage.getItem("allocated");
    if (allocatedMems)
    setAllocateEmployees(JSON.parse(allocatedMems));
  }, []);

  const allocateFrontend = (sn) => {
    for (var i = 0; i < frontendEmployees.length; i++) {
      if (frontendEmployees[i].sn === sn) {
        frontendEmployees[i].allocation = true;
        setAllocateEmployees([...allocateEmployees, frontendEmployees[i]]);
        localStorage.setItem("allocated", JSON.stringify([...allocateEmployees, frontendEmployees[i]]));

        frontendEmployees.splice(i, 1);
        break;
      };
    }
    localStorage.setItem("frontend", JSON.stringify(frontendEmployees));
  };

  const allocateBackend = (sn) => {
    for (var i = 0; i < backendEmployees.length; i++) {
      if (backendEmployees[i].sn ===sn) {
        backendEmployees[i].allocation = true;
        setAllocateEmployees([...allocateEmployees, backendEmployees[i]]);
        localStorage.setItem("allocated", JSON.stringify([...allocateEmployees, backendEmployees[i]]));

        backendEmployees.splice(i, 1);
        break;
      };
    }
    localStorage.setItem("backend", JSON.stringify(backendEmployees));
  };

  function containsMember(sn, list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].sn === sn) {
        return true;
      }
    }

    return false;
  }

  const deallocateMember = (sn) => {
    for (var i = 0; i < allocateEmployees.length; i++) {
      if (allocateEmployees[i].sn === sn) {
        allocateEmployees[i].allocation = false;
        if (containsMember(sn, frontend)) {
          setFrontendEmployees([...frontendEmployees, allocateEmployees[i]]);
          localStorage.setItem("frontend", JSON.stringify([...frontendEmployees, allocateEmployees[i]]));
        } else {
          setBackendEmployees([...backendEmployees, allocateEmployees[i]]);
          localStorage.setItem("backend", JSON.stringify([...backendEmployees, allocateEmployees[i]]));
        }
        allocateEmployees.splice(i, 1);
        break;
      };
    }
    localStorage.setItem("allocated", JSON.stringify(allocateEmployees));
  };

  const updatedCommentList = (list, sn, comment) => {
    const newList = list.map((item) => {
      if (item.sn === sn) {
        const updatedItem = {
          ...item,
          comments: comment,
        };
        return updatedItem;
      }
      return item;
    });
    return newList;
  };

  const commentEditor = (sn, event) => {
    const value = event.target.value;
    if (containsMember(sn, frontendEmployees)) {
      const newList = updatedCommentList(frontendEmployees, sn, value);
      setFrontendEmployees(newList);
      localStorage.setItem("frontend", JSON.stringify(newList));
    } else if (containsMember(sn, backendEmployees)) {
      const newList = updatedCommentList(backendEmployees, sn, value);
      setBackendEmployees(newList);
      localStorage.setItem("backend", JSON.stringify(newList));
    } else {
      const newList = updatedCommentList(allocateEmployees, sn, value);
      setAllocateEmployees(newList);
      localStorage.setItem("allocated", JSON.stringify(newList));
    }
  };

  return (
    <div className="App">
      <Navbar/>
      <DataOperations
        title="FrontEnd"
        members={frontendEmployees}
        updateAllocation={allocateFrontend}
        updateComment={commentEditor}
      />
      <br />
      <DataOperations
        title="BackEnd"
        members={backendEmployees}
        updateAllocation={allocateBackend}
        updateComment={commentEditor}
      />
      <br />
      <DataOperations
        title="Project Allocation"
        members={allocateEmployees}
        updateAllocation={deallocateMember}
        updateComment={commentEditor}
      />
      <br />
    </div>
  );
}

export default App;