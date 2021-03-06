const Course = require('../models/Course')

exports.updateCourseProcess = (req, res) => {
    // const {name, description, photo, duration } = req.body
    const myBodyData = {
        name : req.body.name,
        description : req.body.description,
        photo: req.body.photo,
        duration : req.body.duration
    }
    //const entry = req.params.id
    //find and delete the course
    Course.findOneAndUpdate({_id: req.params.id}, myBodyData, function(err, course){
        if(err)
            return next(err)
        res.redirect('/courses/listCourses/'+ req.params.n)
        console.log('entry',req.params.id,myBodyData)
    })
    
    
}



exports.createCourseProcess = (req, res) => {
    const { name, description, photo, duration } = req.body
    
    const course = new Course()
    course.name = name
    course.description = description
    course.photo = photo
    course.duration = Number(duration)
    
    course.save()
        .then(() => res.redirect('/courses/listCourses/'+req.params.n))
        .catch(err => res.status(400).json(err))
}

exports.createCourse = (req, res) => {
    const data = {
        title: 'LMS | Add Course',
        errors: req.session.errors
    }
    const user = {
        name: req.params.n
    }
    
    req.session.errors = {}
    
    res.render('createCourse', {user:user,title: 'LMS | Add Course', errors: req.session.errors})
}

exports.listCourses = (req, res) => {
    Course.find()
        .then(courses => {
            const data = {
                title: 'LMS | List of Courses',
                courses
            }
            
            res.render('listCourses', data)
        })
        .catch(err => {
            res.json(err)
        })
}

exports.studentCourses = (req, res) => {
    Course.find()
        .then(courses => {
            const data = {
                title: 'LMS | List of Courses',
                courses
            }
            const user ={
                name:req.params.n
            } 
            res.render('studentCourses', { title: 'LMS | List of Courses',user:user,courses:courses})
        })
        .catch(err => {
            res.json(err)
        })
}

exports.updateCourse = (req, res) => {
    //const cid = req.params.id
    //console.log(name)
    // const id2 = mongoose.Types.ObjectId(id)
    Course.findOne({_id: req.params.id})
    .then(matchedCourse => {
        const data = {
            title: 'LMS | Course to edit',
            matchedCourse
        }
        const user = {
            name: req.params.n
        }
        console.log("///////////////////////////////////////////////////")
        console.log(matchedCourse)
        res.render('updateCourse', {user:user,title: 'LMS | Course to edit',matchedCourse:matchedCourse})
    })
    .catch(err => {
        res.json(err)
        console.log('error fetching data')
        console.log(Object(name))
    })

    
    // const tgt = req.params.id
    // Course.findOneAndDelete({name: tgt})
    
}

// exports.updateCourse = (req, res) => {
//     const id = req.params.id
//     console.log(id)
//     Course.findOne({name: id})
//         .then(matchedCourse => {
//             const data = {
//                 title: 'LMS | Edit Course',
//                 course: matchedCourse
//             }
//             console.log(data)
//             res.render('updateCourse',data)
//         })
        
        
// }

exports.deleteCourse = (req, res) => {
    //const name = req.params.id
    Course.findOneAndDelete({_id: req.params.id})
        .then(() => res.redirect('/courses/listCourses/'+req.params.n))
}

exports.courseDetails = (req, res) => {
    // const id2 = mongoose.Types.ObjectId(id)
    Course.findOne({_id: req.params.id})
    .then(selectedCourse => {
        const data = {
            title: 'LMS | Course to edit',
            selectedCourse
        }
        const user ={
            name:req.params.n
        }
        console.log("////////////////////////course Details///////////////////////////")
        console.log(selectedCourse)
        res.render('courseDetails', {user:user,title: 'LMS | Course to edit',selectedCourse:selectedCourse})
    })
    .catch(err => {
        res.json(err)
        console.log('error fetching data')
        console.log(Object(name))
    })
}