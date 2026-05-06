const http=require('http');
const server=http.createServer((req,res)=>{
  res.writeHead(200,{
    "content-type":"application/json",
  })
  const data={
    name:"jay",
    age:21,
    city:"surat"
  }
  res.end(JSON.stringify(data));
})
const PORT=8001;

server.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}`)
}
)