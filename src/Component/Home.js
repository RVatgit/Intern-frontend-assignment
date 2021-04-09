import {useDispatch,useSelector} from 'react-redux'
import {getbill} from '../redux/action'
import {useHistory} from 'react-router-dom'
import {useEffect,useState} from 'react'
import {Table,Button,ButtonDropdown,DropdownItem,DropdownToggle,DropdownMenu,
FormGroup,Label,Input,Form,Col} from 'reactstrap'
import {removebills} from '../redux/action'
import Timeseries from './Timeseries'



function Main(){
    const [todo,settodo]=useState([]);
    const todostate=useSelector(s=>s)
    const dispatch = useDispatch()
    const history = useHistory()
    const [dropdownOpen,setdropdownOpen] = useState(false)
    const [pf,setpf] = useState("")
    const [asc,setasc]= useState(1)
    const [desc,setdesc]= useState(-1)
    const [budget,setbudget]= useState();
    const [setjs,setsetjs] = useState(new Set())

    const tasklogic = (e)=>{
        e.preventDefault();
        var arr=[...todo].sort((a,b)=>b.amount-a.amount);
        var x=budget;
        var settmp = new Set()
        for(var i=0; i<arr.length; ++i){
            var p=parseInt(arr[i].amount)
            if(x>=p){
                settmp.add(arr[i].id);
                x-=p
            }
        }
        setsetjs(settmp);
    }

    useEffect(()=>{
        settodo(todostate)
    },[todostate])
    useEffect(() => {
      dispatch(getbill())
    }, [dispatch])

    const sortutil=(d,ac,str)=>{
        if(str==='amount') settodo([...todostate].sort((a,b) => parseInt(b[str])>parseInt(a[str])?d:ac))
        else settodo([...todostate].sort((a, b) => b[str]>a[str]?d:ac))
    }

    const arrange = (str)=>{
        if(str===pf) {
            sortutil(asc,desc,str)
            setasc(prev=>-1*prev)
            setdesc(prev=>-1*prev)
        }
        else {
            sortutil(-1,1,str)
            setasc(1)
            setdesc(-1)
            setpf(str)
        }
    }
    return (
        <div className="container">
        <div className='row' style={{marginTop:'40px'}}>
        <div className="col-6 text-center">
            <Button style={{margin:'auto'}} onClick={(e)=>{
                e.preventDefault()
                history.push('/Add')
            }}>Add Bill</Button>
        </div>
        <div className="col-6 text-center">
        <ButtonDropdown isOpen={dropdownOpen} toggle={()=>setdropdownOpen((prev)=>!prev)}>
            <DropdownToggle caret>
                Sort
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem style={{cursor:'pointer'}} onClick={()=>arrange("category")}>Category A/D</DropdownItem>
                <DropdownItem style={{cursor:'pointer'}} onClick={()=>arrange("description")}>Description A/D</DropdownItem>
                <DropdownItem style={{cursor:'pointer'}} onClick={()=>arrange("amount")}>Amount A/D</DropdownItem>
                <DropdownItem style={{cursor:'pointer'}} onClick={()=>arrange("date")}>Date A/D</DropdownItem>
            </DropdownMenu>
            </ButtonDropdown>
        </div>
        </div>
        <hr />
        <Table striped style={{marginTop:'30px'}}>
        <thead>
            <tr>
            <th>#</th>
            <th>Desciption</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Edit row</th>
            <th>Delete row</th>
            </tr>
        </thead>
        <tbody>
            {todo.map((bill,index)=>(
                    <tr style={setjs.has(bill.id)?{backgroundColor:'orange'}:{}} key={bill.id} >
                        <th scope="row">{index+1}</th>
                        <td>{bill.description}</td>
                        <td>{bill.category}</td>
                        <td>{bill.amount+"$"}</td>
                        <td>{bill.date}</td>
                        <td style={{cursor:'pointer'}}  onClick={()=>history.push('/'+bill.id)}>
                        Edit
                        </td>
                        <td style={{cursor:'pointer'}} onClick={()=> dispatch(removebills(bill.id))}>
                            Delete
                        </td>
                    </tr>
                
                ))
            }
        </tbody>
        </Table>
        <hr style={{marginTop:'70px'}}/>
        <Form>
            <FormGroup row>
                    <Label sm={2} for="budget">Monthly Budget :</Label>
                    <Col sm={4}>
                    <Input  type="number" name="budget" onChange={(e)=>setbudget(e.target.value)}/>
                    </Col>
                    <Col>
                    <Button type='submit' onClick={e=>tasklogic(e)}>Get Minimum Number of Payable bills</Button>
                    </Col>
            </FormGroup>
        </Form>
        <hr style={{marginTop:'100px'}}/>
        <Timeseries data={todo}/>
        </div>
    )
}
export default Main;