import { useState,useEffect } from "react";
function App(){
  const [task,setTask]=useState("");
  const [list,setList]=useState([]);
  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState("all");
  const [ editIndex,setEditIndex]=useState(null);
  function addTask(){
    if(task===""){
      return;
    }
     if(editIndex!==null){
    let newList=list.map((item,i)=>{
      if(i===editIndex){
        return{...item,text: task};
      }else{
        return item;
      }
    });
    setList(newList);
    setEditIndex(null);
  }else{
    setList([...list,{text: task,done: false}]);
  }
    setTask("");
  }
  function deleteTask(index){
    let newList=list.filter((item,i)=>
    i!==index);
    setList(newList);
  }
  function toggleDone(index){
    let newList=list.map((item,i)=>{
      if(i===index){
        return{...item,done: ! item.done}
      }else{
        return item;
      }
    })
    setList(newList);
  }
 let filteredList=list.filter(item=>{
  let matchSearch=item.text.toLowerCase().includes(search.toLowerCase());
  let matchFilter=
  filter==="all"||
  (filter==="done"&& item.done)||
  (filter==="pending"&& !item.done);
  return matchSearch && matchFilter;
 });
 
 useEffect(()=>{
  let savedData=localStorage.getItem("todos");
  if(savedData){
    setList(JSON.parse(savedData));
  }
 },[]);
 useEffect(()=>{
  if(list.length>0){
  localStorage.setItem("todos",JSON.stringify(list));
  }
 },[list]);
 function TodoItem({item,index,toggleDone,deleteTask,setTask,setEditIndex}){
 
  return(
          <li
          style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginBottom:"8px",
            padding:"5px",
            background:"#eee",
            borderRadius:"5px",
            textDecoration: item.done?
            "line-through": "none"
          }}
          >
            {item.text}
            <div
            style={{
              display:"flex",
              gap:"5px"
            }}
            >
            <button 
            style={{
              backgroundColor:"#28a745",
              color:"white",
              border:"none",
              padding:"5px 8px",
              borderRadius:"5px",
              cursor:"pointer"
            }}
            onClick={()=>
              toggleDone(index)
            }>✅</button>
            <button 
             style={{
              backgroundColor:"#dc3545",
              color:"white",
              border:"none",
              padding:"5px 8px",
              borderRadius:"5px",
              cursor:"pointer"
            }}
            onClick={()=>
              deleteTask(index)
            }>❌</button>
            <button
             style={{
              border:"none",
              padding:"5px 8px",
              borderRadius:"5px",
              cursor:"pointer"
            }}
            onClick={()=>{
              setTask(item.text);
              setEditIndex(index);}}>
                ✏️
              </button>
              </div>
          </li>
        );
}
function TodoList({list,toggleDone,deleteTask,setTask,setEditIndex}){
  return(
    <>
    {list.length===0 && <p>No tasks found</p>}
    <ul>
      {list.map((item,index)=>(
        <TodoItem
        key={index}
        item={item}
        index={index}
        toggleDone={toggleDone}
        deleteTask={deleteTask}
        setTask={setTask}
        setEditIndex={setEditIndex}
        />
      ))}
    </ul>
    </>
  );
}
  return(
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      backgroundColor:"#f5f5f5"
    }}>
      <div style={{
backgroundColor:"white",
padding:"20px",
borderRadius:"10px",
width:"300px",
boxShadow:"0 0 10px rgba(0,0,0,0,.2)"
      }}>
      <h1 style={{textAlign:"center"}}>Todo App</h1>
      <input 
      type="text"
      value={task}
      placeholder="type here"
      onChange={(e)=>setTask(e.target.value)}
      style={{
        width:"100%",
        padding:"8px",
        marginBottom:"10px"
      }}
      />
      <button onClick={addTask}
      style={{
        width:"100%",
        padding:"8px",
        backgroundColor:"#007bff",
        color:"white",
        border:"none",
        marginBottom:"10px"
      }}
      >
        {editIndex!==null?"Update":"Add"}
      </button><br></br>
      <button onClick={()=>setList([])}>
        Clear All
      </button>
      <button onClick={()=>setFilter("all")}>Show All</button>
      <button onClick={()=>setFilter("done")}>Completed</button>
      <button onClick={()=>setFilter("pending")}>Pending</button><br></br>
      <input
      type="text"
      value={search}
      placeholder="Search"
      onChange={(e)=>setSearch(e.target.value)}
      style={{
        width:"100%",
        padding:"8px",
        marginTop:"10px"
      }}
      />
     
      <TodoList
      list={filteredList}
      toggleDone={toggleDone}
        deleteTask={deleteTask}
        setTask={setTask}
        setEditIndex={setEditIndex}
        />
      </div>
        </div>
  );
}
export default App;