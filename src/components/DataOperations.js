import React from 'react';
import './BackendEmployee';
import './FrontendEmployee';
import '../index.css';
import './style.css';

const DataOperations = (props) => {
    return (
        <>
            <h3 className='heading'>{props.title}</h3>
            <table className='scrollabletbody'>
                <thead>
                    <tr>
                        <th >Emp. ID</th>
                        <th >Name</th>
                        <th>Project Allocation</th>
                        <th >Skills</th>
                        <th >Comments</th>

                    </tr>
                </thead>
                <tbody className='scrollabletbody'>
                    {props.members?.map((item, key) => {
                        return (
                            <tr key={item.sn}>
                                <td >{key + 1}</td>
                                <td >{item.name}</td>
                                <td >
                                    <button className='btnpro'
                                        onClick={() => props.updateAllocation(item.sn)}
                                        style={{ backgroundColor: item.allocation ? "skyblue" : "yellow", width: "150px" }}
                                    >
                                        {item.allocation ? "assigned" : "assign here"}
                                    </button>
                                </td>
                                <td ><button class='btn' onClick={()=>alert(item.skills)}>View Skills</button></td>
                                <td >
                                    <input
                                        type="text"
                                        value={item.comments}
                                        onChange={(e) => props.updateComment(item.sn, e)}
                                        style={{ width: "160px" }}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
export default DataOperations;