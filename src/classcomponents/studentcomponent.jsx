import React, {Component} from 'react';
import Logic from './../models/logic';
import {Universities, Courses} from './../models/constants';
import SelectComponent from './selectcomponent';
import ValidationComponent from './validationcomponent';
import DataGridComponent from './datagrid';

class StudentComponent extends Component    {
    constructor(props) {
        super(props);
        this.logic = new Logic();
        this.state = {
            StudentId: 0,
            StudentName: '',
            University: 'Amravati',
            Course: 'IT',
            Fees: 0,
            universities: Universities,
            courses: Courses,
            student: {},
            selectedInputName: '',
            setValidityId: true,
            setValidityName: true
        };
    }

    handleInputs= (evt) => {        
        this.setState({[evt.target.name]: evt.target.value});
        this.setState({selectedInputName: evt.target.name})
    }



    handleClear = (evt) => {
        this.setState({StudentId: 0});
        this.setState({StudentName: ''});
        this.setState({University: 'Amravati'});
        this.setState({Course: 'IT'});
        this.setState({Fees: 0});
    };

    handleSave = (evt) => {
        if(this.state.StudentId === 0 || this.state.StudentName === '' || this.state.Fees === 0)  {
            alert('Fill the required fields');
            return;
        }
        let student = {
            StudentId: this.state.StudentId,
            StudentName: this.state.StudentName,
            University: this.state.University,
            Course: this.state.Course,
            Fees: this.state.Fees
        };
        
        this.setState({student: student});
        this.handleClear();
    }

    componentDidMount=() => {
        let studs = this.logic.getStudents();
        this.setState({'students': studs});
    }

    getSelectedUniversity(val) {
        console.log(`Vaule Received from SelectComponent ${val}`);
        this.setState({University: val})
    }
    getSelectedCourse(val) {
        console.log(`Vaule Received from SelectComponent ${val}`);
        this.setState({Course: val})
    }


    setValidityId(value) {
        if(this.state.setValidityId !== value)
            this.setState({setValidityId: value});
    }

    setValidityName(value) {
        if(this.state.setValidityName !== value)
            this.setState({setValidityName: value});
    }



    handleTableData(evt)    {
        this.logic.updateStudent(parseInt(evt.target.id), evt.target.name, evt.target.textContent);
    }

    setStudents(student)  {
         this.setState({StudentId: student.StudentId});
         this.setState({StudentName: student.StudentName});
         this.setState({University: student.University});
         this.setState({Course: student.Course});
         this.setState({Fees: student.Fees});
    }

    render()    {
        return (
            <div className="container">
                <div className="form-group">
                    <label>Student Id</label><br/>
                    <input type="text" value={this.state.StudentId} name="StudentId" onChange={this.handleInputs.bind(this)} className="form-control-lg"  required/>
                    <font style={{color:"red"}}>  *</font>
                    <ValidationComponent name="StudentId" data={this.state.StudentId} ></ValidationComponent> 
                </div>
                <div className="form-group">
                    <label>Student Name</label><br/>
                    <input type="text"  value={this.state.StudentName} name="StudentName" onChange={this.handleInputs.bind(this)} className="form-control-lg" required/>
                    <font style={{color:"red"}}>  *</font>
                    <ValidationComponent name="StudentName" data={this.state.StudentName} setValidity={this.setValidityName.bind(this)}></ValidationComponent> 
                </div>
                <div className="form-group">
                    <label>University</label><br/>
                    <SelectComponent name="University" data={this.state.University} selectedValue={this.getSelectedUniversity.bind(this)} dataSource={this.state.universities}></SelectComponent>                </div>
                <div className="form-group">
                    <label>Courses</label><br/>
                    <SelectComponent name="Course" data={this.state.Course} selectedValue={this.getSelectedCourse.bind(this)} dataSource={this.state.courses}></SelectComponent>
                </div>
                <div className="form-group">
                    <label>Fees</label><br/>
                    <input type="text" value={this.state.Fees} name="Fees" onChange={this.handleInputs.bind(this)} className="form-control-lg" />
                    <font style={{color:"red"}}>  *</font>
                    <ValidationComponent name="Fees" data={this.state.Fees}></ValidationComponent> 
                </div>
                <div className="form-group">
                    <input type="button" value="New" onClick={this.handleClear.bind(this)} className="btn btn-warning" />
                    <input type="button" value="Save" onClick={this.handleSave.bind(this)} className="btn btn-success" />
                </div>

                
                <DataGridComponent studentData={this.state.student} dataValues={this.setStudents.bind(this)}></DataGridComponent>
            </div>
        );
    }
    
}

export default StudentComponent;