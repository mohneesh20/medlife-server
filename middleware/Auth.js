const requireAuth=(req,resp,next)=>{
    const {user}=req.session;
    console.log(req.session);
    if(!user){
        return resp.status(401).json({msg:'UNAUTHORIZED'});
    }
    next();
}
module.exports={requireAuth};