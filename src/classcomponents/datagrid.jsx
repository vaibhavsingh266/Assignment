import React, { Component } from 'react';
import Logic from './../models/logic';

class DataGridComponent extends Component {
    constructor(props) {
        super(props);
        this.logic = new Logic();
        this.state = { 
            student: {},
            students: [],
            rowcheckbox: [],
            maincheckbox: false,
            displayTable: 'table',
            deleteSelectedStudents: []
         }
    }

    handleRowClick=(d)=> {
        this.props.dataValues(d)  
    }

    checkRecordsIsEmpty(records) {
        if(records.length === 0)  {
            this.setState({displayTable: 'none'});
        }
    }

    deleteStudent(evt)  {
        let studs = this.logic.deleteStudent(parseInt(evt.target.value));        
        this.setState({students: studs});
        this.checkRecordsIsEmpty(studs);
    }



    deleteSelectedSt(evt)   {
        let indexes = this.state.deleteSelectedStudents;
        if(indexes.length == 0)
            return;
        console.log(indexes);
        let studs;
        for(var i in indexes)   {
            studs = this.logic.deleteStudent(parseInt(indexes[i]));
        }
        let checkboxValues=[];
        for(let i=0;i < studs.length;i++) {
            checkboxValues.push(false);
        }
        this.setState({rowcheckbox: checkboxValues});
        this.setState({students: studs});
        this.setState({deleteSelectedStudents: []});
        this.checkRecordsIsEmpty(studs);
        this.setState({maincheckbox: false});
    }

    mainCheckBox(evt) { 
        this.setState({maincheckbox: evt.target.checked});
        let indexes = this.state.deleteSelectedStudents;
        let checkBoxes = this.state.rowcheckbox;
        let listStudents = this.state.students;
        for(var i in checkBoxes) {
            if(checkBoxes[i] !== evt.target.checked)
                checkBoxes[i] = evt.target.checked;
            if(!indexes.includes(listStudents[i].StudentId.toString()) && evt.target.checked)
                indexes.push(listStudents[i].StudentId.toString());
        }
        if(!evt.target.checked)
            indexes = [];
        this.setState({rowcheckbox: checkBoxes});
        this.setState({deleteSelectedStudents: indexes});
    }

    handleCheckBox(evt) {
        let checkboxValue = this.state.rowcheckbox;
        let deleteList = this.state.deleteSelectedStudents;
        if(evt.target.checked === true) {
            deleteList.push(evt.target.value);
        }
        else    {
            deleteList.splice(deleteList.indexOf(evt.target.value),1);
        }
        
        this.setState({deleteSelectedStudents: deleteList});
        checkboxValue[parseInt(evt.target.id)] = evt.target.checked;        
        this.setState({rowcheckbox: checkboxValue});
    }

    getSortOrder(attr)  {
        return function(a,b) {
            if (a[attr] > b[attr]) {  
            return 1;  
        } else if (a[attr] < b[attr]) {  
            return -1;  
        }  
        return 0; 
    }
    }

    sortStudentsData(option, sortOption)    {
        let data = this.state.students;
        data.sort(this.getSortOrder([option]));
        if(sortOption === 'desc')
            data.reverse();
        this.setState({students: data});
    }

    handleSort(evt)    {
        if(evt.target.className === 'fa fa-arrow-up')
            this.sortStudentsData(evt.target.id, 'asc');
        if(evt.target.className === 'fa fa-arrow-down')
            this.sortStudentsData(evt.target.id, 'desc');
    }


    componentDidMount=() => {
        let studentsList = this.logic.getStudents();
        
        this.setState({students: studentsList});
        let checkboxValue = [];
        for(let i=0;i < studentsList.length;i++) {
            checkboxValue.push(false);
        }
        this.setState({rowcheckbox: checkboxValue});
        if(studentsList.length !== 0) {
            this.setState({displayTable: 'table'});
        }
    }

    componentDidUpdate=() => {
        if(this.props.studentData !== this.state.student)   {
            this.setState({student: this.props.studentData});
            console.log(this.props.studentData);
            
            if(Object.keys(this.props.studentData).length !== 0)    {
                let studs = this.logic.addStudent(this.props.studentData);
                this.setState({displayTable: 'table'});
                this.setState({students:  studs});
            }
        }
    }

    


    render() { 
        
        return (
        <table className="table table-bordered table-striped" style={{display: this.state.displayTable}}>
                    <thead>
                        <tr>
                            <th><div className="custom-control custom-checkbox"><button className="btn btn-primary" onClick={this.deleteSelectedSt.bind(this)}>Delete Selected</button><br/><input type="checkbox" onChange={this.mainCheckBox.bind(this)} checked={this.state.maincheckbox}/></div></th>
                            <th>StudentId <i className="fa fa-arrow-up"  id="StudentId" onClick={this.handleSort.bind(this)}></i><i className="fa fa-arrow-down" id="StudentId" onClick={this.handleSort.bind(this)}></i></th>
                            <th>StudentName<i className="fa fa-arrow-up" id="StudentName" onClick={this.handleSort.bind(this)}></i><i className="fa fa-arrow-down" id="StudentName" onClick={this.handleSort.bind(this)}></i></th>
                            <th>University <i className="fa fa-arrow-up" id="University" onClick={this.handleSort.bind(this)}></i><i className="fa fa-arrow-down" id="University" onClick={this.handleSort.bind(this)}></i></th>
                            <th>Course <i className="fa fa-arrow-up" id="Course" onClick={this.handleSort.bind(this)}></i><i className="fa fa-arrow-down" id="Course" onClick={this.handleSort.bind(this)}></i></th>
                            <th>Fees <i className="fa fa-arrow-up" id="Fees" onClick={this.handleSort.bind(this)}></i><i className="fa fa-arrow-down" id="Fees" onClick={this.handleSort.bind(this)}></i></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            this.state.students.map((s,i) => (
                                <tr key={i} onClick={() => this.handleRowClick(s)}>
                                    <td ><div className="custom-control custom-checkbox"><input type="checkbox" onChange={this.handleCheckBox.bind(this)}  id={i} checked={this.state.rowcheckbox[i]}  value={s.StudentId}/></div></td>
                                    <td>{s.StudentId}</td>
                                    <td>{s.StudentName}</td>
                                    <td>{s.University}</td>
                                    <td>{s.Course}</td>
                                    <td>{s.Fees}</td>
                                    <td><button className="btn btn-danger" value={s.StudentId} onClick={this.deleteStudent.bind(this)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
        </table>
        );
    }
}
 
export default DataGridComponent;






{/* <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th><div className="custom-control custom-checkbox"><button className="btn btn-primary" onClick={this.deleteSelectedSt.bind(this)}>Delete Selected</button><br/><input type="checkbox" onChange={this.change.bind(this)} name="selectAll"/></div></th>
                            <th>StudentId <i className="fa fa-arrow-up" id="StudentId" onClick={this.handleSort.bind(this)}></i><i className="fa fa-arrow-down" id="StudentId" onClick={this.handleSort.bind(this)}></i></th>
                            <th>StudentName<i className="fa fa-arrow-up" id="StudentName" onClick={this.handleSort.bind(this)}></i><i className="fa fa-arrow-down" id="StudentName" onClick={this.handleSort.bind(this)}></i></th>
                            <th>University <i className="fa fa-arrow-up" id="University" onClick={this.handleSort.bind(this)}></i><i className="fa fa-arrow-down" id="University" onClick={this.handleSort.bind(this)}></i></th>
                            <th>Course <i className="fa fa-arrow-up" id="Course" onClick={this.handleSort.bind(this)}></i><i className="fa fa-arrow-down" id="Course" onClick={this.handleSort.bind(this)}></i></th>
                            <th>Fees <i className="fa fa-arrow-up" id="Fees" onClick={this.handleSort.bind(this)}></i><i className="fa fa-arrow-down" id="Fees" onClick={this.handleSort.bind(this)}></i></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.students.map((s,i) => (
                                <tr key={i} onClick={() => this.rowClick(s)}>
                                    <td ><div className="custom-control custom-checkbox"><input type="checkbox"   value={s.StudentId} onClick={this.handleSelect.bind(this)} name="selectStudent"/></div></td>
                                    <td>{s.StudentId}</td>
                                    <td>{s.StudentName}</td>
                                    <td>{s.University}</td>
                                    <td>{s.Course}</td>
                                    <td>{s.Fees}</td>
                                    <td><button className="btn btn-danger" value={s.StudentId} onClick={this.deleteStudent.bind(this)}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table> */}