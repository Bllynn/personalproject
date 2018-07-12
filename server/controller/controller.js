module.exports={
    getAllUsers: async (req,res) => {
        try {
            const db = req.app.get('db')
            let allUsers = await db.get_all_users()
            return res.status(200).send(allUsers)
        }catch(err) {
                console.log(err)
        }
    },
    deleteApt: async(req,res)=>{
        try{
            const db=req.app.get('db')
            let apt = await db.delete_apt([+req.params.id])
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