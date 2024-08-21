import express from 'express'

import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    deleteUser,
    getUserById,
    updateUser} from '../controllers/userController.js'

const router=express.Router();

// router.get('/login' ,asyncHandler(async(req,res)=>{
//     const user=await User.find({});
//     res.json(user); 
// }))



router.route('/').post(registerUser).get(getAllUsers);
router.post('/logout',logoutUser);
router.post('/login',authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);

export default router;