
const validationType=['body','params','query','headers']

export const validation=(Schema)=>{
    return(req,res,next)=>{
        let validationErrorArr=[]
        validationType.forEach((key)=>{
       
            if(Schema[key]){
              let valid= Schema[key].validate(req[key],{abortEarly:false})
              if(valid.error){
                console.log(key);
                validationErrorArr.push(valid.error.details)
              }

            }
        })
       if(validationErrorArr.length){
        res.json({message:"error",validationErrorArr})
       }else{
        next()
       }
    }
}