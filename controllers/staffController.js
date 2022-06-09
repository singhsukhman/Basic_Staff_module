const {staffService } = require('../services/index')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


module.exports = {
    SignupStaff: async function (req, res, next) {
        try {
            var user = await staffService.find({ Email: req.body.Email })
            if(user.length>0){
                throw "Email Already Exit"
  
            }
        } catch (error) {
            return res.status(404).send(error)
        }
           
        bcrypt.hash(req.body.Password, 10).then(function (hash) {
            // console.log('req.body.Passwor---------------------------------d', req.body.Password) 

            var user = {
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Email: req.body.Email,
                Password: hash,
                Phone: req.body.Phone,
                Gender: req.body.Gender,
                DOB :req.body.DOB
            }
            // console.log('user--------------------------------------------------------------------', user)
            staffService.create(user, function (err, user) {
            //   console.log(user);
            
                if (err) {
                    res.status(404).json({
                        message: "User Can't Create",
                        error: err
                    })
                }
                res.status(201).json({
                    message: "User created successfully", user: user
                })
            })
        })
    },

    loginStaff: async (req, res, next) => {

        const User = await staffService.findOne({ Email: req.body.Email })
        // console.log('User-------------------------------------------------------', User)
        // console.log('Email', req.body.Email)
        if (!User) {
            res.status(404).json({
                message: "InValid Email"
            })
        }
        else {
            let validPass = await bcrypt.compare(req.body.Password, User.Password)
            if (validPass) {
                res.status(201).json({ message: "Login Succesfull", User: User })
            }
            if (!validPass) {
                res.status(404).json({
                    message: "InValid Password"
                })
            }

        }
    },
    staffData: (req, res, next) => {
        // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        //     // console.log('req.params.id', req.params.id)
        //     res.json({ message: "Invalid Staff ID" })
        // }
        staffService.getById({ Email: req.params.Email }, function (err, User) {

            if (err) {
                res.status(404).json({
                    error: err
                })
            }
            res.status(201).json({ message: " Staff data", User: User })
        })
    },

    // <<<<<<<<<<<<<<--------Delete One User --------------->>>>>>>>>>>>>>>>>>>
    // deletestaff: function (req, res, next) {
    //     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    //         res.json({ message: "Invalid Staff ID" })
    //     }
    //     staffService.deleteOne({ _id: req.params.id }, function (err, user) {
    //         // console.log(req.params.id);
    //         // console.log(user);  
    //         if (err) {
    //             res.status(404).json({
    //                 error: err
    //             })
    //         }
    //         res.status(201).json({
    //             message: "Staff deleted sucessfully", user: user
    //         })
    //     })
    // },

    deletestaff: function (req, res, next) {
        // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        //     res.json({ message: "Invalid Staff ID" })
        // }
        staffService.deleteOne({ Email: req.params.Email }, function (err, user) {
            // console.log('req.body.Email: ', req.params.Email);
            // console.log(req.params.id);
            // console.log(user);  
            if (err) {
                res.status(404).json({
                    error: err
                })
            }
            res.status(201).json({
                message: "Staff deleted sucessfully", user: user
            })
        })
    }


}