const UserData = require("../model/UserData");

const getAllUsers = async(req,res,next) => {

    let users;
    try{
        users = await UserData.find()
    }catch(err){
        return next(err) 
    }
    if (!users)
        return res.status(500).json({message:"Internal Server error"});


    return res.status(200).json({ users })    
};

const addUser = async(req, res, next) => {
  
    const {name, email, password} = req.body;
    if(!name && name.trim()==="" && !email && email.trim() && !password && password.length > 6){
        return res.status(422).json({message: "Invalid Data Entry"})
        }
    let user;

    try {
        user = new UserData({
            name,
            email,
            password
        });

        user = await user.save()
    } catch (err) {
        return next(err);
    }
    if(!user){
        return res.status(500).json({message: "Unable to save the user"})
    }
    return res.status(201).json({ user });
}

const updateUser = async(req, res, next) =>{

    const id = req.params.id;
    const {name, email, password} = req.body;
    if(!name && name.trim()==="" && !email && email.trim() && !password && password.length > 6){
        return res.status(422).json({message: "Invalid Data Entry"})
        }

    let user;
    
    try {
        user = await UserData.findByIdAndUpdate(id, {name, email, password})

    } catch (err) {
        return next(err)
    }
    if(!user){
        return res.status(500).json({message: "Unable to update the user"})
    }

    return res.status(200).json({message: "Updated Successfully"})
}

const deleteUser = async(req, res, next) => {

    const id = req.params.id;
    const {name, email, password} = req.body;
    
    let user;
    try {
        user = await UserData.findByIdAndRemove(id, {name, email, password})
    } catch (err) {
        return next(err)
    }
    if(!user){
        return res.status(500).json({message: "Unable to delete the user"})
    }

    return res.status(200).json({message: "Deleted Successfully"})
}

const getUserById = async(req, res, next) => {
    const id = req.params.id;

    let user;

    try {
        user = await UserData.findById(id)
    } catch (err) {
        return next(err)
    }
    if (!user)
        return res.status(500).json({message:"Internal Server error"});

    return res.status(200).json({ user })

}

exports.getAllUsers = getAllUsers;
exports.addUser = addUser
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;