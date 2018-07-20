module.exports={
    editApt: async(req,res)=>{
        try{
            const db=req.app.get('db')
            const {date}=req.body
            let apt = await db.edit_apt([+req.params.id,date])
            return res.status(200).send(apt)
        }catch(err){
            console.log(err)
        }
    },
    createAppointment: async(req,res)=>{
        try{
            const db = req.app.get('db')
            const {date}=req.body
            let apt = await db.check_appointment([date])
            console.log(date)
            if(apt[0]){
                return res.status(200).send('T')
            }else{
                let aptchecked = await db.create_appointment([date, +req.session.user.id])
                return res.status(200).send(aptchecked)}
        }catch(err){
            console.log(err)
        }
    },
    getUserById: async (req,res) => {
        try {
            const db = req.app.get('db')
            let user = await db.get_all_users_by_id()
            return res.status(200).send(user)
        }catch(err) {
                console.log(err)
        }
    },
    // getAllUsers: async (req,res) => {
    //     try {
    //         const db = req.app.get('db')
    //         let allUsers = await db.get_all_users()
    //         return res.status(200).send(allUsers)
    //     }catch(err) {
    //             console.log(err)
    //     }
    // },
    deleteApt: async(req,res)=>{
        try{
            const db=req.app.get('db')
            let apt = await db.delete_apt([+req.params.id,+req.session.user.id])
            return res.status(200).send(apt)
        }catch(err){
            console.log(err)
        }
    },
    getAllAptByUser: async(req,res)=>{
        try{
            const db=req.app.get('db')
            let userapt = await db.apts_by_user_id([+req.session.user.id])
            return res.status(200).send(userapt)
        }catch(err){
            console.log(err)
        }
    }
}