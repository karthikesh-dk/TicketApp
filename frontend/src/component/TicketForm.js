import React,{useState} from"react";
import axios from 'axios';
import './TicketForm.css';
function TicketForm(){
    const[form,setForm]=useState({
        title:'',
        description:'',
        priority:'',
        createdby:''

    })
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/api/tickets',form)
            alert('Ticket created');
            setForm({title:'',
                description:'',
                priority:'',
                createdby:''})

            }catch(error){
                alert("Error Creating Ticket");
                console.log(console.error());
            };
        
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                Title: <input type="text" name="title" id="title"
                 value={form.title}
                 onChange={handleChange} /><br /><br />

                Description: 
                <textarea name="description" id="description"
                 value={form.description}
                 onChange={handleChange}></textarea><br /><br />

                Priority: 
                <select name="priority" id="priority"
                 value={form.priority}
                 onChange={handleChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select><br /><br />

                Created By: 
                <input type="text" name="createdby" id="createdby" 
                value={form.createdby}
                onChange={handleChange}/><br /><br />

                <button type="submit">Create Ticket</button>
            </form>
        </div>
    )
}

export default TicketForm;