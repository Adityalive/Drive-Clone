
export const errorHandler=(err,req,res,next)=>{
    const statusCode= err.status || 500;
    const message =err.message || "Something went wrong";
   //logging 
  console.error("🔥 ERROR:", err);

  res.status(statusCode).json({
    succes:false,
    message});
}