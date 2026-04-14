import { useState, useEffect } from "react";
function App(){
  const [task,setTask]=useState("");
  const [list,setList]=useState(()=>{
    let savedList=localStorage.getItem("todos");
    return savedList ? JSON.parse(savedList):[];
  });
  const [editIndex,setEditIndex]=useState(null);
  const [filter,setFilter]=useState("all");
  const [search,setSearch]=useState("");
  function addTask(){
    if(task==="")return;

    if(editIndex!==null){
      let newList=list.map((item,i)=>{
        if(i===editIndex){
          return {...item,text:task};
        }else{
          return item;
        }
      })
      setList(newList);
      setEditIndex(null);
    }else{
      setList([...list,{text:task,done:false}]);
    }
   setTask("");
  }
  useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(list));
  },[list]);
  function deleteTask(index){
    let newList=list.filter((item,i)=>i!==index);
    setList(newList);
  }
  let total=list.length;
  let doneCount=list.filter(item=>item.done).length;
  let pendingCount=list.filter(item=>!item.done).length;
  let filteredList=list.filter(item=>{
    let searchMatch=
    item.text.toLowerCase().includes(search.toLowerCase());
    let filterMatch=
    filter==="all"||
    (filter==="done" && item.done)||
    (filter==="pending" && !item.done)
    return searchMatch && filterMatch;
  });
  function toggleDone(index){
    let newList=list.map((item,i)=>{
      if(i===index){
        return {...item,done:!item.done};
      }else{
        return item;
      }
    })
    setList(newList);
  }
  return(
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      background:"linear-gradient(to right,#74ebd5,#ACB6E5)"
    }}>
      <div style={{
        backgroundColor:"white",
        padding:"20px",
        borderRadius:"10px",
        width:"400px",
        boxShadow:"0 0 10px rgba(0,0,0,0.2)"
      }}>
      <h1 style={{
        textAlign:"center",
        marginBottom:"15px",
        color:"#333"
        }}>
          📝todo app</h1>
          <div style={{
            display:"flex",
            gap:"5px",
            marginBottom:"10px"
          }}>
      <input 
      type="text"
      placeholder="Add a task..."
      value={task}
      onChange={(e)=>setTask(e.target.value)}
      onKeyDown={(e)=>{
        if(e.key==="Enter"){
          addTask();
        }
      }}
      style={{
        flex:1,
        padding:"8px",
        borderRadius:"5px",
        border:"1px solid #ccc"
      }}
      />
      <button onClick={addTask}disabled={task===""} style={{
        padding:"8px 12px",
        backgroundColor:"blue",
        color:"white",
        border:"none",
        marginBottom:"10px",
        borderRadius:"9px",
        cursor:"pointer"
      }}>{editIndex!==null?"Update":"Add"}</button>
      </div>
      <br></br>
      <div style={{
        display:"flex",
        gap:"5px",
        marginBottom:"10px"
      }}>
      <button onClick={()=>setFilter("all")}
        style={{
          background:filter==="all"?"blue":"#ddd",color:filter==="all"?"white":"black",
          cursor:"pointer"
        }}
        >All</button>
      <button onClick={()=>setFilter("done")}
        style={{
          background:filter==="done"?"green":"#ddd",color:filter==="done"?"white":"black",
          cursor:"pointer"
        }}>Done</button>
      <button onClick={()=>setFilter("pending")}
        style={{
          background:filter==="pending"?"orange":"#ddd",color:"black",
          cursor:"pointer"
        }}
        >Pending</button>
      </div>
      <br></br>
      <button onClick={()=>{
        let savedClear=window.confirm("Are you sure you want to clear all tasks?");
        if(savedClear){
          setList([]);
        }
      }} style={{cursor:"pointer",backgroundColor:"black",color:"white"}}>clear all</button>
      <br></br>
      <div
      style={{
        display:"flex",
        justifyContent:"space-between",
        background:"#f1f1f1",
        padding:"8px",
        borderRadius:"6px",
        marginBottom:"10px"
      }}>
      <span style={{color:"#333"}}>📋Total:{total}</span>
      <span style={{color:"green"}}>✅Done:{doneCount}</span>
      <span style={{color:"red"}}>⌛Pending:{pendingCount}</span>
      </div>
      <input
      type="text"
      placeholder="🔍Search task..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      style={{
        width:"100%",
        padding:"8px",
        marginBottom:"10px",
        borderRadius:"6px",
        border:"1px solid #ccc"
      }}
      />
                  {filteredList.length===0 && <p>No tasks found.</p>}

      <ul style={{
        maxHeight:"300px",
        overflow:"auto",
        paddingRight:"6px",
        scrollBehavior:"smooth"
      }}>
        {filteredList.map((item,index)=>(
          <li key={index}
          style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginBottom:"8px",
            padding:"5px",
            background:"white",
            boxShadow:"0 2px 5px rgba(0,0,0,0.1)",
            borderRadius:"6px",
            textDecoration: item.done?"line-through":"none"
          }}
          ><span style={{wordBreak:"break-word",maxWidth:"70%"}}>{item.text}</span>
          <div style={{
            display:"flex",
            gap:"5px"
          }}>
          <button style={{marginLeft:"10px",cursor:"pointer"}} onClick={()=>deleteTask(index)}>Delete❌</button>
          <button style={{marginLeft:"10px",cursor:"pointer"}} onClick={()=>{setTask(item.text); setEditIndex(index)}}>Edit✏️</button>
          <button style={{marginLeft:"10px",cursor:"pointer"}} onClick={()=>toggleDone(index)}>Done✅</button>
</div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
export default App;