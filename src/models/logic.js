class Logic {
    constructor()   {
        this.students = [
            {StudentId: 101, StudentName: 'Mahesh', University: 'Pune', Course: 'IT', Fees: 10000},
            {StudentId: 102, StudentName: 'Tejas', University: 'Amravati', Course: 'MECH', Fees: 6000},
            {StudentId: 103, StudentName: 'Akash', University: 'Kolhapur', Course: 'CIVIL', Fees: 8000}
        ];
    }

    getStudents()   {
        return this.students;
    }

    addStudent(student)    {
        let update = false;
        for(var i in this.students) {
            if(this.students[i].StudentId === student.StudentId)    {
                this.students[i] = student;
                update = true
            }
        }
        if(update === false)
            this.students.push(student);
        console.log(this.students);
        
        return this.students;
    }


    updateStudent(id, name, value)   {
        this.students.map((d,i) => {
            if(d.StudentId === id)
                this.students[[name]] = value;
        });
        console.log(this.students);
        
        return this.students;
    }

    deleteStudent(id)   {
        let studentsList = this.students;
        for(var i in studentsList) {
            if(studentsList[i].StudentId === id)
                studentsList.splice(i, 1);
        }
        console.log(studentsList);
        this.students = studentsList;
        return this.students;
        
    }
}

export default Logic;